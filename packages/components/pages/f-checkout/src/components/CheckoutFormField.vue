<template>
    <form-field
        :value="value"
        :name="translations.name"
        :input-type="inputType"
        :label-text="translations.label"
        :maxlength="maxLength"
        v-bind="isGrouped && groupedProps"
        :has-error="hasError"
        :aria-invalid="hasError"
        :aria-describedby="hasError && translations.errorName"
        :aria-label="isPhoneNumber && formattedMobileNumberForScreenReader"
        @blur="hasInvalidErrorMessage && formFieldBlur()"
        @input="updateUserDetails({ fieldType, fieldName, value: $event })">
        <template
            v-if="shouldShowEircodeHelper"
            #assistive-text-slot>
            <p :class="$style['c-checkoutFormField-assistiveText']">
                {{ translations.assistiveText }}
                <a :href="translations.assistiveTextUrl">
                    {{ translations.assistiveTextLink }}
                </a>
            </p>
        </template>
        <template
            v-if="hasError"
            #error>
            <error-message
                :id="translations.errorName"
                data-js-error-message
                :class="[{ [$style['c-checkoutFormField-error--grouped']]: isGrouped }]"
                :data-test-id="translations[`${errorType}Error`]">
                {{ translations.validationMessages[errorType] }}
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
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },

    /**
     * Provide/Inject allows component to inherit `Checkout`
     * validator scope, `$v`.
    */
    inject: ['$v'],

    props: {
        fieldName: {
            type: String,
            required: true
        },

        fieldType: {
            type: String,
            required: true
        },

        maxLength: {
            type: String,
            default: '100'
        },

        tenant: {
            type: String,
            required: true
        },

        isGrouped: {
            type: Boolean,
            defalut: false
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'address',
            'customer',
            'dineIn'
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

        validations () {
            return this.$v[VALIDATIONS[this.fieldType]][this.fieldName];
        },

        errorType () {
            if (this.hasError) {
                return this.hasRequiredError ? 'required' : 'invalid';
            }
            return null;
        },

        inputType () {
            const inputTypes = {
                mobileNumber: 'tel',
                email: 'email',
                default: 'text'
            };

            return inputTypes[this.fieldName] || inputTypes.default;
        },

        isPhoneNumber () {
            return this.inputType === 'tel';
        },

        hasValidationMessages () {
            return !!this.translations.validationMessages;
        },

        hasInvalidErrorMessage () {
            return this.hasValidationMessages && !!this.translations.validationMessages.invalid;
        },

        isEmpty () {
            return this.validations.$dirty;
        },

        hasRequiredError () {
            return this.isEmpty && !this.validations.required;
        },

        hasInvalidError () {
            return this.hasInvalidErrorMessage && this.isEmpty && !this.validations.isValid;
        },

        hasError () {
            return this.hasValidationMessages && (this.hasRequiredError || this.hasInvalidError);
        },

        kebabCase () {
            return this.fieldName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z1-9])/g, '$1-$2').toLowerCase();
        },

        formattedMobileNumberForScreenReader () {
            return this.customer.mobileNumber ? [...this.customer.mobileNumber].join(' ') : '';
        },

        shouldShowEircodeHelper () {
            return this.tenant === 'ie' && this.fieldName === 'postcode';
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
            if (this.validations) {
                this.validations.$touch();
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-checkoutFormField-error--grouped {
    margin-bottom: spacing(d);
}

.c-checkoutFormField-assistiveText {
    @include font-size('body-s');
    font-weight: $font-weight-regular;
    color: $color-content-subdued;
    margin-top: 0;
}
</style>
