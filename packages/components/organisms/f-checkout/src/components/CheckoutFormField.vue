<template>
    <form-field
        :value="value"
        :name="`${fieldType}-${kebabCase}`"
        :maxlength="maxLength"
        :label-text="translations.label"
        :aria-describedby="`${kebabCase}-error`"
        :aria-invalid="hasValidationErrors && (isEmpty || !isValid)"
        :input-type="inputType"
        :has-error="hasValidationErrors && (isEmpty || !isValid)"
        v-bind="isGrouped && groupedProps"
        @blur="formFieldBlur"
        @input="updateUserDetails({ fieldType, [fieldName]: $event })">
        <template
            #error>
            <error-message
                v-if="hasValidationErrors && isEmpty"
                :id="`${kebabCase}-error`"
                data-js-error-message
                :class="[{ [$style['c-checkoutFormField-error--grouped']]: isGrouped }]"
                :data-test-id="`error-${kebabCase}-empty`">
                {{ translations.validationMessages.required }}
            </error-message>
            <error-message
                v-else-if="hasValidationErrors && !isValid"
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

        fieldType: {
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
        },

        isGrouped: {
            type: Boolean,
            defalut: false
        }
    },

    /**
     * Provide/Inject allows component to inherit `Checkout`
     * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer',
            'address'
        ]),

        value () {
            const type = this.fieldType === 'guest' ? 'customer' : this.fieldType;
            return this[type][this.fieldName];
        },

        translations () {
            return this.$t(`formFields.${this.fieldType}.${this.fieldName}`);
        },

        isEmpty () {
            return this.isFieldEmpty(VALIDATIONS[this.fieldType], this.fieldName);
        },

        hasValidationErrors () {
            return !!this.translations.validationMessages;
        },

        isValid () {
            if (this.hasErrorType('invalid')) {
                const validations = this.$v[VALIDATIONS[this.fieldType]][this.fieldName];

                return (!validations.$dirty || validations[this.fieldName]) && !this.isEmpty;
            }
            return true;
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        },

        groupedProps () {
            return {
                placeholder: this.translations.label,
                isGrouped: true,
                shouldShowLabelText: false,
                class: this.$style['c-checkoutFormField-grouped']
            };
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserDetails'
        ]),

        formFieldBlur () {
            if (this.shouldValidateOnBlur) {
                const fieldValidation = this.$v[VALIDATIONS[this.fieldType]][this.fieldName];

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

<style lang="scss" module>
.c-checkoutFormField--grouped {
    &:focus-within,
    &:active {
        z-index: zIndex(high);
        position: relative;
    }
}
.c-checkoutFormField-error--grouped {
    margin-bottom: spacing(x2);
}
</style>
