const path = require('path');
const ficons = require('@justeat/f-icons');
const pascalCase = require('pascal-case');
const fs = require('fs-extra');

const componentTemplate = (name, svg) => `
export default {
    name: '${name}',

    props: {
    },

    functional: true,

    render(h, ctx) {
        const attrs = ctx.data.attrs || {}
        ctx.data.attrs = attrs

        return ${svg.replace(/<svg([^>]+)>/, '<svg$1 {...ctx.data}>')}
    }
}
`.trim();

const handleComponentName = name => name.replace(/\-(\d+)/, '$1'); // eslint-disable-line no-useless-escape

const icons = Object.keys(ficons.icons).map(name => ({
    name,
    pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`)
}));

Promise.all(icons.map(icon => {
    const svg = ficons.icons[icon.name].toSvg();
    const component = componentTemplate(icon.pascalCasedComponentName, svg);
    const filepath = `./src/components/${icon.pascalCasedComponentName}.js`;
    return fs.ensureDir(path.dirname(filepath))
        .then(() => fs.writeFile(filepath, component, 'utf8'));
})).then(() => {
    const main = icons
        .map(icon => `export { default as ${icon.pascalCasedComponentName} } from '../icons/${icon.pascalCasedComponentName}'`)
        .join('\n\n');
    return fs.outputFile('./src/index.js', main, 'utf8');
});
