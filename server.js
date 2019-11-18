const fs = require('fs');

let text = fs.readFileSync('raw.txt').toString();

const Parser = require('./parser')

let test = new Parser(text);
console.log(test.parse())