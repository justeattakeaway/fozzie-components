<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-address-group']">
            <legend
                :class="$style['c-address-label']">
                {{ $t('labels.addressGroup') }}
            </legend>
            <form-field
                :value="address.line1"
                :class="$style['c-address-formField']"
                name="address-line-1"
                maxlength="100"
                :label-text="$t('formFields.address.line1.label')"
                :placeholder="$t('formFields.address.line1.label')"
                is-grouped
                :should-show-label-text="false"
                :has-error="isAddressLine1Empty"
                aria-describedby="line1-error"
                :aria-invalid="isAddressLine1Empty"
                @input="updateAddressDetails({ ['line1']: $event })">
                <template #error>
                    <error-message
                        v-if="isAddressLine1Empty"
                        id="line1-error"
                        data-js-error-message
                        :class="$style['c-address-error']"
                        data-test-id="error-address-line1-empty">
                        {{ $t('formFields.address.line1.validationMessages.required') }}
                    </error-message>
                </template>
            </form-field>

            <form-field
                :value="address.line2"
                :class="$style['c-address-formField']"
                name="address-line-2"
                :should-show-label-text="false"
                maxlength="100"
                :label-text="$t('formFields.address.line2.label')"
                :placeholder="$t('formFields.address.line2.label')"
                is-grouped
                @input="updateAddressDetails({ ['line2']: $event })" />
        </fieldset>

        <form-field
            :value="address.locality"
            name="address-locality"
            maxlength="50"
            :label-text="$t('formFields.address.locality.label')"
            :has-error="isAddressLocalityEmpty"
            aria-describedby="locality-error"
            :aria-invalid="isAddressLocalityEmpty"
            @input="updateAddressDetails({ ['locality']: $event })">
            <template #error>
                <error-message
                    v-if="isAddressLocalityEmpty"
                    id="locality-error"
                    data-js-error-message
                    data-test-id="error-address-locality-empty">
                    {{ $t('formFields.address.locality.validationMessages.required') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            v-if="shouldShowAdministrativeArea"
            :value="address.administrativeArea"
            name="address-administrative-area"
            maxlength="50"
            :label-text="$t('formFields.address.administrativeArea.label')"
            :has-error="isAddressAdministrativeAreaEmpty"
            aria-describedby="administrative-area-error"
            :aria-invalid="isAddressAdministrativeAreaEmpty"
            @input="updateAddressDetails({ ['administrativeArea']: $event })">
            <template #error>
                <error-message
                    v-if="isAddressAdministrativeAreaEmpty"
                    id="administrative-area-error"
                    data-js-error-message
                    data-test-id="error-address-administrative-area-empty">
                    {{ $t('formFields.address.administrativeArea.validationMessages.required') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            :value="address.postcode"
            name="address-postcode"
            maxlength="50"
            :label-text="$t('formFields.address.postcode.label')"
            :has-error="!isAddressPostcodeValid"
            aria-describedby="postcode-error"
            :aria-invalid="!isAddressPostcodeValid"
            @blur="formFieldBlur('postcode')"
            @input="updateAddressDetails({ ['postcode']: $event })">
            <template #error>
                <error-message
                    v-if="isAddressPostcodeEmpty"
                    id="postcode-error"
                    data-js-error-message
                    data-test-id="error-address-postcode-empty">
                    {{ $t('formFields.address.postcode.validationMessages.required') }}
                </error-message>
                <error-message
                    v-else-if="!isAddressPostcodeValid"
                    id="postcode-error"
                    data-js-error-message
                    data-test-id="error-address-postcode-type-error">
                    {{ $t('formFields.address.postcode.validationMessages.invalid') }}
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
import { mapState, mapActions } from 'vuex';
import checkoutValidationsMixin from '../mixins/validations.mixin';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },

    mixins: [checkoutValidationsMixin],

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    props: {
        shouldShowAdministrativeArea: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'address'
        ]),

        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isAddressLine1Empty () {
            return this.isFieldEmpty(VALIDATIONS.address, 'line1');
        },

        isAddressLocalityEmpty () {
            return this.isFieldEmpty(VALIDATIONS.address, 'locality');
        },

        isAddressPostcodeEmpty () {
            return this.isFieldEmpty(VALIDATIONS.address, 'postcode');
        },

        isAddressAdministrativeAreaEmpty () {
            return this.isFieldEmpty(VALIDATIONS.address, 'administrativeArea');
        },

        /*
        * Checks that postcode is a valid postcode and that the field is not empty.
        */
        isAddressPostcodeValid () {
            return (!this.$v[VALIDATIONS.address].postcode.$dirty || this.$v[VALIDATIONS.address].postcode.isValidPostcode) && !this.isAddressPostcodeEmpty;
        }

    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateAddressDetails'
        ]),

        formFieldBlur (field) {
            const fieldValidation = this.$v[VALIDATIONS.address][field];
            if (fieldValidation) {
                fieldValidation.$touch();
            }
        }
    }
};
</script>

<style lang="scss" module>
$address-colour          : $color-content-default;
$address-fontSize        : 'body-s';
$address-weight-bold     : $font-weight-bold;

.c-address-label {
    color: $address-colour;
    @include font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: spacing(x2) 0 spacing();
}

.c-address-group {
    margin: spacing(x2) 0;
    padding: 0;
    border: none;
    @include font-size($address-fontSize);

    .c-address-formField {
        &:focus-within,
        &:active {
            z-index: zIndex(high);
            position: relative;
        }
    }
}

.c-address-error {
    margin-bottom: spacing(x2);
}
</style>
