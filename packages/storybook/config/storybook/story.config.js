const { execSync } = require('child_process');

let outputChangedComponentPackages;

const getChangedPackageStories = () => {
    try {
        outputChangedComponentPackages = execSync('npx lerna ls --since origin/master --json');
    } catch (error) {
        console.info('No changed component packages found.');
        process.exit(0);
    }

    const changedPackagesArray = JSON.parse(outputChangedComponentPackages.toString());

    const changedComponentPackages = changedPackagesArray
        .filter(pkg => pkg.location.match(new RegExp('packages/components')));

    const storyPaths = [];

    changedComponentPackages.forEach(pkg => storyPaths.push(`${pkg.location}/stories/*.stories.@(js|mdx)`));

    return storyPaths;
};

const getPackagesWithVisualRegression = () => {
    let packageJsonMatches;
    try {
        packageJsonMatches = execSync('grep --include=\package.json --exclude-dir={node_modules,.yalc} -rnw "../../packages/components" -e "test:visual"');
    } catch (error) {
        console.info('No components found that have visual regression tests.');
        process.exit(0);
    }

    const visualRegressionPackagePaths = packageJsonMatches.toString().match(/^(.)*(?=package.json)/gm);

    const storyPaths = [];

    visualRegressionPackagePaths.forEach(path => storyPaths.push(`../../${path}stories/*.stories.@(js|mdx)`));

    return storyPaths;
};

const getStoryFiles = () => {
    // Executed if Storybook is running in VS Code via the launch.json command.
    if (process.env.VS_DEBUGGER) {
        return [process.env.CURRENT_STORY_FILE];
    }

    // Executed if the storybook:serve-changed script is executed by CircleCI.
    if (process.env.CHANGED_ONLY) {
        return getChangedPackageStories();
    }

    if (process.env.VISUAL_REGRESSION) {
        return getPackagesWithVisualRegression();
    }

    // Executed if the storybook:serve script is executed.
    return [
        '../../../**/*.stories.@(js|mdx)',
        '../../../../stories/**/*.stories.@(js|mdx)'
    ];
};

module.exports = {
    getStoryFiles
};
