const rename = require('gulp-rename');
const Generator = require('yeoman-generator');
const utils = require('./utils.js');

module.exports = class extends Generator {
    async prompting () {
        this.answers = await this.prompt([
            {
                message: "What's your new component name (without the 'f-' prefix)? e.g. 'user-message'",
                name: 'name',
                type: 'input'
            },
            {
                message: 'How would you describe your new component?',
                name: 'description',
                type: 'input'
            },
            {
                message: 'Does the component require browser-based Component Tests?',
                name: 'needsComponentTests',
                type: 'confirm',
                default: false
            },
            {
                message: 'Does the component interact with any API\'s?',
                name: 'needsTestingApiMocks',
                type: 'confirm',
                default: false
            }
        ]);
    }

    async writing () {
        const name = this.answers.name.toLowerCase();

        const nameTransformations = {
            class: utils.getComponentClassName(name), // (c-)header or (c-)userMessage,
            component: utils.getComponentName(name), // e.g VueHeader or UserMessage,
            default: name, // e.g. header or user-message
            filename: utils.getComponentFilename(name), // Header(.vue) or UserMessage(.vue)
            readme: utils.getReadmeName(name), // Header or User Message
            template: utils.getComponentTemplateName(name) // vue-header or user-message,
        };

        this.registerTransformStream(rename(path => {
            path.basename = path.basename
                                .replace(/(Skeleton)/g, nameTransformations.filename)
                                .replace(/(f-skeleton)/g, `f-${nameTransformations.class}`)
                                .replace(/__/g, ''); // We don't want to have file names such as .test.js or .stories.js, otherwise Jest or Storybook will pick them up from the templates folder.
        }));
        let ignoreTestPattern = this.answers.needsComponentTests ? [] : ["**/*/test/specs/component", '**/*/test-utils/component-objects']
        const ignoreApiMockPattern = this.answers.needsTestingApiMocks ? [] : ["**/*/src/services"];
    
        ignoreTestPattern = ignoreTestPattern.concat(ignoreApiMockPattern);

        const date = new Date();
        const month = date.toLocaleString('en-GB', { month: 'long' });
        const day = date.toLocaleString('en-GB', { day: 'numeric' });
        const year = date.toLocaleString('en-GB', { year: 'numeric' });

        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(`f-${nameTransformations.default}/`),
            {
                description: this.answers.description,
                name: nameTransformations,
                needsComponentTests: this.answers.needsComponentTests,
                needsTestingApiMocks: this.answers.needsTestingApiMocks,
                changelogDate: `${month} ${day}, ${year}`
            },
            null,
            {
                globOptions: {
                    dot: true,
                    ignore: ignoreTestPattern
                }
            }
        );
    }
};
