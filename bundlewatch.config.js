// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');


const getMaxSizeForPackage = packageLocation => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { maxBundleSize } = require(`${packageLocation}/package.json`);

    return maxBundleSize;
};

const getPackageLocations = () => {
    let outputPackages;

    try {
        outputPackages = execSync('npx lerna ls --json');
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const packagesArray = JSON.parse(outputPackages.toString());

    const packageLocations = packagesArray.map(p => p.location);

    return packageLocations.filter(packageLocation => getMaxSizeForPackage(packageLocation) !== undefined);
};

const packagesLocations = getPackageLocations();

const files = packagesLocations.map(packageLocation => ({
    path: `${packageLocation}/dist/*+(.min|.min.umd|.es).js`,
    maxSize: getMaxSizeForPackage(packageLocation)
}));

module.exports = {
    files,
    ci: {
        trackBranches: ['master', 'main']
    }
};
