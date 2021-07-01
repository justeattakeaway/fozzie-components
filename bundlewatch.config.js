// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');
let outputChangedPackages;

const excludedPackages = [
    'storybook',
    'services/f-braze-adapter',
    'services/f-wdio-utils',
    'tools/generator-component'
];

const getChangedPackageLocations = () => {
    try {
        outputChangedPackages = execSync('npx lerna ls --since origin/master --json');
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const changedPackagesArray = JSON.parse(outputChangedPackages.toString());

    let changedPackageLocations = [];
    changedPackagesArray.forEach(package => changedPackageLocations.push(package.location));

    const filteredPackages = changedPackageLocations.filter(packageLocation => !excludedPackages.includes(packageLocation.split('packages/')[1]))

    return filteredPackages;
};


const packagesLocations = getChangedPackageLocations();

const files = packagesLocations.map(packageLocation => ({
    path: `${packageLocation}/dist/*+(.min|.min.umd|.es).js`,
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
