const fs = require('fs');

let text = fs.readFileSync('raw.txt').toString();
let packages = text.split(/\r\n\r\n|\r\r|\n\n/);
let finalList = new Map();

packages.forEach(package => {
    let chunks = package
    .replace(/\r\n\s/g, ' ')
    .replace(/:\s/g, ':')
    .split(/\r\n|:/);
    
    let packageObj = chunks.reduce((acc, cur, idx, src) => {
        if (cur == 'Package' || cur == 'Description') {
            acc[cur.toLowerCase()] = src[idx + 1];
            
        } else if (cur == 'Depends') {
            let depends = new Set(
                src[idx + 1]
                .replace(/\s\((.*?)\)/g, '')
                .split(/,\s/)
            );
            depends.forEach(el => {
                if (!finalList.has(el)) {
                    finalList.set(el, {reversDep: acc['package']})
                }
            });
            acc[cur.toLowerCase()] = depends;   
        }
        return acc;
    }, {});
    finalList.set(packageObj.package, {...packageObj});  
})

console.dir(finalList);





