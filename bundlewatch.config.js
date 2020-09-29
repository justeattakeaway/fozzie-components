// https://bundlewatch.io/#/getting-started/using-a-config-file

const fs = require('fs');

const excludedPackages = [
    'f-metadata',
    'generator-component',
    'storybook'
];

const packageNames = fs.readdirSync('packages/');

const filteredPackages = packageNames.filter(package => !excludedPackages.includes(package));

const files = filteredPackages.map(name => ({
    path: `packages/${name}/dist/*.js`
}));

module.exports = { files };
