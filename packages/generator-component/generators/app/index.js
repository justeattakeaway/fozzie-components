const utils = require('./utils.js');
const rename = require('gulp-rename');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor (args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async prompting () {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What's your new component name (without the 'f-' prefix)? e.g. 'user-message'"
            },
            {
                type: 'input',
                name: 'description',
                message: 'How would you describe your new component?'
            }
        ]);
    }

    async writing () {
        const name = this.answers.name.toLowerCase();

        const nameTransformations = {
            default: name, // e.g. header or user-message
            component: utils.getComponentName(name), // e.g VueHeader or UserMessage,
            filename: utils.getComponentFilename(name), // Header(.vue) or UserMessage(.vue)
            template: utils.getComponentTemplateName(name), // vue-header or user-message,
            class: utils.getComponentClassName(name), // (c-)header or (c-)userMessage,
            readme: utils.getReadmeName(name) // Header or User Message
        }

        this.registerTransformStream(rename(function(path) {
            path.basename = path.basename.replace(/(Skeleton)/g, nameTransformations.filename);
        }));

        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(`../f-${this.answers.name}/`),
            {
                name: nameTransformations,
                description: this.answers.description,
                globOptions: { dot: true }
            }
        );
    }
};
