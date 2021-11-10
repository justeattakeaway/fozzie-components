<template>
    <form-field
        :value="customer[fieldName]"
        :name="translations.name"
        :input-type="inputType"
        :label-text="translations.label"
        :maxlength="maxLength"
        :has-error="hasError"
        :aria-invalid="hasError"
        :aria-describedby="hasError && translations.errorName"
        :aria-label="isPhoneNumber && formattedMobileNumberForScreenReader"
        @blur="hasInvalidErrorMessage && formFieldBlur()"
        @input="updateCustomerDetails({ [fieldName]: $event })">
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
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { mapState, mapActions } from 'vuex';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },

    props: {
        fieldName: {
            type: String,
            required: true
        },

        maxLength: {
            type: String,
            default: '100'
        }
    },

    /**
     * Provide/Inject allows component to inherit `Checkout`
     * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer'
        ]),

        translations () {
            return {
                ...this.$t(`formFields.customer.${this.fieldName}`),
                name: `${this.kebabCase}`,
                errorName: `${this.kebabCase}-error`,
                emptyError: `error-${this.kebabCase}-empty`,
                invalidError: `error-${this.kebabCase}-invalid`
            };
        },

        validations () {
            return this.$v[VALIDATIONS.customer][this.fieldName];
        },

        errorType () {
            if (this.hasError) {
                return this.hasRequiredError ? 'required' : 'invalid';
            }
            return null;
        },

        inputType () {
            const inputTypes = {
                mobileNumber: 'tel',
                email: 'email',
                default: 'text'
            };

            return inputTypes[this.fieldName] || inputTypes.default;
        },

        isPhoneNumber () {
            return this.inputType === 'tel';
        },

        hasValidationMessages () {
            return !!this.translations.validationMessages;
        },

        hasInvalidErrorMessage () {
            return this.hasValidationMessages && !!this.translations.validationMessages.invalid;
        },

        isEmpty () {
            return this.validations.$dirty;
        },

        hasRequiredError () {
            return this.isEmpty && !this.validations.required;
        },

        hasInvalidError () {
            return !!this.hasInvalidErrorMessage && this.isEmpty && !this.validations[this.fieldName];
        },

        hasError () {
            return this.hasValidationMessages && (this.hasRequiredError || this.hasInvalidError);
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        },

        formattedMobileNumberForScreenReader () {
            return this.customer.mobileNumber ? [...this.customer.mobileNumber].join(' ') : '';
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCustomerDetails'
        ]),

        formFieldBlur () {
            if (this.validations) {
                this.validations.$touch();
            }
        }
    }
};
</script>
