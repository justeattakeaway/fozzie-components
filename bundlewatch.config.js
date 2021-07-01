// https://bundlewatch.io/#/getting-started/using-a-config-file

const { readdirSync } = require('fs');

const packageFolders = [
    { name: 'packages/components/atoms', maxSize: '15kB' },
    { name: 'packages/components/molecules', maxSize: '60kB' },
    { name: 'packages/components/organisms', maxSize: '100kB' },
    { name: 'packages/services', maxSize: '100kB' },
    { name: 'packages/tools', maxSize: '100kB' }
];

const getMaxSizeForPackage = packageName => {
    const folder = packageFolders.find(f => packageName.startsWith(f.name));
    return (folder && folder.maxSize) ? folder.maxSize : '100kB';
};

const excludedPackages = [
    'packages/services/f-braze-adapter',
    'packages/tools/generator-component',
    'packages/tools/storybook',
    'packages/services/f-wdio-utils'
];

/**
 * Function to get subfolders of a given path.
 *
 * @param {String} source – Path string to check the contents of.
 * @returns {Array} – A set of subfolder paths to each package found
 */
const getDirectories = source => readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => `${source}/${dirent.name}`);

let packageNames = [];

packageFolders.forEach(folder => {
    packageNames = packageNames.concat(getDirectories(folder.name));
});

const filteredPackages = packageNames.filter(packageName => !excludedPackages.includes(packageName));

const files = filteredPackages.map(packageName => ({
    path: `${packageName}/dist/*+(.min|.min.umd|.es).js`,
    maxSize: getMaxSizeForPackage(packageName)
}));

module.exports = {
    files,
    ci: {
        trackBranches: [
            'master',
            'main'
        ]
    }
};
