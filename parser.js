const fs = require('fs');

// const emptyLine = /\r\n\r\n|\n\n/;
// const newLine = /\r\n|\n/;


function parse_keyval(s) {
    let idx = s.indexOf(':'); 
    return [s.substring(0, idx), s.substring(idx + 2)] 
}

function parse_deps(s) {
    return s.split(', ').map(s => s.split('| ').map(s => { 
        let i = s.indexOf(' '); 
        return (i > 0) ? s.substring(0, i) : s
    }))
}

function parse_desc(s) {
    return s.replace(/\r\n|\n/g, ''); 
}

function parse_pack(s) {
    return s.split(/\r\n|\n(?=\S)/).map(l => parse_keyval(l))
        .reduce((acc, val) => {
            switch (val[0]) {
                case 'Package': 
                    acc.name = val[1]; 
                    break;
                case 'Description': 
                    acc.desc = parse_desc(val[1]); 
                    break;
                case 'Depends':
                    acc.deps = parse_deps(val[1]);
                    break;
            }

            return acc;
        }, { deps: [], revs: [] });
}

function parse(fileName) {
    let map = fs.readFileSync(fileName, 'utf-8').split(/\r\n\r\n|\n\n/).filter(s => s.length > 0)
        .map(s => parse_pack(s)).reduce((acc, val) => acc.set(val.name, val), new Map());

    map.forEach(pack => {
        pack.deps.flatMap(deps => deps).forEach(dep => {
            if (map.has(dep)) {
                map.get(dep).revs.push(pack.name);
            }
        })
    })
    return map;
}

console.log(fs.readFileSync('raw.txt').toString())

module.exports = {
    parse
}
