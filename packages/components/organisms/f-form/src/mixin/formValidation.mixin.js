import { validationMixin } from 'vuelidate';
import {
    required, email
} from 'vuelidate/lib/validators';
import { validations } from '@justeat/f-services';

export default {
    mixins: [validationMixin],

    data () {
        return {
            fields: {}
        };
    },

    computed: {
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

        if (this.fields.length) {
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
        createValidations (formData) {
            this.fields = formData;
        },

        isFormValid () {
            this.$v.$touch();

            return !this.$v.$invalid;
        },

        isValidPhoneNumber () {
            const phoneNumberValue = this.fields.find(field => field.name === 'mobileNumber');

            return phoneNumberValue && validations.isValidPhoneNumber(phoneNumberValue.value, this.locale);
        },

        isValidPostcode () {
            const postcodeValue = this.fields.find(field => field.name === 'postcode');

            return postcodeValue && validations.isValidPostcode(postcodeValue.value, this.locale);
        },

        formFieldBlur (fieldName) {
            if (this.fieldValidations(fieldName)) {
                this.fieldValidations(fieldName).$touch();
            }
        },

        fieldValidations (fieldName) {
            return this.$v.formFields[fieldName];
        },

        fieldStatus (fieldName) {
            const isDirty = this.fieldValidations(fieldName).$dirty;
            const hasRequiredError = isDirty && !this.fieldValidations(fieldName).required;
            const hasInvalidError = isDirty && this.fieldValidations(fieldName).isValid === false;

            if (hasRequiredError || hasInvalidError) {
                return hasRequiredError ? 'required' : 'invalid';
            }
            return false;
        }
    }
};
