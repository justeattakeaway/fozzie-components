<template>
    <div data-test-id='address-component'>
        <label
            :class="$style['c-address-label']">
            {{ $t('labels.addressGroup') }}
        </label>
        <fieldset :class="$style['c-address-group']">
            <form-field
                v-model="address.line1"
                :class="$style['c-address-group-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="$t('labels.line1')"
                label-style="inline"
                :has-error="!isAddressLine1Complete">
                <template #error>
                    <error-message
                        v-if="!isAddressLine1Complete"
                        :class="$style['c-address-error']"
                        data-test-id="error-address-line1-incomplete">
                        {{ $t('validationMessages.addressLine1.requiredError') }}
                    </error-message>
                </template>
            </form-field>

            <form-field
                v-model="address.line2"
                :class="$style['c-address-group-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="$t('labels.line2')"
                label-style="inline" />
        </fieldset>

        <form-field
            v-model="address.city"
            name="address-city"
            data-test-id="input-address-city"
            :label-text="$t('labels.city')"
            :has-error="!isAddressCityComplete">
            <template #error>
                <error-message
                    v-if="!isAddressCityComplete"
                    data-test-id="error-address-city-incomplete">
                    {{ $t('validationMessages.city.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            v-model="address.postcode"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="$t('labels.postcode')"
            :has-error="!isAddressPostcodeValid">
            <template #error>
                <error-message
                    v-if="!isAddressPostcodeComplete"
                    data-test-id="error-address-postcode-incomplete">
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

        isAddressLine1Complete () {
            return this.isFieldComplete('line1');
        },

        isAddressCityComplete () {
            return this.isFieldComplete('city');
        },

        isAddressPostcodeComplete () {
            return this.isFieldComplete('postcode');
        },

        /*
        * Checks that postcode is a valid postcode and that the field is not complete.
        */
        isAddressPostcodeValid () {
            return (!this.$v.addressValidations.postcode.$dirty || this.$v.addressValidations.postcode.isValidPostcode) && this.isAddressPostcodeComplete;
        }
    },

    methods: {
        /*
        * Returns true if `field` has been touched and if it is still empty
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFieldComplete (field) {
            return !(this.$v.addressValidations[field].$dirty && !this.$v.addressValidations[field].required);
        }
    }
};
</script>

<style lang="scss" module>
$address-colour          : $color-text;
$address-fontSize        : 'body-s';
$address-weight-bold     : $font-weight-bold;

.c-address-label {
    display: block;
    color: $address-colour;
    @include font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: spacing(x2) 0 spacing();
}

.c-address-group {
    margin-bottom: spacing(x4);
    padding: 0;
    border: none;
    @include font-size($address-fontSize);

    .c-address-group-formField {
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
