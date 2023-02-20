const { Client } = require('@elastic/elasticsearch')

let client;

function getESClient() {
  if (!client) {
    client = new Client({
      node: 'http://localhost:9200',
    })
  }
  return client;
}

module.exports = getESClient;
