<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

const meetsCharacterValidationRules = value => /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);

export default {
    validations: {
        firstName: {
            required,
            maxLength: maxLength(50),
            meetsCharacterValidationRules
        },
        lastName: {
            required,
            maxLength: maxLength(50),
            meetsCharacterValidationRules
        }
    },

    mixins: [validationMixin],

    methods: {
        isFormInvalid () {
            const v = this.$v;

            function countErrors () {
                return [
                    v.firstName.$anyError,
                    v.lastName.$anyError
                ]
                .filter(x => x)
                .length;
            }

            v.firstName.$touch();
            v.lastName.$touch();

            if (v.$invalid) {
                this.genericErrorMessage = `There are ${countErrors()} errors in the form.`;
                return true;
            }

            this.genericErrorMessage = '';

            return false;
        },

        outputValidationDiagnostics () {
            const fields = this.$v.$params;
            const invalidFields = [];
            const validFields = [];

            Object.keys(fields).forEach(key => {
                if (this.$v[key].$invalid) {
                    invalidFields.push(key);
                } else {
                    validFields.push(key);
                }
            });

            return {
                validFields,
                invalidFields
            };
        },

        logValidationFailure () {
            const validationDiagnostics = this.outputValidationDiagnostics();

            this.$log.warn('Validation Failed', 'account-info', {
                ...validationDiagnostics
            });
        }
    }

};
</script>
