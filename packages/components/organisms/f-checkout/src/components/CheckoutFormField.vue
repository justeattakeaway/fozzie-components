<template>
    <form-field
        :value="value"
        :aria-describedby="`${kebabCase}-error`"
        :aria-invalid="isEmpty"
        :name="`${fieldType}-${kebabCase}`"
        :maxlength="maxLength"
        :label-text="$t(`formFields.${fieldName}.label`)"
        :has-error="isEmpty"
        v-bind="groupedProps"
        @blur="formFieldBlur"
        @input="updateValue">
        <template
            v-if="hasErrorState"
            #error>
            <error-message
                v-if="isEmpty"
                :id="`${kebabCase}-error`"
                data-js-error-message
                :class="[{ [$style['c-address-error']]: isGrouped }]"
                :data-test-id="`error-${kebabCase}-empty`">
                {{ $t(`formFields.${fieldName}.validationMessages.requiredError`) }}
            </error-message>
            <error-message
                v-else-if="!isFieldValid"
                :id="`${kebabCase}-error`"
                data-js-error-message
                :data-test-id="`error-${fieldType}-${kebabCase}-type-error`">
                {{ $t(`formFields.${fieldName}.validationMessages.invalidError`) }}
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

        fieldType: {
            type: String,
            required: true
        },

        isGrouped: {
            type: Boolean,
            default: false
        },

        maxLength: {
            type: String,
            default: "100"
        },

        shouldBlur: {
            type: Boolean,
            default: false
        }
    },

    /*
    * Provide/Inject allows nested `Guest` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer',
            'address'
        ]),

        value () {
            if (this.fieldType === 'guest') {
                return this.customer[this.fieldName];
            }
            return this.address[this.fieldName];
        },

        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */

        hasErrorState () {
            return !!this.$t(`formFields.${this.fieldName}`).validationMessages;
        },

        isEmpty () {
            return this.hasErrorState ? this.isFieldEmpty(VALIDATIONS[this.fieldType], this.fieldName) : false;
        },

        isFieldValid () {
            const hasValidityError = !!this.$t(`formFields.${this.fieldName}`).validationMessages?.invalidError;

            if (hasValidityError) {
                return (!this.$v[VALIDATIONS[this.fieldType]][this.fieldName].$dirty || this.$v[VALIDATIONS[this.fieldType]][this.fieldName][this.fieldName]) && !this.isEmpty;
            } else {
                return true
            }
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        },

        groupedProps () {
            const props = {
                placeholder: this.$t(`formFields.${this.fieldName}.label`),
                isGrouped: true,
                shouldShowLabelText: false,
                class: this.$style['c-address-formField']
            };

            return this.isGrouped ? props : null;
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCustomerDetails',
            'updateAddressDetails'
        ]),

        updateValue (e) {
            if (this.fieldType === 'guest') {
                this.updateCustomerDetails({ [this.fieldName]: e });
            } else {
                this.updateAddressDetails({ [this.fieldName]: e });
            }
        },

        formFieldBlur (field) {
            if (this.shouldBlur) {
                const fieldValidation = this.$v[VALIDATIONS[this.fieldType]][field];
                if (fieldValidation) {
                    fieldValidation.$touch();
                }
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-address-formField {
    &:focus-within,
    &:active {
        z-index: zIndex(high);
        position: relative;
    }
}

.c-address-error {
    margin-bottom: spacing(x2);
}
</style>
