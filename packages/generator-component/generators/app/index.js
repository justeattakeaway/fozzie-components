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
                                .replace(/__/g, ''); // We don't want to have file names such as .test.js or .stories.js, otherwise Jest or Storybook will pick them up from the templates folder.
        }));

        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(`../f-${nameTransformations.default}/`),
            {
                description: this.answers.description,
                name: nameTransformations
            },
            null,
            {
                globOptions: {
                    dot: true
                }
            }
        );
    }
};
