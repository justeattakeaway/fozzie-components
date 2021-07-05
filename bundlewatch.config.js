// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');
let outputChangedPackages;

const getMaxSizeForPackage = packageLocation => {

    const { maxBundleSize } = require(`${packageLocation}/package.json`);

    return maxBundleSize;
};

const getChangedPackageLocations = () => {
    try {
        outputChangedPackages = execSync('npx lerna ls --since origin/master --json');
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const changedPackagesArray = JSON.parse(outputChangedPackages.toString());

    const changedPackageLocations = changedPackagesArray.map(package => package.location);

    const filteredPackages = changedPackageLocations.filter(packageLocation => getMaxSizeForPackage(packageLocation) !== undefined);

    return filteredPackages;
};

const packagesLocations = getChangedPackageLocations();

const files = packagesLocations.map(packageLocation => ({
    path: `${packageLocation}/dist/*+(.min|.min.umd|.es).js`,
    maxSize: getMaxSizeForPackage(packageLocation)
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