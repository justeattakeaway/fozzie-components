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
                <component
                    :is="checkoutType"
                    :labels="copy.labels"
                    data-test-id='checkout-component-type' />

                <form-selector
                    :label="copy.labels.timeSelector" />

                <user-note />
                <button
                    :class="[
                        $style['o-btn--allergy'],
                        'o-btnLink'
                    ]"
                    data-test-id="allergy-button">
                    {{ allergyText }}
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
import { VALID_CHECKOUT_TYPES } from '../constants';
import '@justeat/f-card/dist/f-card.css';
import Collection from './Collection.vue';
import Delivery from './Delivery.vue';
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',

    components: {
        Card,
        Collection,
        Delivery,
        FormSelector,
        UserNote
    },

    props: {
        locale: {
            type: String,
            default: ''
        },
        checkoutType: {
            type: String,
            default: 'Collection',
            validator: value => (VALID_CHECKOUT_TYPES.indexOf(value) !== -1)
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
                lineOne: null,
                lineTwo: null,
                city: null,
                postcode: null
            },
            buttonText: 'Go to payment',
            allergyText: 'If you or someone you’re ordering for has a food allergy or intolerance, click here'
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

    .c-formField {
        input {
            height: 50px;
        }

        label {
            @include font-size(body-l);
        }
    }

    .l-addressGroup {
        margin: spacing(x2) 0 spacing(x4) 0;
        @include font-size(body-s);

        div {
            margin-bottom: -17px;
        }
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
