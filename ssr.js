const parser = require('fast-xml-parser');
const fs = require('fs');
const domino = require('domino');
console.log('Todo: convert your Vue templates to Mustache');

let components = {};

function loadComponent(name) {
    if(components[name]) {
        return components[name];
    }
    let component;
    try {
        component = fs.readFileSync( `${__dirname}/resources/${name}.vue` ).toString();
        component = parser.parse(component,{
            attributeNamePrefix : "@",
            ignoreAttributes : false,
            parseAttributeValue : true
        });
    } catch (e) {
        component = false;
    }
    components[name] = component;
    return components[name];
}

function hyphenCaseToCamelCase( str ) {
    return str.replace(/[-_]([a-z])/g, function ( m ) {
        return m[1].toUpperCase();
    })
}

function hyphenCaseToPascalCase( str ) {
    const r = hyphenCaseToCamelCase( str )
    return r[0].toUpperCase() + r.slice(1);
}

const window = domino.createWindow('<h1>Hello world</h1>', 'http://example.com');
const document = window.document;

function walkRender(rootNode, rootTag) {
    // @todo: resolve rootTag if component
    const children = Object.keys(rootNode)
        .filter((key)  => key.indexOf('@') === -1)
    const attrs = Object.keys(rootNode)
        .filter((key) => key.indexOf('@') === 0);

    const component = loadComponent(hyphenCaseToPascalCase( rootTag ));
    if ( component && component.template ) {
        console.log('t', component.template);
        return componentToNode(component);
    } else {
        console.log('got', rootTag);
        const finalNode = document.createElement(rootTag);
        attrs
            .forEach((key) => {
                let attr = key.slice(1);
                let val = rootNode[key];
                if (val.indexOf('computed') === 0 ) {
                    console.log(`Ignoring computed property ${attr}`);
                    return;
                } 
                if (attr.indexOf(':') === 0 ) {
                    attr = attr.slice(1);
                    val = `{{${val}}}`;
                }
                finalNode.setAttribute(attr, val);
            });
    
        children.forEach((name) => {
            finalNode.appendChild(walkRender(rootNode[name], name));
        });
        return finalNode;
    }
}
function componentToNode(obj) {
    const template = obj.template;
    const rootTag = Object.keys(template)[0];
    const rootNode = template[rootTag];
    return walkRender(rootNode, rootTag);
}

const mustache = componentToNode(loadComponent('App'));
console.log(mustache)
fs.writeFileSync(`${__dirname}/templates/skin.mustache`, mustache);

let lesscss = '';
Object.keys(components).forEach((key) => {
    const style = components[key].style;
    if(style) {
        lesscss += `${style['#text']}
`;
    }
})
fs.writeFileSync(`${__dirname}/resources/skin.less`, lesscss);