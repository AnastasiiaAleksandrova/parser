const html = {
    h1(text, id) {
        return `<h1 id=${id}>${text}</h1>`;
    },

    h3(text) {
        return `<h3>${text}</h3>`;
    },

    a(link, text) {
        return `<a href="${link}">${text}</a>`;
    },

    span(text) {
        return `<span>${text}</span>`;
    },

    p(text) {
        return `<p>${text}</p>`;
    },

    li(text) {
        return `<li>${text}</li>`;
    },

    ul(text) {
        return `<ul>${text}</ul>`;
    }
};

function renderMenu(map) {
    let menu = html.ul([...map.keys()]
    .sort()
    .reduce((acc, cur) => {
       return acc.concat(html.li(html.a(`#${cur}`, cur)));
    }, ''));

    return `<div style=\'overflow-y: scroll; flex: 1; heigth: 100%; position: relative\'>${menu}</div>`;   
}

function renderDeps(deps, map) {
    if (deps.length > 0) { 
       return deps.map(depLi => {
           let i = false;
           return depLi.map(dep => {
               if (map.has(dep) && !i) {
                   i = true;
                   return html.a(`#${dep}`, dep)
               }
               return dep
           }).join(' / ');
       }).reduce((acc, cur) => {
            return acc + html.li(cur)
       }, html.h3('Dependencies'))
    } else {
        return '';
    }
}

function renderRevs(revs) {
    if (revs.length > 0) {
        return revs.map(rev => html.a(`#${rev}`, rev)).reduce((acc, cur) => {
            return acc += html.li(cur)
        }, html.h3('Reverse Dependencies'));
    } else {
        return ''; 
    } 
}

function renderContent(map) {
    let content = '';

    map.forEach((val, key, map) => {
        let name = html.h1(key, key);
        let desc = !val.desc ? '' : html.h3('Description') + html.p(val.desc);
        let deps = html.p(renderDeps(val.deps, map));
        let revs = html.p(renderRevs(val.revs));
        
        content = content.concat(name + desc + deps + revs); 
    })

    return `<div style=\'overflow-y: scroll; flex: 3; heigth: 100%; position: relative; padding: 10px\'>${content}</div>`;
}

function renderResponse(map) {
    let response = renderMenu(map) + renderContent(map);
    return `<div style=\'display: flex; height: 100%; width: 100%\'>${response}</div>`
}

module.exports = {
    renderResponse
}