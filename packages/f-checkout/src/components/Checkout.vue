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
            heading="Error">
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
import { globalisationServices } from '@justeat/f-services';
import { validationMixin } from 'vuelidate';
import {
    required,
    numeric,
    minLength
} from 'vuelidate/lib/validators';
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY } from '../constants';
import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';
import tenantConfigs from '../tenants';
import CheckoutServiceApi from '../services/CheckoutServiceApi';
import EventNames from '../event-names';

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
        ErrorMessage,
        Card,
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

        // TODO: remove default add required back
        checkoutUrl: {
            type: String,
            // required: true,
            default: 'http://localhost/account/register'
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
            const mobileNumberInvalid = !this.$v.mobileNumber.required || !this.$v.mobileNumber.numeric || !this.$v.mobileNumber.minLength;
            return !(this.$v.mobileNumber.$dirty && mobileNumberInvalid);
        },

        isDeliveryMethod () {
            return this.checkoutMethod === CHECKOUT_METHOD_DELIVERY;
        }
    },

    methods: {
        formValidationState ($v) {
            const fields = $v.$params;
            const invalidFields = [];
            const validFields = [];

            Object.keys(fields).forEach(key => {
                if ($v[key].$invalid) {
                    invalidFields.push(key);
                } else {
                    validFields.push(key);
                }
            });

            return {
                validFields,
                invalidFields
            };
        },

        // TODO: Extract to `f-services`
        isValidPostcode () {
            // regex: https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive#164994
            const postcodeRegex = /^([Gg][Ii][Rr]\s?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
            return postcodeRegex.test(this.address.postcode);
        },

        async onFormSubmit () {
            if (this.isFormInvalid()) {
                const validationState = this.formValidationState(this.$v);

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
                this.$emit(EventNames.CheckoutFailure, thrownErrors);

                if (error && error.response && error.response.data && error.response.data.errors) {
                    thrownErrors = error.response.data.errors;
                }
                const shouldEmitCheckoutFailure = true;

                if (Array.isArray(thrownErrors)) {
                    this.genericErrorMessage = thrownErrors[0].description || 'Something went wrong, please try again later';
                } else {
                    this.genericErrorMessage = error;
                }

                if (shouldEmitCheckoutFailure) {
                    this.$emit(EventNames.CheckoutFailure, thrownErrors);
                }
            } finally {
                this.shouldDisableCreateAccountButton = false;
            }
        },

        isFormInvalid () {
            this.$v.$touch();
            return this.$v.$invalid;
        }
    },

    validations () {
        const collectionDetails = {
            mobileNumber: {
                required,
                numeric,
                minLength: minLength(10)
            }
        };

        if (this.isDeliveryMethod) {
            collectionDetails.address = {
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

        return collectionDetails;
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
