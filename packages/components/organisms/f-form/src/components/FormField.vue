<template>
    <form-field
        v-bind="fieldProps"
        @input="updateField({ fieldName: fieldData.name, value: $event })"
        @blur="hasInvalidErrorMessage && formFieldBlur()">
        <template
            v-if="hasError"
            #error>
            <error-message
                :id="translations.errorName"
                data-js-error-message
                :data-test-id="translations[`${errorType}Error`]">
                {{ translations.validationMessages[errorType] }}
            </error-message>
        </template>
    </form-field>
</template>

<script>
import FormField from '@justeat/f-form-field';
import ErrorMessage from '@justeat/f-error-message';
import { FORM_EVENTS } from '../constants';

export default {
    components: {
        ErrorMessage,
        FormField
    },

    props: {
        fieldData: {
            type: Object,
            required: true
        }
    },

    inject: ['$v'],

    computed: {
        kebabCase () {
            return this.fieldData.name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z1-9])/g, '$1-$2').toLowerCase();
        },

        translations () {
            return {
                ...this.fieldData.translations,
                name: `${this.kebabCase}`,
                errorName: `${this.kebabCase}-error`,
                emptyError: `error-${this.kebabCase}-empty`,
                invalidError: `error-${this.kebabCase}-invalid`
            };
        },

        fieldProps () {
            let props = {
                name: this.translations.name,
                value: this.fieldData.value,
                'label-text': this.translations.label,
                'input-type': this.inputType,
                'max-length': this.fieldData.mexLength || null
            };

            if (this.ariaLabel) {
                props = {
                    ...props,
                    'aria-label': this.ariaLabel
                };
            }

            if (this.hasError) {
                props = {
                    ...props,
                    'has-error': true,
                    'aria-invalid': true,
                    'aria-describedby': this.translations.validationMessages[this.errorType]
                };
            }

            return props;
        },

        inputType () {
            const inputTypes = {
                mobileNumber: 'tel',
                email: 'email',
                default: 'text'
            };

            return inputTypes[this.fieldData.name] || inputTypes.default;
        },

        hasValidationMessages () {
            return !!this.translations?.validationMessages;
        },

        hasInvalidErrorMessage () {
            return !!this.translations?.validationMessages?.invalid;
        },

        hasError () {
            return !!this.hasValidationMessages && (this.hasRequiredError || this.hasInvalidError);
        },

        isEmpty () {
            return this.validations?.$dirty;
        },

        validations () {
            return this.$v.formFields[this.fieldData.name];
        },

        hasRequiredError () {
            return this.isEmpty && !this.validations.required;
        },

        hasInvalidError () {
            return !!this.hasInvalidErrorMessage && this.isEmpty && !this.validations[this.fieldData.name];
        },

        errorType () {
            if (this.hasError) {
                return this.hasRequiredError ? 'required' : 'invalid';
            }
            return null;
        },

        ariaLabel () {
            if (this.fieldData.name === 'mobileNumber' && this.fieldData.value) {
                return [...this.fieldData.value].join(' ') || null;
            }
            return null;
        }
    },

    methods: {
        updateField ({ fieldName, value }) {
            this.$emit(FORM_EVENTS.fieldUpdated, { fieldName, value });
        },

        formFieldBlur () {
            if (this.validations) {
                this.validations.$touch();
            }
        }
    }
};
</script>

<style lang="scss" module>
</style>
