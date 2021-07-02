// https://bundlewatch.io/#/getting-started/using-a-config-file

const { execSync } = require('child_process');
let outputPackages;

const getMaxSizeForPackage = packageLocation => {

    const { maxBundleSize } = require(`${packageLocation}/package.json`);

    return maxBundleSize;
};

const getChangedPackageLocations = () => {
    try {
        
        let command = 'npx lerna ls --json';

        command = process.env.CIRCLE_BRANCH === 'master' ? command : command.concat(' --since origin/master');

        outputPackages = execSync(command);
    } catch (error) {
        console.info('No changed packages found.');
        process.exit(0);
    }

    const changedPackagesArray = JSON.parse(outputPackages.toString());

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