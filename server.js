const http = require('http');
const { parse } = require('./parser');
const { renderResponse } = require('./render');

const port = process.env.PORT || 3000;
const file = 'raw.txt';



let pkgs = parse(file);

//console.log(pkgs);



let response = renderResponse(pkgs);

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(response);
    res.end();
});

server.listen(port, () => console.log(`Server is listening on ${port}`));

