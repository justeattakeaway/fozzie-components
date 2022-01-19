/* eslint-disable max-classes-per-file */
class FormFieldClass {
    constructor ({
        name,
        translations,
        value,
        maxLength = null
    }) {
        this.name = name;
        this.value = value;
        this.translations = translations;
        this.validationMessages = this.translations.validationMessages || null;
        this.maxLength = maxLength;
        this.props = this.createProps();
    }

    createProps () {
        const ariaLabel = this.createAriaLabel(this.value);

        return {
            name: this.kebabCase(),
            'label-text': this.translations.label,
            'input-type': this.inputType(),
            ...(this.maxLength ? { 'max-length': this.maxLength } : {}),
            ...(ariaLabel ? { 'aria-label': ariaLabel } : {})
        };
    }

    kebabCase () {
        return this.name.replace(/([a-z0–9])([A-Z1-9])/g, '$1-$2').toLowerCase(); // https://stackoverflow.com/a/70226943
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

class FormFieldErrorClass extends FormFieldClass {
    constructor (field, error) {
        super(field);
        this.error = error;
        this.props = this.createErrorProps();
        this.errorMessage = this.createErrorMessage();
        this.errorId = this.createErrorId();
    }

    createErrorProps () {
        const errorProps = {
            ...this.error && {
                'has-error': true,
                'aria-invalid': true,
                'aria-describedby': this.createErrorId()
            }
        };

        return {
            ...errorProps,
            ...this.props
        };
    }

    createErrorMessage () {
        return {
            props: {
                id: this.createErrorId(),
                'data-test-id': `error-${this.kebabCase()}-${this.error}`
            },
            text: this.translations.validationMessages[this.error]
        };
    }

    createErrorId () {
        return `error-${this.kebabCase()}-${this.error}`;
    }
}

export {
    FormFieldClass,
    FormFieldErrorClass
};
