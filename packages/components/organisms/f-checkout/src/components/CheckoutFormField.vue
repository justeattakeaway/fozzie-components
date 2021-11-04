<template>
    <form-field
        :value="value"
        :name="translations.name"
        :input-type="inputType"
        :label-text="translations.label"
        :has-error="hasError"
        :maxlength="maxLength"
        v-bind="isGrouped && groupedProps"
        :aria-invalid="hasError"
        :aria-describedby="hasValidationMessages && translations.errorName"
        @blur="shouldValidateOnBlur && formFieldBlur()"
        @input="updateUserDetails({ fieldType, fieldName, value: $event })">
        <template #error>
            <error-message
                v-if="hasErrorType('required') && isEmpty"
                :id="translations.errorName"
                data-js-error-message
                :class="[{ [$style['c-checkoutFormField-error--grouped']]: isGrouped }]"
                :data-test-id="translations.emptyError">
                {{ translations.validationMessages.required }}
            </error-message>
            <error-message
                v-else-if="!isValid"
                :id="translations.errorName"
                data-js-error-message
                :data-test-id="translations.invalidError">
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
            return this[this.fieldType][this.fieldName];
        },

        translations () {
            return {
                ...this.$t(`formFields.${this.fieldType}.${this.fieldName}`),
                name: `${this.kebabCase}`,
                errorName: `${this.kebabCase}-error`,
                emptyError: `error-${this.kebabCase}-empty`,
                invalidError: `error-${this.kebabCase}-invalid`
            };
        },

        isEmpty () {
            return this.isFieldEmpty(VALIDATIONS[this.fieldType], this.fieldName);
        },

        isValid () {
            if (this.hasErrorType('invalid')) {
                const validations = this.$v[VALIDATIONS[this.fieldType]][this.fieldName];

                return (!validations.$dirty || validations[this.fieldName]) && !this.isEmpty;
            }
            return true;
        },

        hasError () {
            return this.hasValidationMessages && (this.isEmpty || !this.isValid);
        },

        hasValidationMessages () {
            return !!this.translations.validationMessages;
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        },

        groupedProps () {
            return {
                placeholder: this.translations.label,
                isGrouped: true,
                shouldShowLabelText: false
            };
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserDetails'
        ]),

        formFieldBlur () {
            const fieldValidation = this.$v[VALIDATIONS[this.fieldType]][this.fieldName];

            if (fieldValidation) {
                fieldValidation.$touch();
            }
        },

        hasErrorType (errorType) {
            return this.hasValidationMessages && !!this.translations.validationMessages[errorType];
        }
    }
};
</script>

<style lang="scss" module>
.c-checkoutFormField-error--grouped {
    margin-bottom: spacing(x2);
}
</style>
