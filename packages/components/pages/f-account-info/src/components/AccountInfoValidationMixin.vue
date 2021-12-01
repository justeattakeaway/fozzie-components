<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { validations } from '@justeat/f-services';

export default {
    validations () {
        const validationRules = {
            fields: {
                firstName: {
                    required,
                    isValidName: this.isValidName
                },
                lastName: {
                    required,
                    isValidName: this.isValidName
                },
                phoneNumber: {
                    required,
                    phoneNumberValid: this.isValidPhoneNumber
                },
                line1: {
                    required
                },
                locality: {
                    required
                },
                postcode: {
                    required,
                    postcodeValid: this.isValidPostcode
                }
            }
        };

        return validationRules;
    },

    mixins: [validationMixin],

    methods: {
        isFormInvalid () {
            this.$v.$touch();
            return this.$v.$invalid;
        },

        logValidationFailure () {
            const validationDiagnostics = validations.getFormValidationState(this.$v);

            this.$log.warn('Validation Failed', ['account-info', 'account-pages'], {
                ...validationDiagnostics
            });
        },

        isValidPhoneNumber () {
            return validations.isValidPhoneNumber(this.fields.phoneNumber, this.$i18n.locale);
        },

        isValidPostcode () {
            return validations.isValidPostcode(this.fields.postcode, this.$i18n.locale);
        },

        /**
         * Tests that the provided string only contains valid characters (multi-language letters and apostrophe)
         *
         * @param {string} value The string to test.
         * @return {boolean} False if the string contains invalid characters, otherwise returns true
         */
        isValidName (value) {
            return /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);
        },

        onBlur (field) {
            const fieldValidation = this.$v.fields[field];

            if (fieldValidation) {
                fieldValidation.$touch();
            }
        }
    }
};
</script>
