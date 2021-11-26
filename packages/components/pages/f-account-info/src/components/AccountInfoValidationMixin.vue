<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import { validations } from '@justeat/f-services';

export default {
    validations () {
        const validationRules = {
            fields: {
                firstName: {
                    required,
                    maxLength: maxLength(50),
                    isValidName: this.isValidName
                },
                lastName: {
                    required,
                    maxLength: maxLength(50),
                    isValidName: this.isValidName
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

        isValidPostcode () {
            return validations.isValidPostcode(this.fields.postcode, this.$i18n.locale);
        },

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
