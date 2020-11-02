<template>
    <div
        :data-theme="theme"
        :class="$style['c-checkout']"
        data-test-id='checkout-component'>
        <alert
            v-if="genericErrorMessage"
            :locale="locale"
            type="danger"
            heading="error">
            <p>There's been an error</p>
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
                            v-if="isMobileNumberInvalid"
                            data-test-id='error-mobile-number-empty'>
                            {{ copy.validationMessages.mobileNumber.requiredError }}
                        </error-message>
                    </template>
                </form-field>

                <address-block
                    v-if="checkoutMethod === delivery"
                    v-model="address"
                    data-test-id='address-block' />

                <form-selector
                    :order-method="checkoutMethod"
                    data-test-id='selector' />

                <user-note />
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
            delivery: CHECKOUT_METHOD_DELIVERY,
            genericErrorMessage: null,
            formStarted: false
        };
    },

    provide () {
        const passed = {};
        Object.defineProperty(passed, '$v', {
            enumerable: true,
            get: () => this.$v
        });
        Object.defineProperty(passed, 'copy', {
            enumerable: true,
            get: () => this.copy
        });
        return { passed };
    },

    computed: {
        name () {
            return (this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1));
        },

        title () {
            return `${this.name}, confirm your details`;
        },

        isMobileNumberInvalid () {
            const mobileNumberInvalid = !this.$v.mobileNumber.required || !this.$v.mobileNumber.numeric || !this.$v.mobileNumber.minLength;
            return this.$v.mobileNumber.$dirty && mobileNumberInvalid;
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

        isValidPostcode () {
            if (this.address.postcode) {
                const postcode = this.address.postcode.replace(/\s/g, '');
                const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
                return regex.test(postcode);
            }
            return false;
        },

        onFormSubmit () {
            if (this.isFormInvalid()) {
                const validationState = this.formValidationState(this.$v);
                this.$emit(EventNames.GoToPaymentFailure, validationState);
            }

            try {
                this.$emit(EventNames.GoToPaymentSuccess);
            } catch (error) {
                const thrownErrors = error;
                this.$emit(EventNames.GoToPaymentFailure, thrownErrors);
            }
        },

        isFormInvalid () {
            this.$v.$touch();
            return this.$v.$invalid;
        }
    },

    validations () {
        if (this.checkoutMethod === this.delivery) {
            return {
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
                },

                mobileNumber: {
                    required,
                    numeric,
                    minLength: minLength(10)
                }
            };
        }
        return {
            mobileNumber: {
                required,
                numeric,
                minLength: minLength(10)
            }
        };
    }
};
</script>

<style lang="scss" module>
$line-height                              : 16px;

.c-checkout {
    margin: auto;
    font-family: $font-family-base;
    color: $color-text;
    font-weight: $font-weight-base;

    .c-card--dimensions {
        width: 462px;
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
