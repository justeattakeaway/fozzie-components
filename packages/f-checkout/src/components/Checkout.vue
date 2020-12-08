<template>
    <div
        data-theme="jet"
        :class="$style['c-checkout']"
        data-test-id="checkout-component">
        <alert
            v-if="genericErrorMessage"
            type="danger"
            :class="$style['c-checkout-alert']"
            :heading="$t('errorMessages.errorHeading')">
            {{ genericErrorMessage }}
        </alert>
        <card
            :card-heading="title"
            is-rounded
            has-outline
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="checkout-card-component"
            :class="$style['c-card--dimensions']">
            <form
                type="post"
                :class="$style['c-checkout-form']"
                @submit.prevent="onFormSubmit">
                <form-field
                    v-model="customer.mobileNumber"
                    name="mobile-number"
                    :label-text="$t('labels.mobileNumber')"
                    :has-error="!isMobileNumberValid">
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

                <form-selector/>

                <user-note data-test-id="user-note" />

                <button-component
                    :class="$style['c-checkout-allergyButton']"
                    button-type="link"
                    data-test-id="allergy-button">
                    {{ $t('allergyText') }}
                </button-component>

                <button-component
                    :class="$style['c-checkout-submitButton']"
                    button-type="primary"
                    button-size="large"
                    is-full-width
                    data-test-id="confirm-payment-submit-button">
                    {{ $t('buttonText') }}
                </button-component>
            </form>
        </card>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { validations } from '@justeat/f-services';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import { mapState, mapActions } from 'vuex';
import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';

import { CHECKOUT_METHOD_DELIVERY, TENANT_MAP } from '../constants';
import tenantConfigs from '../tenants';
import EventNames from '../event-names';

import checkoutModule from '../store/checkout.module';

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
        ButtonComponent,
        Card,
        ErrorMessage,
        FormField,
        FormSelector,
        UserNote
    },

    mixins: [validationMixin, VueGlobalisationMixin],

    props: {
        checkoutUrl: {
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
        }
    },

    data () {
        return {
            tenantConfigs,
            genericErrorMessage: null,
            shouldDisableCheckoutButton: false
        };
    },

    /*
    * Provide/Inject allows nested `Address` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    provide () {
        const $v = {};

        Object.defineProperty($v, 'addressValidations', {
            enumerable: true,
            get: () => this.$v.fulfillment.address
        });

        return { $v };
    },

    computed: {
        ...mapState('checkout', [
            'id',
            'serviceType',
            'customer',
            'fulfillment',
            'notes',
            'isFulfillable',
            'notices',
            'messages'
        ]),

        name () {
            return (this.customer.firstName.charAt(0).toUpperCase() + this.customer.firstName.slice(1));
        },

        title () {
            return `${this.name}, confirm your details`;
        },

        isMobileNumberValid () {
            /*
            * Validation methods return true if the validation conditions
            * have not been met and the field has been `touched` by a user.
            * The $dirty boolean changes to true when the user has focused/lost
            * focus on the input field.
            */
            const isMobileNumberValid = this.$v.customer.mobileNumber.required && this.$v.customer.mobileNumber.isValidPhoneNumber;
            return !this.$v.customer.mobileNumber.$dirty || isMobileNumberValid;
        },

        isCheckoutMethodDelivery () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY;
        },

        tenant () {
            return TENANT_MAP[this.$i18n.locale];
        }
    },

    watch: {
        async checkoutUrl () {
            await this.loadCheckout();
        }
    },

    async mounted () {
        await this.loadCheckout();
    },

    created () {
        if (!this.$store.hasModule('checkout')) {
            this.$store.registerModule('checkout', checkoutModule);
        }
    },

    /*
        TODO: in the future, we should actually try to deregister modules.
        However, right now, given we might have several instances of the same component, we don't want to remove the module for all of them.
        We tried generating a dynamic module name (so we could add and remove a module per component),
        but we couldn't get it to work. It needs more investigation when this is really needed, not now.
    */
    // beforeDestroy () {
    // this.$store.unregisterModule('checkout');
    // },

    methods: {
        ...mapActions('checkout', [
            'getCheckout',
            'postCheckout'
        ]),

        /**
         * Submit the checkout details while emitting events to communicate its success or failure.
         *
         */
        async submitCheckout () {
            try {
                const checkoutData = {
                    mobileNumber: this.customer.mobileNumber
                };

                if (this.isCheckoutMethodDelivery) {
                    checkoutData.address = this.fulfillment.address;
                }

                await this.postCheckout({
                    url: 'myPostUrl',
                    tenant: this.tenant,
                    data: checkoutData,
                    timeout: this.checkoutTimeout
                });

                this.$emit(EventNames.CheckoutSuccess);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutFailure, thrownErrors);
            }
        },

        /**
         * Load the checkout details while emitting events to communicate its success or failure.
         *
         */
        async loadCheckout () {
            try {
                await this.getCheckout({
                    url: this.checkoutUrl,
                    tenant: this.tenant,
                    timeout: this.getCheckoutTimeout
                });

                this.$emit(EventNames.CheckoutGetSuccess); // TODO: Check these emitted events.
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutGetFailure, thrownErrors); // TODO: Check these emitted events.
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

            this.$emit(EventNames.CheckoutFailure, thrownErrors);

            // TODO: Review this later - even though f-registration does something similar
            if (Array.isArray(thrownErrors)) {
                this.genericErrorMessage = thrownErrors[0].description || this.copy.errorMessages.genericServerError;
            } else {
                this.genericErrorMessage = error;
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
                this.$emit(EventNames.CheckoutFailure, validationState);
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
            return validations.isValidPostcode(this.fulfillment.address.postcode, this.$i18n.locale);
        }
    },

    validations () {
        const deliveryDetails = {
            customer: {
                mobileNumber: {
                    required,
                    isValidPhoneNumber: this.isValidPhoneNumber
                }
            }
        };

        if (this.isCheckoutMethodDelivery) {
            deliveryDetails.fulfillment = {
                address: {
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
                }
            };
        }

        return deliveryDetails;
    }
};
</script>

<style lang="scss" module>
$line-height                              : 16px;
$checkout-width                           : 596px;
$checkout-padding                         : spacing(x5) 100px;

.c-checkout {
    margin: auto;
    font-family: $font-family-base;
    color: $color-text;
    font-weight: $font-weight-base;

    .c-card--dimensions {
        width: $checkout-width;
        padding: $checkout-padding;
    }

    .c-checkout-form {
        margin-top: spacing(x3);
    }

    .c-checkout-alert {
        width: $checkout-width;
        margin: 0 auto;
    }

    .c-checkout-allergyButton {
        margin-top: spacing(x1.5);
    }

    .c-checkout-submitButton {
        margin: spacing(x4) 0 spacing(x0.5);
    }
}
</style>
