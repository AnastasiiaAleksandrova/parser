const http = require('http');
const { parse } = require('./parser');
const { renderResponse } = require('./render');

const port = process.env.PORT || 3000;

const mock = 'raw.txt';
const file = '/var/lib/dpkg/status';


function createRes() {
    let res;
    try {
        res = renderResponse(parse(file));
    } catch (err) {
        res = renderResponse(parse(mock));
    } finally {
        return res;
    }
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(createRes());
    res.end();
});

server.listen(port, () => console.log(`Server is listening on ${port}`));

