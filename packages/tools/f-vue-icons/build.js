const path = require('path');
const ficons = require('@justeat/f-icons');
const { pascalCase } = require('pascal-case');
const fs = require('fs-extra');

const componentTemplate = (name, svg) => `
export default {
    name: '${name}',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return ${svg.replace(/<svg([^>]+)>/, '<svg$1 {...ctx.data}>')};
    }
};
`.replace(/^\s+/g, ''); // trim start of string

const handleComponentName = name => name.replace(/\-(\d+)/, '$1'); // eslint-disable-line no-useless-escape

const ICONS_DIR = `${process.cwd()}/src/components`;
const indexPath = path.join(ICONS_DIR, '/index.js');

const icons = Object.keys(ficons.icons).map(name => ({
    name,
    pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`)
}));

async function checkDirExists (directoryPath) {
    try {
        await fs.ensureDir(directoryPath);
        console.info(`Directory "${directoryPath}" exists.`);
    } catch (err) {
        console.error(err);
    }
}

async function build () {
    let indexFileString = '/* eslint-disable camelcase */\n';
    await checkDirExists(ICONS_DIR);

    Promise.all(icons.map(icon => {
        const svg = ficons.icons[icon.name].toSvg();
        const component = componentTemplate(icon.pascalCasedComponentName, svg);
        const componentName = icon.pascalCasedComponentName;

        indexFileString += `export { default as ${componentName} } from './${componentName}';\n`;
        fs.writeFileSync(`./src/components/${componentName}.js`, component, 'utf8');

        return indexFileString;
    }));

    fs.outputFileSync(indexPath, indexFileString, 'utf8');
}

build();
