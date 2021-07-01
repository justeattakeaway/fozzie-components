// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');
let outputChangedPackages;

const maxBundleSizeExistsForPackage = packageLocation => {
    const { maxBundleSize } = require(`${packageLocation}/package.json`);
    
    return (maxBundleSize);
}

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

    let changedPackageLocations = [];
    changedPackagesArray.forEach(package => changedPackageLocations.push(package.location));

    const filteredPackages = changedPackageLocations.filter(packageLocation => maxBundleSizeExistsForPackage(packageLocation));

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