const replicateAPI = 'https://replicate.npmjs.com/_changes';

class Change {
  // ref: https://github.com/cnpm/cnpmcore/blob/master/app/common/adapter/changesStream/NpmChangesStream.ts
  getChangesStreamUrl(replicateURL, since, limit = 10) {
    const url = new URL(replicateURL);
    url.searchParams.set('since', since);
    if (limit) {
      url.searchParams.set('limit', String(limit));
    }
    return url.toString();
  }

  async change(since = 1) {
    const url = this.getChangesStreamUrl(replicateAPI, since);
    const res = await fetch(url);

    const data = await res.json();
    return data;
  }
}

module.exports = Change;
