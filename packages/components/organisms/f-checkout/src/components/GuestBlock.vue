<template>
    <div data-test-id='guest-component'>
        <form-field
            v-model="guest.firstName"
            name="guest-first-name"
            :label-text="$t('labels.firstName')">
            <template #error>
                <error-message
                    v-if="isFirstNameEmpty"
                    data-test-id="error-guest-first-name">
                    {{ $t('validationMessages.guestFirstName.requiredError') }}
                </error-message>
            </template>
        </form-field>
        <form-field
            v-model="guest.lastName"
            name="guest-last-name"
            :label-text="$t('labels.lastName')">
            <template #error>
                <error-message
                    v-if="isLastNameEmpty"
                    data-test-id="error-guest-last-name">
                    {{ $t('validationMessages.guestLastName.requiredError') }}
                </error-message>
            </template>
        </form-field>
        <form-field
            v-model="guest.email"
            name="guest-email"
            :label-text="$t('labels.email')">
            <template #error>
                <error-message
                    v-if="!isEmailValid"
                    data-test-id="error-guest-email-invalid">
                    {{ $t('validationMessages.guestEmail.invalidError') }}
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
// import { mapState } from 'vuex';

export default {
    components: { FormField, ErrorMessage },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    data () {
        return {
            guest: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    },

    computed: {
        // ...mapState('checkout', [
        //     'fulfilment'
        // ]),
        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */

        isFirstNameEmpty () {
            // return this.isFieldEmpty('line1');
        },

        isLastNameEmpty () {
            // return this.isFieldEmpty('city');
        },

        isEmailEmpty () {
            // return this.isFieldEmpty('postcode');
        },

        /*
        * Checks that postcode is a valid postcode and that the field is not empty.
        */
        isEmailValid () {
            // return (!this.$v.addressValidations.postcode.$dirty || this.$v.addressValidations.postcode.isValidPostcode) && !this.isAddressPostcodeEmpty;
        }
    },

    methods: {
        /*
        * Returns true if `field` has been touched and if it is still empty
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFieldEmpty (field) {
            // return this.$v.addressValidations[field].$dirty && !this.$v.addressValidations[field].required;
        }
    }
};
</script>

<style lang="scss" module>
// $address-colour          : $color-text;
// $address-fontSize        : 'body-s';
// $address-weight-bold     : $font-weight-bold;

// .c-address-label {
//     color: $address-colour;
//     @include font-size($address-fontSize);
//     font-weight: $address-weight-bold;
//     margin: spacing(x2) 0 spacing();
// }

// .c-address-group {
//     margin: spacing(x2) 0;
//     padding: 0;
//     border: none;
//     @include font-size($address-fontSize);

//     .c-address-formField {
//         &:focus-within,
//         &:active {
//             z-index: zIndex(high);
//             position: relative;
//         }
//     }
// }

// .c-address-error {
//     margin-bottom: spacing(x2);
// }
</style>
