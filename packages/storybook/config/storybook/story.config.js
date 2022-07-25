const { execSync } = require('child_process');

let outputChangedComponentPackages;

const getChangedPackageStories = () => {
    try {
        outputChangedComponentPackages = execSync('npx turbo run build --filter=[origin/master] --dry=json --filter=!@justeat/f-cookie-banner-static', {
            cwd: '../..'
        });
    } catch (error) {
        console.info('No changed component packages found.');
        process.exit(0);
    }

    const changedPackagesArray = JSON.parse(outputChangedComponentPackages.toString());

    const changedComponentPackages = changedPackagesArray.tasks
        .filter(pkg => pkg.directory.match(new RegExp('packages/components')));

    const storyPaths = [];

    changedComponentPackages.forEach(pkg => storyPaths.push(`../../../../${pkg.directory}/stories/*.stories.@(js|mdx)`));

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

    // Executed if the storybook:serve script is executed.
    return [
        '../../../**/*.stories.@(js|mdx)',
        '../../../../stories/**/*.stories.@(js|mdx)'
    ];
};

module.exports = {
    getStoryFiles
};
