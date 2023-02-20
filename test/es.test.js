const test = require('node:test');
const assert = require('assert');
const NPM = require('../npm');
const ES = require('../es');

const npm = new NPM();
const es = new ES('http://localhost:9200', 'npm_packages');

test('should npm class working', async t => {
  await t.test('should fetch lodash metadata', async () => {
    const metadata = await npm.metadata('@babel/preset-env');
    const downloadData = await npm.download('@babel/preset-env');
    const res = await es.write({ metadata, downloadData });
    assert.equal(res._id, metadata.name);
    const data = await es.get(metadata.name);
    assert.equal(data.downloads.all, downloadData.downloads);
  })
})
