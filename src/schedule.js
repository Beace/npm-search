const { CronJob } = require('cron');
const Change = require("./change");
const NPM = require('./npm');
const ES = require('./es');

const npm = new NPM();
const es = new ES('http://localhost:9200', 'npm_packages');

let lastSince = 22028821;

async function exec() {
  const change = new Change();
  const { results, last_seq } = await change.change(lastSince);
  console.info("[ChangeComing] length=%d, last_seq=%d", results.length, last_seq);
  for (let i = 0; i < results.length; i++) {
    try {
      const { id } = results[i];
      const metadata = await npm.metadata(id);
      const downloadData = await npm.download(id);
      await es.write({ metadata, downloadData });
      console.info("[ScheduleRunSuccess] taskCount=%d, id=%s", i, id);
    } catch (error) {
      console.error("[ScheduleRunError] taskCount=%d, id=%s, error: %s", i, id, error.message);
    }
  }
  lastSince = last_seq;
}

const job = new CronJob(
  '* * * * *',
  exec,
  null,
  true,
  undefined,
  undefined,
  true
);

job.start()