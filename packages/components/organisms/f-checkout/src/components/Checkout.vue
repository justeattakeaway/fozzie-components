<template>
    <div>
        <div
            v-if="hasCheckoutLoadedSuccessfully"
            data-theme="jet"
            data-test-id="checkout-component">
            <alert
                v-if="genericErrorMessage"
                type="danger"
                :class="$style['c-checkout-alert']"
                :heading="$t('errorMessages.errorHeading')">
                {{ genericErrorMessage }}
            </alert>

            <card
                is-rounded
                has-outline
                is-page-content-wrapper
                card-heading-position="center"
                data-test-id="checkout-card-component"
                :class="$style['c-checkout']">
                <checkout-header
                    :login-url="loginUrl" />

                <form
                    method="post"
                    :class="$style['c-checkout-form']"
                    @submit.prevent="onFormSubmit">
                    <guest-block v-if="!isLoggedIn" />

                    <form-field
                        :value="customer.mobileNumber"
                        name="mobile-number"
                        :label-text="$t('labels.mobileNumber')"
                        :has-error="!isMobileNumberValid"
                        @input="updateCustomerDetails({ mobileNumber: $event })">
                        <template #error>
                            <error-message
                                v-if="!isMobileNumberValid"
                                data-test-id="error-mobile-number">
                                {{ $t('validationMessages.mobileNumber.requiredError') }}
                            </error-message>
                        </template>
                    </form-field>

                    <address-block
                        v-if="isCheckoutMethodDelivery"
                        data-test-id="address-block" />

                    <form-selector />

                    <user-note
                        data-test-id="user-note"
                        @input="updateUserNote($event.target.value)" />

                    <f-button
                        :class="$style['c-checkout-submitButton']"
                        button-type="primary"
                        button-size="large"
                        is-full-width
                        action-type="submit"
                        data-test-id="confirm-payment-submit-button">
                        {{ $t('buttonText') }}
                    </f-button>
                </form>

                <checkout-terms-and-conditions
                    v-if="!isLoggedIn" />
            </card>
        </div>

        <error-page v-else />
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import { validations } from '@justeat/f-services';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import AddressBlock from './Address.vue';
import CheckoutHeader from './Header.vue';
import CheckoutTermsAndConditions from './TermsAndConditions.vue';
import FormSelector from './Selector.vue';
import GuestBlock from './Guest.vue';
import UserNote from './UserNote.vue';
import ErrorPage from './Error.vue';

