const fs = require('fs');

let text = fs.readFileSync('raw.txt').toString();

let result = new Map();

function parseTextToPackages(text) {
    return text.split(/\r\n\r\n|\n\n/);
}
    
function parsePackageToFields(package) {
    return package.replace(/\r\n\s/g, ' ').split(/\r\n/);
}
    
function parseFieldsToKeyValue(field) {
    let breakPoint = field.indexOf(':');
    let fieldObject = {};
    let key = field.substring(0, breakPoint);
    let value = field.substring(breakPoint + 2);
    if (key == 'Package' || key == 'Depends' || key == 'Description') {
        fieldObject[key.toLowerCase()] = value;
    }
    return fieldObject;
}
    
function parseDeps(dep) {
    let deps = new Set(dep.replace(/\s\((.*?)\)/g, '').split(/,\s/));
    return deps;
};

function setReverseDeps(deps, packageName) {
    deps.forEach(elem => {
        if(!result.has(elem)) {
            result.set(elem, {reverseDep: new Set().add(packageName)})
        } else {
            result.elem.reverseDep.add(packageName) // fix
        }    
    })
}
    
function parse(text) { 
    parseTextToPackages(text).forEach(package => {
        let pack = {};
        parsePackageToFields(package).forEach(field => {
            let f = parseFieldsToKeyValue(field);
            pack = {...pack, ...f};
        });
        let deps = parseDeps(pack.depends);
        setReverseDeps(deps, pack.package);
        pack.depends = deps;
        pack.reverseDep = new Set();
        result.set(pack.package, {...pack})
    })
}


parse(text);
console.log(result)




