const utils = require('./utils.js');

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
        const rootDestinationPath = `../f-${this.answers.name}`;

        const name = this.answers.name.toLowerCase();

        const nameTransformations = {
            default: name, // e.g. header or user-message
            // package: `f-${name}`, // e.g. f-header or f-user-message
            component: utils.getComponentName(name), // e.g VueHeader or UserMessage,
            filename: utils.getComponentFilename(name), // Header(.vue) or UserMessage(.vue)
            template: utils.getComponentTemplateName(name), // vue-header or user-message,
            class: utils.getComponentClassName(name), // (c-)header or (c-)userMessage,
            readme: utils.getReadmeName(name) // Header or User Message
        }

        // this.log('packageName', nameTransformations.packageName);
        this.log('default', nameTransformations.default);
        this.log('component', nameTransformations.component);
        this.log('filename', nameTransformations.filename);
        this.log('template', nameTransformations.template);
        this.log('class', nameTransformations.class);
        this.log('readme', nameTransformations.readme);

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(`${rootDestinationPath}/package.json`),
            { name: nameTransformations, description: this.answers.description }
        );
    }
};