import { CHECKOUT_METHOD_DELIVERY, TENANT_MAP, VALIDATIONS } from '../constants';
import checkoutValidationsMixin from '../mixins/validations.mixin';
import EventNames from '../event-names';
import tenantConfigs from '../tenants';
import mapUpdateCheckoutRequest from '../services/mapper';

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
        FButton,
        Card,
        CheckoutHeader,
        CheckoutTermsAndConditions,
        ErrorPage,
        ErrorMessage,
        FormField,
        FormSelector,
        GuestBlock,
        UserNote
    },

    mixins: [validationMixin, VueGlobalisationMixin, checkoutValidationsMixin],

    props: {
        getCheckoutUrl: {
            type: String,
            required: true
        },

        checkoutAvailableFulfilmentUrl: {
            type: String,
            required: true
        },

        createGuestUrl: {
            type: String,
            required: true
        },

        getBasketUrl: {
            type: String,
            required: true
        },

        updateCheckoutUrl: {
            type: String,
            required: true
        },

        checkoutTimeout: {
            type: Number,
            required: false,
            default: 1000
        },

        getCheckoutTimeout: {
            type: Number,
            required: false,
            default: 1000
        },

        createGuestTimeout: {
            type: Number,
            default: 1000
        },

        getBasketTimeout: {
            type: Number,
            default: 1000
        },

        updateCheckoutTimeout: {
            type: Number,
            default: 1000
        },

        authToken: {
            type: String,
            default: ''
        },

        loginUrl: {
            type: String,
            required: true
        },

        getAddressUrl: {
            type: String,
            required: true
        },

        getAddressTimeout: {
            type: Number,
            default: 1000
        }
    },

    data () {
        return {
            tenantConfigs,
            genericErrorMessage: null,
            shouldDisableCheckoutButton: false,
            hasCheckoutLoadedSuccessfully: true
        };
    },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    provide () {
        const $v = {};

        Object.defineProperty($v, VALIDATIONS.address, {
            enumerable: true,
            get: () => this.$v.address
        });

        Object.defineProperty($v, VALIDATIONS.guest, {
            enumerable: true,
            get: () => this.$v.customer
        });

        return { $v };
    },

    computed: {
        ...mapState('checkout', [
            'address',
            'customer',
            'id',
            'isFulfillable',
            'isLoggedIn',
            'messages',
            'notices',
            'serviceType',
            'time',
            'userNote'
        ]),

        isMobileNumberValid () {
            /*
            * Validation methods return true if the validation conditions
            * have not been met and the field has been `touched` by a user.
            * The $dirty boolean changes to true when the user has focused/lost
            * focus on the input field.
            */
            return !this.$v.customer.mobileNumber.$dirty || this.$v.customer.mobileNumber.isValidPhoneNumber;
        },

        isCheckoutMethodDelivery () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY;
        },

        tenant () {
            return TENANT_MAP[this.$i18n.locale];
        },

        shouldLoadAddress () {
            return this.isLoggedIn &&
            this.isCheckoutMethodDelivery &&
            (!this.address || !this.address.line1);
        }
    },

    watch: {
        async authToken () {
            await this.initialise();
        }
    },

    async mounted () {
        await this.initialise();
    },

    methods: {
        ...mapActions('checkout', [
            'createGuestUser',
            'getAvailableFulfilment',
            'getAddress',
            'getBasket',
            'getCheckout',
            'updateCheckout',
            'setAuthToken',
            'updateCustomerDetails',
            'updateUserNote'
        ]),

        /**
         * Loads the necessary data to render a meaningful checkout component.
         *
         */
        async initialise () {
            this.setAuthToken(this.authToken);

            const promises = this.isLoggedIn
                ? [this.loadBasket(), this.loadCheckout(), this.loadAvailableFulfilment()]
                : [this.loadBasket(), this.loadAvailableFulfilment()];

            await Promise.all(promises);

            if (this.shouldLoadAddress) {
                await this.loadAddress();
            }
        },

        /**
         * Submit the checkout details while emitting events to communicate its success or failure.
         *
         */
        async submitCheckout () {
            try {
                if (!this.isLoggedIn) {
                    await this.setupGuestUser();
                }

                const data = mapUpdateCheckoutRequest({
                    address: this.address,
                    customer: this.customer,
                    isCheckoutMethodDelivery: this.isCheckoutMethodDelivery,
                    time: this.time,
                    userNote: this.userNote
                });

                await this.updateCheckout({
                    url: this.updateCheckoutUrl,
                    data,
                    timeout: this.updateCheckoutTimeout
                });

                this.$emit(EventNames.CheckoutSuccess, {
                    isLoggedIn: this.isLoggedIn,
                    serviceType: this.serviceType
                });
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutFailure, {
                    errors: thrownErrors,
                    isLoggedIn: this.isLoggedIn,
                    serviceType: this.serviceType
                });
            }
        },

        /**
         * Setup a new guest user account. This method will be called when isLoggedIn is false.
         * Events emitted to communicate success or failure.
         */
        async setupGuestUser () {
            const createGuestData = {
                emailAddress: this.customer.email,
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                registrationSource: 'Guest'
            };

            try {
                await this.createGuestUser({
                    url: this.createGuestUrl,
                    tenant: this.tenant,
                    data: createGuestData,
                    timeout: this.createGuestTimeout
                });

                this.$emit(EventNames.CheckoutSetupGuestSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutSetupGuestFailure, thrownErrors);
            }
        },

        /**
         * Load the checkout details while emitting events to communicate its success or failure.
         *
         */
        async loadCheckout () {
            try {
                await this.getCheckout({
                    url: this.getCheckoutUrl,
                    timeout: this.getCheckoutTimeout
                });

                this.$emit(EventNames.CheckoutGetSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutGetFailure, thrownErrors);
                this.hasCheckoutLoadedSuccessfully = false;
            }
        },

        /**
         * Load the basket details while emitting events to communicate its success or failure.
         *
         */
        async loadBasket () {
            try {
                await this.getBasket({
                    url: this.getBasketUrl,
                    tenant: this.tenant,
                    language: this.$i18n.locale,
                    timeout: this.getBasketTimeout
                });

                this.$emit(EventNames.CheckoutBasketGetSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutBasketGetFailure, thrownErrors);
                this.hasCheckoutLoadedSuccessfully = false;
            }
        },

        /**
         * Load the available fulfilment details while emitting events to communicate its success or failure.
         *
         */
        async loadAvailableFulfilment () {
            try {
                await this.getAvailableFulfilment({
                    url: this.checkoutAvailableFulfilmentUrl,
                    timeout: this.getCheckoutTimeout
                });

                this.$emit(EventNames.CheckoutAvailableFulfilmentGetSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutAvailableFulfilmentGetFailure, thrownErrors);
                this.hasCheckoutLoadedSuccessfully = false;
            }
        },

        /**
         * Load the customer address while emitting events to communicate its success or failure.
         *
         */
        async loadAddress () {
            try {
                await this.getAddress({
                    url: this.getAddressUrl,
                    language: this.$i18n.locale,
                    timeout: this.getAddressTimeout
                });

                this.$emit(EventNames.CheckoutAddressGetSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutAddressGetFailure, thrownErrors);
                this.hasCheckoutLoadedSuccessfully = false;
            }
        },

        handleErrorState (error) {
            /*
            * Emit `CheckoutFailure` event with error data
            * Update `genericErrorMessage` to display correct errorMessage for passed error
            */
            let thrownErrors = error;

            // Ideally we would use optional chaining but it doesn't currently work with Storybook
            if (error && error.response && error.response.data && error.response.data.errors) {
                thrownErrors = error.response.data.errors;
            }

            // TODO: Review this later - even though f-registration does something similar
            if (Array.isArray(thrownErrors)) {
                this.genericErrorMessage = thrownErrors[0].description || this.$t('errorMessages.genericServerError');

                this.$emit(EventNames.CheckoutFailure, {
                    errors: thrownErrors,
                    isLoggedIn: this.isLoggedIn,
                    serviceType: this.serviceType
                });
            } else {
                this.genericErrorMessage = error;

                this.$emit(EventNames.CheckoutFailure, {
                    errors: error,
                    isLoggedIn: this.isLoggedIn,
                    serviceType: this.serviceType
                });
            }
        },

        async onFormSubmit () {
            /*
            * Check for is valid - no inline messages
            * If form is valid try to call `submitCheckout`
            * Catch and handle any errors
            */
            if (!this.isFormValid()) {
                const validationState = validations.getFormValidationState(this.$v);
                this.$emit(EventNames.CheckoutValidationError, validationState);
                return;
            }

            this.shouldDisableCheckoutButton = true;

            try {
                await this.submitCheckout();
            } catch (error) {
                this.handleErrorState(error);
            } finally {
                this.shouldDisableCheckoutButton = false;
            }
        },

        isFormValid () {
            /*
            * Check to see if any `Vuelidate` validation errors
            */
            this.$v.$touch();
            return !this.$v.$invalid;
        },

        /*
        * Use phone validation in `f-services` to check if customer number is
        * valid in current locale
        */
        isValidPhoneNumber () {
            return validations.isValidPhoneNumber(this.customer.mobileNumber, this.$i18n.locale);
        },

        /*
        * Use postcode validation in `f-services` to check if customer postcode is
        * valid in current locale
        */
        isValidPostcode () {
            return validations.isValidPostcode(this.address.postcode, this.$i18n.locale);
        }
    },

    validations () {
        const deliveryDetails = {
            customer: {
                mobileNumber: {
                    isValidPhoneNumber: this.isValidPhoneNumber
                }
            }
        };

        if (!this.isLoggedIn) {
            deliveryDetails.customer = {
                ...deliveryDetails.customer,
                firstName: {
                    required
                },
                lastName: {
                    required
                },
                email: {
                    required,
                    email
                }
            };
        }

        if (this.isCheckoutMethodDelivery) {
            deliveryDetails.address = {
                line1: {
                    required
                },
                city: {
                    required
                },
                postcode: {
                    required,
                    isValidPostcode: this.isValidPostcode
                }
            };
        }

        return deliveryDetails;
    }
};
</script>

<style lang="scss" module>
.c-checkout {
    padding-top: spacing(x6);
    padding-bottom: spacing(x6);

    @include media('<=narrow') {
        border: none;
        padding-top: spacing(x2);
        padding-bottom: spacing(x2);
    }
}

.c-checkout-form {
    margin-top: spacing(x2);
}

.c-checkout-alert {
    width: $checkout-width;
    margin: 0 auto;
}

.c-checkout-submitButton {
    margin: spacing(x4) 0 spacing(x0.5);
}
</style>
