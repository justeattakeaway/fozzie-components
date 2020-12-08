<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-address-group']">
            <legend
                :class="$style['c-address-label']">
                {{ $t('labels.addressGroup') }}
            </legend>
            <form-field
                v-model="fulfillment.address.line1"
                :class="$style['c-address-formField']"
                name="address-line-1"
                :label-text="$t('labels.line1')"
                label-style="inline"
                :has-error="isAddressLine1Empty">
                <template #error>
                    <error-message
                        v-if="isAddressLine1Empty"
                        :class="$style['c-address-error']"
                        data-test-id="error-address-line1-empty">
                        {{ $t('validationMessages.addressLine1.requiredError') }}
                    </error-message>
                </template>
            </form-field>

            <form-field
                v-model="fulfillment.address.line2"
                :class="$style['c-address-formField']"
                name="address-line-2"
                :label-text="$t('labels.line2')"
                label-style="inline" />
        </fieldset>

        <form-field
            v-model="fulfillment.address.city"
            name="address-city"
            :label-text="$t('labels.city')"
            :has-error="isAddressCityEmpty">
            <template #error>
                <error-message
                    v-if="isAddressCityEmpty"
                    data-test-id="error-address-city-empty">
                    {{ $t('validationMessages.city.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            v-model="fulfillment.address.postcode"
            name="address-postcode"
            :label-text="$t('labels.postcode')"
            :has-error="!isAddressPostcodeValid">
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
import { mapState } from 'vuex';

export default {
    components: { FormField, ErrorMessage },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState('checkout', [
            'fulfillment'
        ]),
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

        /*
        * Checks that postcode is a valid postcode and that the field is not empty.
        */
        isAddressPostcodeValid () {
            return (!this.$v.addressValidations.postcode.$dirty || this.$v.addressValidations.postcode.isValidPostcode) && !this.isAddressPostcodeEmpty;
        }
    },

    methods: {
        /*
        * Returns true if `field` has been touched and if it is still empty
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
$address-colour          : $color-text;
$address-fontSize        : 'body-s';
$address-weight-bold     : $font-weight-bold;

.c-address-label {
    color: $address-colour;
    @include font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: spacing(x2) 0 spacing();
}

.c-address-group {
    margin: spacing(x2) 0 spacing(x4);
    padding: 0;
    border: none;
    @include font-size($address-fontSize);

    .c-address-formField {
        margin-bottom: -17px;

        &:focus-within,
        &:active {
            z-index: zIndex(high);
            position: relative;
        }
    }
}

.c-address-error {
    margin-bottom: spacing(x5);
}
</style>
