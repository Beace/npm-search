const npmFetch = require('npm-registry-fetch');

class NPM {
  constructor(options = {}) {
    this.options = {
      fetchRetryMintimeout: options.fetchRetryMintimeout || 20 * 1000,
      fetchRetryMaxtimeout: options.fetchRetryMaxtimeout || 200 * 1000,
      registry: options.registry,
      fetchRetries: options.fetchRetries || 5,
      // headers: {
      //   Accept: 'application/vnd.npm.install-v1+json'
      // }
    }
    this.downloadAPI = 'https://api.npmjs.org/downloads/point/last-year';
  }

  async metadata(packageName) {
    return npmFetch.json(`/${packageName}?date=${Date.now()}`, this.options)
  }

  async download(packageName) {
    return npmFetch.json(`${this.downloadAPI}/${packageName}`, this.options)
  }
}

module.exports = NPM;
