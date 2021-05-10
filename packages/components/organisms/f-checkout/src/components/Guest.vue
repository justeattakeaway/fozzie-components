<template>
    <div
        data-test-id="guest-component"
        :class="$style['c-guest']">
        <form-field
            :value="customer.firstName"
            aria-required="true"
            aria-describedby="js-error"
            name="guest-first-name"
            :label-text="$t('guest.firstName')"
            :has-error="isFirstNameEmpty"
            input-type="text"
            @blur="blurField('firstName')"
            @input="updateCustomerDetails({ 'firstName': $event })"
        >
            <template
                v-if="isFirstNameEmpty"
                #error>
                <error-message
                    id="js-error"
                    data-js-error-message
                    data-test-id="error-first-name-empty">
                    {{ $t('validationMessages.firstName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            :value="customer.lastName"
            name="guest-last-name"
            :label-text="$t('guest.lastName')"
            aria-required="true"
            aria-describedby="last-name-error"
            :has-error="isLastNameEmpty"
            @blur="blurField('lastName')"
            @input="updateCustomerDetails({ 'lastName': $event })">
            <template
                v-if="isLastNameEmpty"
                #error>
                <error-message
                    id="last-name-error"
                    aria-live="assertive"
                    data-js-error-message
                    data-test-id="error-last-name-empty">
                    {{ $t('validationMessages.lastName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            :value="customer.email"
            name="guest-email"
            :label-text="$t('guest.email')"
            :has-error="!isEmailValid"
            aria-required="true"
            aria-describedby="email-error"
            @blur="blurField('email')"
            @input="updateCustomerDetails({ 'email': $event })">
            <template
                v-if="!isEmailValid"
                #error>
                <error-message
                    id="email-error"
                    data-js-error-message
                    aria-required="true"
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
import { mapState, mapActions } from 'vuex';
import checkoutValidationsMixin from '../mixins/validations.mixin';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },

    mixins: [checkoutValidationsMixin],

    data () {
        return {
            firstName: null
        };
    },

    /*
    * Provide/Inject allows nested `Guest` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer'
        ]),

        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFirstNameEmpty () {
            return this.isFieldEmpty(VALIDATIONS.guest, 'firstName');
        },

        isLastNameEmpty () {
            return this.isFieldEmpty(VALIDATIONS.guest, 'lastName');
        },

        /*
        * Checks that email field is not empty and is a valid email address.
        */
        isEmailValid () {
            return !this.isFieldEmpty(VALIDATIONS.guest, 'email') && this.$v[VALIDATIONS.guest].email.email;
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCustomerDetails'
        ]),

        blurField (field) {
            this.$emit('blurField', field);
        }
    }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(x2);
}
</style>
