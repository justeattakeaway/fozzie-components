<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

const meetsCharacterValidationRules = value => /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);

const formValidationState = $v => {
    const fields = $v.$params;
    const invalidFields = [];
    const validFields = [];

    Object.keys(fields).forEach(key => {
        if ($v[key].$invalid) {
            invalidFields.push(key);
        } else {
            validFields.push(key);
        }
    });

    return {
        validFields,
        invalidFields
    };
};

export default {
    validations: {
        fields: {
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
        }
    },

    mixins: [validationMixin],

    methods: {
        isFormInvalid () {
            const v = this.$v;

            function countErrors () {
                return [
                    v.fields.firstName.$anyError,
                    v.fields.lastName.$anyError
                ]
                .filter(x => x)
                .length;
            }

            v.fields.firstName.$touch();
            v.fields.lastName.$touch();

            if (v.$invalid) {
                this.genericErrorMessage = `There are ${countErrors()} errors in the form.`;
                return true;
            }

            this.genericErrorMessage = '';
            return false;
        },
        logValidationFailure () {
            const validationState = formValidationState(this.$v);
            this.$log.warn('Validation Failed', 'account-info', {
                ...validationState
            });
        }
    }

};
</script>
