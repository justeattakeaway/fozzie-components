const Generator = require('yeoman-generator');
const chalk = require('chalk');
const rename = require('gulp-rename');
const updateNotifier = require('update-notifier');

const prompts = require('./prompts');
const services = require('./services');
const pkg = require('../../package.json');


module.exports = class extends Generator {
    async initializing () {
        const generatorWelcome = chalk`
{yellow  ____  __  ____  ____  __  ____ }
{yellow (  __)/  \\(__  )(__  )(  )(  __)}
{yellow  ) _)(  O )/ _/  / _/  )(  ) _) }
{yellow (__)  \\__/(____)(____)(__)(____)}

{white.bold A Yeoman generator for Fozzie Components}
Yeoman Generator version: {white v${pkg.version}}
{yellow.bold Fozzie} is open-source & maintained by the {rgb(243, 109, 0) Just Eat Takeaway} Team: {yellow https://github.com/justeat}.
`;

        // Have Yeoman greet the user.
        this.log(generatorWelcome);

        // Checks for available update and displays prompt if needed
        updateNotifier({ pkg }).notify();
    }

    async prompting () {
        this.answers = await this.prompt(prompts);
    }

    async configuring () {
        // setup some base config which will be changed based on certain answers
        this.config = {
            isComponent: (this.answers.componentType === 'uiComponent'),
            isService: (this.answers.componentType === 'service'),
            needsComponentTests: (this.answers.componentType === 'service' ? false : this.answers.needsComponentTests),
            needsComponentTranslations: (this.answers.componentType === 'service' ? false : this.answers.needsComponentTranslations),
            needsBundlewatch: (this.answers.needsBundlewatch),
            needsTestingApiMocks: (this.answers.componentType === 'service' ? false : this.answers.needsTestingApiMocks)
        };

        this.nameTransformations = services.transformName(this.answers.name);
        this.currentDate = services.setDate();
        this.componentDistFolder = services.setDestinationFolder(this.answers);

        if (this.answers.componentType === 'uiComponent') {
            const { componentCategory } = this.answers;
            const categoryCapitalised = componentCategory.charAt(0).toUpperCase() + componentCategory.slice(1);
            this.storybook = {
                path: `story/components-${componentCategory}s--${this.nameTransformations.default}-component`,
                componentCategory: `${categoryCapitalised}s`
            };
        }

        this.ignorePatterns = [
            ...(this.config.needsComponentTests ? [] : ['**/*/test/specs/component']),
            ...(this.config.needsComponentTranslations ? [] : ['**/*/src/tenants']),
            ...(this.config.needsTestingApiMocks ? [] : ['**/*/src/services']),
            ...(this.config.isComponent ? [
                '**/*/vite.config.js'
            ] : [
                '**/*/vue.config.js',
                '**/*/src/assets',
                '**/*/src/components',
                '**/*/stories',
                '**/*/test',
                '**/*/test-utils'
            ])
        ];
    }

    async writing () {
        // Registers a transform stream which modifies the template files as they are written to the destination directory
        this.registerTransformStream(rename(path => {
            path.basename = path.basename
                // Modify any files containing the keyword `Skeleton` to be replaced with the name of the component
                .replace(/(Skeleton)/g, this.nameTransformations.filename)
                // Modify any files containing the keyword `f-skeleton` to be replaced with the name of the component
                .replace(/(f-skeleton)/g, `f-${this.nameTransformations.class}`)
                // Certain template files have been prefixed with "__" to stop them being indexed by our tooling (such as Jest and Storybook files)
                // So we need to remove these prefixes before writing the files to our dest directory
                .replace(/__/g, '');
        }));

        this.componentPath = `${this.componentDistFolder}f-${this.nameTransformations.default}/`;

        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(this.componentPath),
            {
                name: this.nameTransformations,
                bundlewatchMaxSize: this.answers.bundlewatchMaxSize,
                changelogDate: `${this.currentDate.month} ${this.currentDate.day}, ${this.currentDate.year}`,
                config: this.config,
                description: this.answers.description,
                componentCategory: this.componentCategory,
                storybook: this.storybook,
                componentFolder: this.componentDistFolder
            },
            null,
            {
                globOptions: {
                    dot: true,
                    ignore: this.ignorePatterns
                }
            }
        );
    }

    async end () {
        this.log(chalk`{yellow.bold Your component has been created at} {white ${this.componentPath}}`);
    }
};
