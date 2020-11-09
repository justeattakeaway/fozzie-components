<template>
    <div
        :data-theme="theme"
        :class="$style['c-checkout']"
        data-test-id="checkout-component">
        <alert
            v-if="genericErrorMessage"
            :locale="locale"
            type="danger"
            :class="$style['c-checkout-alert']"
            :heading="copy.errorMessages.errorHeading">
            <p>{{ genericErrorMessage }}</p>
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
                    :label-text="copy.labels.mobileNumber"
                    label-style="inline">
                    <template #error>
                        <error-message
                            v-if="!isMobileNumberValid"
                            data-test-id="error-mobile-number">
                            {{ copy.validationMessages.mobileNumber.requiredError }}
                        </error-message>
                    </template>
                </form-field>

                <address-block
                    v-if="isDeliveryMethod"
                    v-model="address"
                    :address="address"
                    data-test-id="address-block" />

                <form-selector
                    :order-method="checkoutMethod"
                    data-test-id="selector" />

                <user-note data-test-id="user-note" />
                <button
                    :class="[
                        $style['o-btn--allergy'],
                        'o-btnLink'
                    ]"
                    data-test-id="allergy-button">
                    {{ copy.allergyText }}
                </button>

                <button
                    :class="[
                        $style['o-btn--payment'],
                        'o-btn', 'o-btn--primary', 'o-btn--wide'
                    ]"
                    data-test-id="confirm-payment-submit-button">
                    {{ buttonText }}
                </button>
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

import { globalisationServices, validations } from '@justeat/f-services';
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';

import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY } from '../constants';
import tenantConfigs from '../tenants';
import CheckoutServiceApi from '../services/CheckoutServiceApi';
import EventNames from '../event-names';

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
        Card,
        ErrorMessage,
        FormField,
        FormSelector,
        UserNote
    },

    mixins: [validationMixin],

    props: {
        locale: {
            type: String,
            default: ''
        },

        checkoutMethod: {
            type: String,
            default: 'Collection',
            validator: value => (VALID_CHECKOUT_METHOD.indexOf(value) !== -1)
        },

        checkoutUrl: {
            type: String,
            required: true
        },

        checkoutTimeout: {
            type: Number,
            required: false,
            default: 1000
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme,
            firstName: 'firstName',
            mobileNumber: null,
            address: {
                line1: null,
                line2: null,
                city: null,
                postcode: null
            },
            buttonText: 'Go to payment',
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
        const copy = {};

        Object.defineProperty($v, 'addressErrors', {
            enumerable: true,
            get: () => this.$v.address
        });

        Object.defineProperties(copy, {
            labels: {
                enumerable: true,
                get: () => this.copy.labels
            },

            validationMessages: {
                enumerable: true,
                get: () => this.copy.validationMessages
            }
        });

        return { $v, copy };
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
            const isMobileNumberValid = !(!this.$v.mobileNumber.required || !this.$v.mobileNumber.numeric || !this.$v.mobileNumber.minLength);
            return !(this.$v.mobileNumber.$dirty && !isMobileNumberValid);
        },

        isDeliveryMethod () {
            return this.checkoutMethod === CHECKOUT_METHOD_DELIVERY;
        }
    },

    methods: {
        async onFormSubmit () {
            if (!this.isFormValid()) {
                const validationState = validations.getFormValidationState(this.$v);

                this.$emit(EventNames.CheckoutFailure, validationState);

                return;
            }

            this.shouldDisableCheckoutButton = true;

            try {
                const checkoutData = {
                    mobileNumber: this.mobileNumber
                };

                if (this.isDeliveryMethod) {
                    checkoutData.address = this.address;
                }

                await CheckoutServiceApi.submitCheckout(this.checkoutUrl, this.tenant, checkoutData, this.checkoutTimeout);

                this.$emit(EventNames.CheckoutSuccess);
            } catch (error) {
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
            } finally {
                this.shouldDisableCheckoutButton = false;
            }
        },

        isFormValid () {
            this.$v.$touch();
            return !this.$v.$invalid;
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

        if (this.isDeliveryMethod) {
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
$checkout-width                           : 462px;

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

    h1 {
        @include font-size(heading-s);
        margin-bottom: spacing(x2);
    }

    .o-btn--allergy {
        padding: 0 spacing(x3);
        @include font-size(body-l);
        font-weight: $font-weight-bold;
        line-height: $line-height;
        margin-bottom: spacing(x0.5);
    }

    .o-btn--payment {
        display: flex;
        margin: spacing(x2) auto;
        @include font-size(body-l);
        font-weight: $font-weight-bold;
        line-height: $line-height;

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
