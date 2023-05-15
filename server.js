const http = require('http');
const url = require('url');

const search = require('./src/search');

function server() {
  http.createServer(async function (req, res) {
    const { pathname, query: { text } } = url.parse(req.url, true);
    if (pathname === '/-/v1/search') {
      const data = await search({ text })
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data));
      return;
    }
    res.statusCode = 404;
    res.end();
  }).listen(3000, () => console.log('server is running on port 3000'));
}

server()