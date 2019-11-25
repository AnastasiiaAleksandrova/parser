const http = require('http');
const { parse } = require('./parser');
const { renderResponse } = require('./render');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

let pkgs = parse('raw.txt');

let response = renderResponse(pkgs);

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(response);
    res.end();
});

server.listen(port, host, () => console.log(`Server ${host} is listening on ${port}`));

