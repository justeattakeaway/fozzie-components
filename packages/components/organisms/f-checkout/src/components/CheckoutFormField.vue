<template>
    <form-field
        :value="customer[fieldName]"
        :name="`guest-${kebabCase}`"
        :maxlength="maxLength"
        :label-text="translations.label"
        :aria-describedby="`${kebabCase}-error`"
        :aria-invalid="isEmpty || !isValid"
        :input-type="inputType"
        :has-error="isEmpty || !isValid"
        @blur="formFieldBlur"
        @input="updateCustomerDetails({ [fieldName]: $event })">
        <template
            #error>
            <error-message
                v-if="isEmpty && hasErrorType('required')"
                :id="`${kebabCase}-error`"
                data-js-error-message
                :data-test-id="`error-${kebabCase}-empty`">
                {{ translations.validationMessages.required }}
            </error-message>
            <error-message
                v-if="!isValid"
                :id="`${kebabCase}-error`"
                data-js-error-message
                :data-test-id="`error-${kebabCase}-invalid`">
                {{ translations.validationMessages.invalid }}
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
import checkoutValidationsMixin from '../mixins/validations.mixin';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },
    mixins: [checkoutValidationsMixin],
    props: {
        fieldName: {
            type: String,
            required: true
        },

        inputType: {
            type: String,
            default: 'text'
        },

        maxLength: {
            type: String,
            default: '100'
        },

        shouldValidateOnBlur: {
            type: Boolean,
            default: false
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
            return this.$t(`formFields.customer.${this.fieldName}`);
        },

        isEmpty () {
            return this.isFieldEmpty(VALIDATIONS.guest, this.fieldName);
        },

        isValid () {
            if (this.hasErrorType('invalid')) {
                const validations = this.$v[VALIDATIONS.guest][this.fieldName];

                return (!validations.$dirty || validations[this.fieldName]) && !this.isEmpty;
            }
            return true;
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCustomerDetails'
        ]),

        formFieldBlur (field) {
            if (this.shouldValidateOnBlur) {
                const fieldValidation = this.$v[VALIDATIONS.guest][field];

                if (fieldValidation) {
                    fieldValidation.$touch();
                }
            }
        },

        hasErrorType (errorType) {
            return !!this.translations.validationMessages?.[errorType];
        }
    }
};
</script>

