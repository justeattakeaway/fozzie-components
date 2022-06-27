// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');


const getMaxSizeForPackage = packageLocation => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { maxBundleSize } = require(`${packageLocation}/package.json`);

    return maxBundleSize;
};

const getChangedPackageLocations = () => {
    let outputPackages;
    let command = process.env.CIRCLE_BRANCH === 'master' ? "npx lerna ls --json" : "npx lerna ls --since origin/master --json" 

    try {
        outputPackages = execSync(command);
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const packagesArray = JSON.parse(outputPackages.toString());

    const packageLocations = packagesArray.map(p => p.location);

    return packageLocations.filter(packageLocation => getMaxSizeForPackage(packageLocation) !== undefined);
};

const packagesLocations = getChangedPackageLocations();

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
