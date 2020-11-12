<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-addressGroup']">
            <form-field
                v-model="address.line1"
                :class="$style['c-addressGroup-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="$t('labels.line1')"
                label-style="inline">
                <template #error>
                    <error-message
                        v-if="isAddressLine1Empty"
                        data-test-id="error-address-line1-empty">
                        {{ $t('validationMessages.addressLine1.requiredError') }}
                    </error-message>
                </template>
            </form-field>

            <form-field
                v-model="address.line2"
                :class="$style['c-addressGroup-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="$t('labels.line2')"
                label-style="inline" />

            <form-field
                v-model="address.city"
                :class="$style['c-addressGroup-formField']"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="$t('labels.city')"
                label-style="inline">
                <template #error>
                    <error-message
                        v-if="isAddressCityEmpty"
                        data-test-id="error-address-city-empty">
                        {{ $t('validationMessages.city.requiredError') }}
                    </error-message>
                </template>
            </form-field>
        </fieldset>
        <form-field
            v-model="address.postcode"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="$t('labels.postcode')"
            label-style="inline">
            <template #error>
                <error-message
                    v-if="isAddressPostcodeEmpty"
                    data-test-id="error-address-postcode-empty">
                    {{ $t('validationMessages.postcode.requiredError') }}
                </error-message>
                <error-message
                    v-else-if="!isAddressPostcodeValid"
                    data-test-id="error-address-postcode-type-error">
                    {{ $t('validationMessages.postcode.invalidCharError') }}
                </error-message>
            </template>
        </form-field>
    </div>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: { FormField, ErrorMessage },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    props: {
        address: {
            type: Object,
            required: true
        }
    },

    computed: {
        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */

        isAddressLine1Empty () {
            return this.isFieldEmpty('line1');
        },

        isAddressCityEmpty () {
            return this.isFieldEmpty('city');
        },

        isAddressPostcodeEmpty () {
            return this.isFieldEmpty('postcode');
        },

        isAddressPostcodeValid () {
            return !this.$v.addressValidations.postcode.$dirty || this.$v.addressValidations.postcode.isValidPostcode;
        }
    },

    methods: {
        /*
        * Returns true if `field` has been touched and if it is empty
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFieldEmpty (field) {
            return this.$v.addressValidations[field].$dirty && !this.$v.addressValidations[field].required;
        }
    }
};
</script>

<style lang="scss" module>

.c-addressGroup {
    margin: spacing(x2) 0 spacing(x4) 0;
    padding: 0;
    border: none;
    @include font-size(body-s);

    .c-addressGroup-formField {
        margin-bottom: -17px;
    }
}
</style>
