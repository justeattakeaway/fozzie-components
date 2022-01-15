export default class FormField {
    constructor ({
        name,
        translations,
        maxLength
    }) {
        this.name = name;
        this.translations = translations;
        this.validationMessages = this.translations.validationMessages || null;
        this.maxLength = maxLength || null;
        this.props = this.createProps();
        this.ariaLabel = this.createAriaLabel;
        this.errorProps = this.createErrorProps;
        this.errorMessage = this.createErrorMessage;
    }

    createProps () {
        return {
            name: this.kebabCase(),
            'label-text': this.translations.label,
            'input-type': this.inputType(),
            'max-length': this.maxLength || null
        };
    }

    kebabCase () {
        return this.name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z1-9])/g, '$1-$2').toLowerCase();
    }

    createErrorProps (error) {
        const errorProps = {
            ...(error ? {
                'has-error': true,
                'aria-invalid': true,
                'aria-describedby': this.validationMessages[this.error]
            } : {})
        };

        return {
            ...this.props,
            ...errorProps
        };
    }

    createErrorMessage (error) {
        return {
            props: {
                id: `${this.kebabCase}-error`,
                'data-test-id': `error-${this.kebabCase}-${error}`
            },
            text: this.validationMessages[error]
        };
    }

    inputType () {
        const inputTypes = {
            mobileNumber: 'tel',
            email: 'email',
            default: 'text'
        };

        return inputTypes[this.name] || inputTypes.default;
    }

    createAriaLabel (value) {
        return this.name === 'mobileNumber' && value ? [...value].join(' ') : null;
    }
}

