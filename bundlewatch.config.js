// https://bundlewatch.io/#/getting-started/using-a-config-file

const { readdirSync } = require('fs');

const packageFolders = [
    'packages/components/atoms',
    'packages/components/molecules',
    'packages/components/organisms',
    'packages/services',
    'packages/tools'
];

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
const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => `${source}/${dirent.name}`);

let packageNames = [];

packageFolders.forEach(folder => {
    packageNames = packageNames.concat(getDirectories(folder));
});

const filteredPackages = packageNames.filter(package => !excludedPackages.includes(package));

const files = filteredPackages.map(package => ({
    path: `${package}/dist/*+(.min|.min.umd|.es).js`,
    maxSize: '100kB'
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
