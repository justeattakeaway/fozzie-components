<template>
    <div
        data-test-id="guest-component"
        :class="$style['c-guest']">
        <form-field
            v-model="customer.firstName"
            name="guest-first-name"
            :label-text="$t('guest.firstName')"
            @input="updateFulfilmentDetails('Customer', 'firstName', $event)">
            <template #error>
                <error-message
                    v-if="isFirstNameEmpty"
                    data-test-id="error-first-name-empty">
                    {{ $t('validationMessages.firstName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            v-model="customer.lastName"
            name="guest-last-name"
            :label-text="$t('guest.lastName')"
            @input="updateFulfilmentDetails('Customer', 'lastName', $event)">
            <template #error>
                <error-message
                    v-if="isLastNameEmpty"
                    data-test-id="error-last-name-empty">
                    {{ $t('validationMessages.lastName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            v-model="customer.email"
            name="guest-email"
            :label-text="$t('guest.email')"
            @input="updateFulfilmentDetails('Customer', 'email', $event)">
            <template #error>
                <error-message
                    v-if="!isEmailValid"
                    data-test-id="error-email-invalid">
                    {{ $t('validationMessages.email.requiredError') }}
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
import checkoutValidationsMixin from '../mixins/validations.mixin';

export default {
    components: { FormField, ErrorMessage },

    mixins: [checkoutValidationsMixin],

    /*
    * Provide/Inject allows nested `Guest` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState('checkout', [
            'customer'
        ]),

        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFirstNameEmpty () {
            return this.isFieldEmpty('guest', 'firstName');
        },

        isLastNameEmpty () {
            return this.isFieldEmpty('guest', 'lastName');
        },

        /*
        * Checks that email field is not empty and is a valid email address.
        */
        isEmailValid () {
            return !this.isFieldEmpty('guest', 'email') && this.$v.guestValidations.email.email;
        }
    }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(x2);
}
</style>
