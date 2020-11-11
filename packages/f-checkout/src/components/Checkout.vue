<template>
    <div
        data-theme="jet"
        :class="$style['c-checkout']"
        data-test-id="checkout-component">
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
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    :label-text="$t('labels.mobileNumber')"
                    label-style="inline" />

                <address-block
                    v-if="checkoutMethod === delivery"
                    :labels="$t('labels')"
                    data-test-id='address-block' />

                <form-selector
                    :order-method="checkoutMethod"
                    data-test-id='selector' />

                <form-selector />
                <user-note data-test-id='user-note' />
                <button
                    :class="[
                        $style['o-btn--allergy'],
                        'o-btnLink'
                    ]"
                    data-test-id="allergy-button">
                    {{ $t('allergyText') }}
                </button>

                <button
                    :class="[
                        $style['o-btn--payment'],
                        'o-btn', 'o-btn--primary', 'o-btn--wide'
                    ]"
                    data-test-id="confirm-payment-submit-button">
                    {{ $t('buttonText') }}
                </button>
            </form>
        </card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { VALID_CHECKOUT_METHOD, CHECKOUT_METHOD_DELIVERY } from '../constants';
import AddressBlock from './Address.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',

    components: {
        AddressBlock,
        Card,
        FormField,
        FormSelector,
        UserNote
    },

    mixins: [VueGlobalisationMixin],

    props: {
        checkoutMethod: {
            type: String,
            default: 'Collection',
            validator: value => (VALID_CHECKOUT_METHOD.indexOf(value) !== -1)
        }
    },

    data () {
        return {
            tenantConfigs,
            firstName: 'firstName',
            mobileNumber: null,
            address: {
                lineOne: null,
                lineTwo: null,
                city: null,
                postcode: null
            },
            delivery: CHECKOUT_METHOD_DELIVERY
        };
    },

    computed: {
        name () {
            return (this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1));
        },

        title () {
            return `${this.name}, confirm your details`;
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
