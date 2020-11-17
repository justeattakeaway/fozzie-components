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
                @submit.prevent="onFormSubmit">
                <form-field
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    :label-text="$t('labels.mobileNumber')"
                    label-style="inline">
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
                    v-model="address"
                    :address="address"
                    data-test-id="address-block" />

                <form-selector
                    :order-method="serviceType"
                    :times="times"
                    data-test-id="selector" />

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
                    data-test-id="confirm-payment-submit-button">
                    {{ $t('buttonText') }}
                </button-component>
            </form>
        </card>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
    required,
    numeric,
    minLength
} from 'vuelidate/lib/validators';

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

import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';

import { CHECKOUT_METHOD_DELIVERY, TENANT_MAP } from '../constants';
import tenantConfigs from '../tenants';
import CheckoutServiceApi from '../services/CheckoutServiceApi';
import EventNames from '../event-names';

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
            firstName: '',
            mobileNumber: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                postcode: null
            },
            genericErrorMessage: null,
            shouldDisableCheckoutButton: false,
            checkoutId: '',
            isFulfillable: true,
            times: [],
            messages: [],
            notes: [],
            notices: [],
            serviceType: this.checkoutMethod
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
            get: () => this.$v.address
        });

        return { $v };
    },

    computed: {
        name () {
            return (this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1));
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
            const isMobileNumberValid = this.$v.mobileNumber.required && this.$v.mobileNumber.numeric && this.$v.mobileNumber.minLength;
            return !this.$v.mobileNumber.$dirty || isMobileNumberValid;
        },

        isCheckoutMethodDelivery () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY;
        },

        tenant () {
            return TENANT_MAP[this.locale];
        }
    },

    watch: {
        async checkoutUrl () {
            await this.getCheckout();
        }
    },

    async mounted () {
        await this.getCheckout();
    },

    methods: {
        async callCheckoutServiceApi () {
            /*
            * Add user data to `checkoutData` and submit to Checkout endpoint
            * If this is successful emit `CheckoutSuccess` event
            */
            const checkoutData = {
                mobileNumber: this.mobileNumber
            };

            if (this.isCheckoutMethodDelivery) {
                checkoutData.address = this.address;
            }

            await CheckoutServiceApi.submitCheckout(this.checkoutUrl, this.tenant, checkoutData, this.checkoutTimeout);

            this.$emit(EventNames.CheckoutSuccess);
        },

        async getCheckout () {
            try {
                const result = await CheckoutServiceApi.getCheckout(this.checkoutUrl, this.tenant, this.getCheckoutTimeout);
                this.$emit(EventNames.CheckoutGetSuccess);
                this.mapResponse(result.data);
            } catch (thrownErrors) {
                this.$emit(EventNames.CheckoutGetFailure, thrownErrors);
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
            * If form is valid try to call `CheckoutServiceApi`
            * Catch and handle any errors
            */
            if (!this.isFormValid()) {
                const validationState = validations.getFormValidationState(this.$v);
                this.$emit(EventNames.CheckoutFailure, validationState);
                return;
            }

            this.shouldDisableCheckoutButton = true;

            try {
                await this.callCheckoutServiceApi();
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

        mapResponse (data) {
            this.checkoutId = data.id;
            this.isFulfillable = data.isFulfillable;
            if (data.customer) {
                this.firstName = data.customer.firstName;
                this.mobileNumber = data.customer.phoneNumber;
            }

            this.times = data.fulfillment.times;
            if (data.fulfillment.address) {
                this.address.line1 = data.fulfillment.address.lines[0];
                this.address.line2 = data.fulfillment.address.lines[1];
                this.address.city = data.fulfillment.address.lines[3];
                this.address.postcode = data.fulfillment.address.postalCode;
            }

            this.messages = data.messages;
            this.notes = data.notes;
            this.notices = data.notices;
            this.serviceType = data.serviceType;
        }
    },

    validations () {
        const deliveryDetails = {
            mobileNumber: {
                required,
                numeric,
                minLength: minLength(10)
            }
        };

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
                    isValidPostcode: validations.isValidPostcode
                }
            };
        }

        return deliveryDetails;
    }
};
</script>

<style lang="scss" module>
$line-height                              : 16px;
$checkout-width                           : 460px;

.c-checkout {
    margin: auto;
    font-family: $font-family-base;
    color: $color-text;
    font-weight: $font-weight-base;

    .c-checkout-alert {
        width: $checkout-width;
        margin: 0 auto;
    }

    .c-card--dimensions {
        width: $checkout-width;
        padding: spacing(x5) spacing(x9) spacing(x4);

        @include media('<wide') {
            width: 60%;
            padding: spacing(x5) 10% spacing(x4);
        }

        @include media('<mid') {
            width: 100%;
            padding: spacing(x5) spacing(x2) spacing(x4);
            margin: 0;
        }
    }

    .c-checkout-allergyButton {
        padding: 0 spacing(x3);
    }

    .c-checkout-submitButton {
        display: flex;
        margin: spacing(x2) auto;

        @include media('<wide') {
            display: block;
            width: 70%;
            padding: spacing(x2);
        }

        @include media('<mid') {
            display: block;
            width: 100%;
        }
    }
}
</style>
