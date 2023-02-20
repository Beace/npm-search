const test = require('node:test');
const assert = require('assert');
const NPM = require('../npm');

const npm = new NPM();

test('should npm class working', async t => {
  await t.test('should fetch lodash metadata', async () => {
    const metadata = await npm.metadata('lodash');
    assert.equal(metadata.name, 'lodash')
  })

  await t.test('should get download data', async () => {
    const downloadData = await npm.download('lodash');
    assert.equal(downloadData.package, 'lodash');
    assert(downloadData.downloads > 0);
  })
})
