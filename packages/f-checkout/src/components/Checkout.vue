<template>
    <div
        :data-theme="theme"
        :class="$style['c-checkout']"
        data-test-id='checkout-component'>
        <alert
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
                @click="formStart"
                @focus="formStart"
                @submit.prevent="onFormSubmit">
                <form-field
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    :label-text="copy.labels.mobileNumber"
                    label-style="inline">
                    // TODO: - Replace with f-error-message
                    <template #error>
                        <p
                            v-if="shouldShowMobileNumberRequiredError"
                            :class="$style['o-form-error']"
                            data-test-id='error-mobile-number-empty'>
                            {{ copy.validationMessages.mobileNumber.requiredError }}
                        </p>
                    </template>
                </form-field>

                <address-block
                    v-if="checkoutMethod === delivery"
                    v-model="address"
                    :labels="copy.labels"
                    :errors="addressErrors"
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
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY } from '../constants';
import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';
import tenantConfigs from '../tenants';

const formValidationState = $v => {
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
};

function validPostcode () {
    if (this.address.postcode) {
        const postcode = this.address.postcode.replace(/\s/g, '');
        const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        return regex.test(postcode);
    }
    return false;
}

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Alert,
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
            formStarted: false
        };
    },

    computed: {
        name () {
            return (this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1));
        },

        title () {
            return `${this.name}, confirm your details`;
        },

        shouldShowMobileNumberRequiredError () {
            return (!this.$v.mobileNumber.required ||
                    !this.$v.mobileNumber.numeric ||
                    !this.$v.mobileNumber.minLength)

                    && this.$v.mobileNumber.$dirty;
        },

        shouldShowAddressLine1RequiredError () {
            return !this.$v.address.line1.required && this.$v.address.line1.$dirty;
        },

        shouldShowAddressCityRequiredError () {
            return !this.$v.address.city.required && this.$v.address.city.$dirty;
        },

        shouldShowAddressPostcodeRequiredError () {
            return !this.$v.address.postcode.required && this.$v.address.postcode.$dirty;
        },

        shouldShowAddressPostcodeTypeError () {
            return !this.$v.address.postcode.validPostcode && this.$v.address.postcode.$dirty;
        },

        addressErrors () {
            return {
                line1: {
                    error: this.shouldShowAddressLine1RequiredError,
                    message: this.copy.validationMessages.addressLine1.requiredError
                },

                city: {
                    error: this.shouldShowAddressCityRequiredError,
                    message: this.copy.validationMessages.city.requiredError
                },

                postcode: {
                    errors: {
                        required: {
                            error: this.shouldShowAddressPostcodeRequiredError,
                            message: this.copy.validationMessages.postcode.requiredError
                        },

                        type: {
                            error: this.shouldShowAddressPostcodeTypeError,
                            message: this.copy.validationMessages.postcode.invalidCharError
                        }
                    }
                }
            };
        }
    },

    methods: {
        onFormSubmit () {
            if (this.isFormInvalid()) {
                const validationState = formValidationState(this.$v);
                console.log(validationState);
            }
        },

        formStart () {
            this.formStarted = true;
        },

        isFormInvalid () {
            this.$v.$touch();
            return this.$v.$invalid;
        }
    },

    validations: {
        mobileNumber: {
            required,
            numeric,
            minLength: minLength(10)
        },

        address: {
            line1: {
                required
            },
            city: {
                required
            },
            postcode: {
                required,
                validPostcode
            }
        }
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

    .o-form-error {
        display: flex;
        align-items: center;
        color: $red;
        @include font-size(body-s);
        margin-top: spacing();
    }
}
</style>
