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
import fieldValidationsMixin from '../mixin/fieldValidation.mixin';

export default {
    components: {
        ErrorMessage,
        FormField
    },

    mixins: [fieldValidationsMixin],

    props: {
        fieldData: {
            type: Object,
            required: true
        }
    },

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
            return {
                name: this.translations.name,
                value: this.fieldData.value,
                'label-text': this.translations.label,
                'input-type': this.inputType,
                'max-length': this.fieldData.maxLength || null,
                ...(this.hasError ? {
                    'aria-label': this.ariaLabel
                } : {}),
                ...(this.hasError ? {
                    'has-error': true,
                    'aria-invalid': true,
                    'aria-describedby': this.translations.validationMessages[this.errorType]
                } : {})
            };
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
            return !!this.hasValidationMessages && this.error;
        },

        ariaLabel () {
            if (this.fieldData.name === 'mobileNumber' && this.fieldData.value) {
                return [...this.fieldData.value].join(' ') || null;
            }

            return null;
        }
    },

    mounted () {
        if (this.hasValidationMessages) {
            this.createField(this.fieldData.name);
        }
    },

    methods: {
        updateField ({ fieldName, value }) {
            this.$emit(FORM_EVENTS.fieldUpdated, { fieldName, value });
        }
    }
};
</script>

<style lang="scss" module/>
