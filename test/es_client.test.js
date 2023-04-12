const test = require('node:test');
const assert = require('assert');
const getClient = require('../src/es_client');

const client = getClient();

test('should es client working', async t => {
  await t.test('should query lodash', async () => {
    const result = await client.search({
      index: 'test_packages',
      "query": {
        "match_phrase": {
          "package_name": "lodash"
        }
      }
    })

    // console.log(result.hits.hits)
    assert.deepEqual(result.hits.hits[0]._source, {
      package_name: 'lodash',
      description: 'Lodash modular utilities.'
    })
  })
})
