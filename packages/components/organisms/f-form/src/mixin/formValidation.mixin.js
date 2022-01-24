import { validationMixin } from 'vuelidate';
import {
    required, email
} from 'vuelidate/lib/validators';
import { validations } from '@justeat/f-services';
import VueScrollTo from 'vue-scrollto';

export default {
    mixins: [validationMixin],

    computed: {
        fields () {
            return this.formData.formFields;
        },

        validationState () {
            return validations.getFormValidationState(this.$v);
        },

        invalidFieldsSummary () {
            const invalidFieldCount = this.$v.formFields.$dirty
                && validations.getFormValidationState(this.$v.formFields).invalidFields.length;

            if (!invalidFieldCount) return null;

            return this.$tc('invalidFields', invalidFieldCount);
        }
    },

    validations () {
        const invalidValidations = {
            email,
            mobileNumber: this.isValidPhoneNumber,
            postcode: this.isValidPostcode
        };

        const formFields = {};

        if (this.fields?.length) {
            this.fields.forEach(field => {
                const validationMessages = field.translations?.validationMessages;

                if (validationMessages) {
                    formFields[field.name] = {
                        required,
                        ...(validationMessages.invalid ? {
                            isValid: invalidValidations[field.name]
                        } : {})
                    };
                }
            });
        }

        return { formFields };
    },

    methods: {
        isFormValid () {
            this.$v.$touch();

            return !this.$v.$invalid;
        },

        isValidPhoneNumber () {
            const phoneNumberField = this.fields.find(field => field.name === 'mobileNumber');

            return phoneNumberField && validations.isValidPhoneNumber(phoneNumberField.value, this.locale);
        },

        isValidPostcode () {
            const postcodeField = this.fields.find(field => field.name === 'postcode');

            return postcodeField && validations.isValidPostcode(postcodeField.value, this.locale);
        },

        formFieldBlur (field) {
            const { name, validationMessages } = field;
            const fieldValidations = this.fieldValidations(name);

            if (validationMessages?.invalid && fieldValidations) {
                fieldValidations.$touch();
            }
        },

        fieldValidations (fieldName) {
            return this.$v.formFields[fieldName];
        },

        fieldErrorStatus (fieldName) {
            const fieldValidations = this.fieldValidations(fieldName);

            if (fieldValidations?.$dirty) {
                const hasRequiredError = !fieldValidations.required;
                const hasInvalidError = fieldValidations.isValid === false;

                if (hasRequiredError) return 'required';
                if (hasInvalidError) return 'invalid';
            }
            return false;
        },

        scrollToFirstInlineError () {
            this.$nextTick(() => {
                const scrollingDurationInMilliseconds = 650;
                const firstInlineError = document.querySelector('[data-js-error-message]');

                if (firstInlineError) {
                    VueScrollTo.scrollTo(firstInlineError, scrollingDurationInMilliseconds, { offset: -100 });
                }
            });
        }
    }
};
