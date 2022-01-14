export default {
    inject: ['$v'],

    data () {
        return {
            fieldName: ''
        };
    },

    computed: {
        error () {
            return this.hasRequiredError || this.hasInvalidError;
        },

        validations () {
            return this.$v.formFields[this.fieldName];
        },

        isDirty () {
            return this.validations?.$dirty;
        },

        hasRequiredError () {
            return this.isDirty && !this.validations.required;
        },

        hasInvalidError () {
            return !!this.hasInvalidErrorMessage && this.isDirty && !this.validations.isInvalid;
        },

        errorType () {
            if (this.hasError) {
                return this.hasRequiredError ? 'required' : 'invalid';
            }

            return null;
        }
    },

    methods: {
        createField (fieldName) {
            this.fieldName = fieldName;
        },

        formFieldBlur () {
            if (this.validations) {
                this.validations.$touch();
            }
        }
    }
};
