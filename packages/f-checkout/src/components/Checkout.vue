<template>
    <div
        :data-theme="theme"
        :class="$style['c-checkout']"
        data-test-id='checkout-component'>
        <card
            :card-heading="title"
            is-rounded
            has-outline
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="checkout-card-component"
            :class="$style['c-card--dimensions']">
            <form action="post">
                <form-field
                    v-model="customer.phoneNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    :label-text="copy.labels.mobileNumber"
                    label-style="inline" />

                <address-block
                    v-if="isDelivery"
                    :labels="copy.labels"
                    :address="fulfillment.address"
                    data-test-id='address-block' />

                <form-selector
                    :order-method="serviceType"
                    :times="fulfillment.times"
                    data-test-id='selector' />


                <user-note data-test-id='user-note' />
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

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Card,
        FormField,
        FormSelector,
        UserNote
    },

    props: {
        locale: {
            type: String,
            default: ''
        },

        checkoutMethod: {
            type: String,
            default: 'delivery',
            validator: value => (VALID_CHECKOUT_METHOD.indexOf(value) !== -1)
        },

        checkoutUrl: {
            type: String,
            required: true
        },

        getCheckoutTimeout: {
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
            isOpen: true,
            copy: { ...localeConfig },
            theme,
            checkoutId: '',
            isFulfillable: true,
            customer: {
                dateOfBirth: '',
                emailAddress: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            },
            fulfillment: {
                address: {
                    line1: '',
                    line2: '',
                    city: '',
                    postcode: ''
                },
                times: []
            },
            messages: [],
            notes: [],
            notices: [],
            buttonText: 'Go to payment',
            serviceType: this.checkoutMethod
        };
    },

    computed: {
        name () {
            return (this.customer.firstName.charAt(0).toUpperCase() + this.customer.firstName.slice(1));
        },

        title () {
            return this.name ? `${this.name}, confirm your details` : '';
        },

        isDelivery () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY;
        },

        tenant () {
            return {
                'en-GB': 'uk',
                'en-AU': 'au',
                'en-NZ': 'nz',
                'da-DK': 'dk',
                'es-ES': 'es',
                'en-IE': 'ie',
                'it-IT': 'it',
                'nb-NO': 'no'
            }[this.locale];
        }
    },

    async mounted () {
        try {
            const result = await CheckoutServiceApi.getData(this.checkoutUrl, this.tenant, this.getCheckoutTimeout);
            this.mapResponse(result.data);
        } catch (error) {
            const CheckoutGetFailure = 'checkout-get-failure'; // TODO: Move to event-names once the other PR merged
            this.$emit(CheckoutGetFailure, error);
        }
    },

    methods: {
        mapResponse (data) {
            this.checkoutId = data.id;
            this.isFulfillable = data.isFulfillable;
            this.customer = data.customer;
            this.fulfillment.times = data.fulfillment.times;

            this.fulfillment.address = {
                line1: data.fulfillment.address.lines[0],
                line2: data.fulfillment.address.lines[1],
                city: data.fulfillment.address.lines[3],
                postcode: data.fulfillment.address.postalCode
            };

            this.messages = data.messages;
            this.notes = data.notes;
            this.notices = data.notices;
            this.serviceType = data.serviceType;
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
}
</style>
