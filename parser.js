module.exports = class Parser {

    constructor (text) {
        this.initial = text;
        this.result = new Map();
    }

    __parseTextToPackages(text) {
        return text.split(/\r\n\r\n|\n\n/);
    }
    
    __parsePackageToFields(pack) {
        return pack.replace(/\r\n\s/g, ' ').split(/\r\n/);
    }
    
    __parseFieldsToKeyValue(field) {
        let breakPoint = field.indexOf(':');
        let fieldObject = {};
        let key = field.substring(0, breakPoint);
        let value = field.substring(breakPoint + 2);
        if (key == 'Package' || key == 'Depends' || key == 'Description') {
            fieldObject[key] = value;
        }
        return fieldObject;
    }
    
    __parseDepends(d, packageName) {
        let depends = new Set(d.replace(/\s\((.*?)\)/g, '').split(/,\s/));
        depends.forEach(el => {
            if (!this.result.has(el)) {
                this.result.set(el, {reversDep: packageName})
            }
        })
        return depends;
    };
    
    parse() { 
        this.__parseTextToPackages(this.initial).forEach(p => {
            let pack = {};
            this.__parsePackageToFields(p).forEach(field => {
                let f = this.__parseFieldsToKeyValue(field);
                pack = {...pack, ...f};
            });
            let d = this.__parseDepends(pack.Depends, pack.Package);
            pack.Depends = d;
            this.result.set(pack.Package, {...pack})
        })
        return this.result;
    }

}





