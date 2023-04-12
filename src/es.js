const { Client } = require('@elastic/elasticsearch')
const { parseFullName } = require('./util');

class ES {
  constructor(node, index) {
    this.index = index;
    this.client = new Client({
      node,
    })
  }

  async query(params) {
    const result = await this.client.search({
      index: this.index,
      query: params,
    })
    return result;
  }

  async get(fullName) {
    const result = await this.client.get({
      id: fullName,
      index: this.index,
    });
    return result._source;
  }

  async write(data) {
    const { fullName, package: packageData, downloads } = this.format(data);
    const res = await this.client.index({
      id: fullName,
      index: this.index,
      body: { package: packageData, downloads },
    })
    return res;
  }

  format({ metadata, downloadData }) {
    const [scope, name] = parseFullName(metadata.name);
    return {
      fullName: metadata.name,
      package: {
        name: name,
        description: metadata.description,
        keywords: metadata.keywords,
        version: metadata['dist-tags'].latest,
        date: metadata.time.modified,
        maintainers: metadata.maintainers.map(item => ({
          username: item.name, email: item.email
        })),
        scope: scope,
        'dist-tags': metadata['dist-tags'],
      },
      downloads: {
        all: downloadData.downloads,
      }
    }
  }
}

module.exports = ES;
