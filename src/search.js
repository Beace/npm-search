const ES = require('./es');
const es = new ES('http://localhost:9200', 'npm_packages');


async function search({ from = 0, size = 10, text}) {
  const data = await es.query({
    query: {
      "multi_match": {
        "query": text,
        "fields": [
          "package.name",
          "package.description",
          "package.keywords"
        ]
      },
    },
    "sort": {
      "downloads.all": "desc"
    },
    from,
    size,
  })
  const result = {
    objects: data.hits.hits.map(item => {
      return format(item._source)
    }),
    total: data.hits.total.value,
  }
  return result;
}

function format(hitItem) {
  return {
    package: hitItem.package,
    score: {
      final: hitItem.downloads.all,
      detail: {
        quality: 0,
        popularity: hitItem.downloads.all,
        maintenance: 0,
      }
    },
    searchScore: hitItem.downloads.all,
  }
}

// search();
module.exports = search;
