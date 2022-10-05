// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');


const getMaxSizeForPackage = packageLocation => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const { maxBundleSize } = require(`./${packageLocation}/package.json`);

    return maxBundleSize;
};

const getChangedPackageLocations = () => {
    let outputPackages;
    // If master, run bundlewatch against all components
    // Otherwise run Bundlewatch against changed components and their dependants
    let command = process.env.CIRCLE_BRANCH === 'master' || process.env.RUN_ALL === 'true' || process.env.GITHUB_ACTIONS ? "npx turbo run build --dry=json" : "npx turbo run build --filter=...[origin/master] --dry=json" 

    try {
        outputPackages = execSync(command);
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const packagesArray = JSON.parse(outputPackages.toString());

    const packageLocations = packagesArray.tasks.map(p => p.directory);

    return packageLocations.filter(packageLocation => getMaxSizeForPackage(packageLocation) !== undefined);
};

const packagesLocations = getChangedPackageLocations();

const files = packagesLocations.map(packageLocation => ({
    path: `./${packageLocation}/dist/*+(.min|.min.umd|.es).js`,
    maxSize: getMaxSizeForPackage(packageLocation)
}));

module.exports = {
    files,
    ci: {
        trackBranches: ['master', 'main']
    }
};
