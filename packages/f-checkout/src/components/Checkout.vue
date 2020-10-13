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
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    label-text="Mobile number"
                    input-type="text"
                    label-style="inline" />

                <div :class="$style['l-addressGroup']">
                    <form-field
                        v-model="address.line1"
                        name="address-line-1"
                        data-test-id="input-address-line-1"
                        label-text="Address line 1"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.line2"
                        name="address-line-2"
                        data-test-id="input-address-line-2"
                        label-text="Address line 2 (optional)"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.city"
                        name="address-city"
                        data-test-id="input-address-city"
                        label-text="City"
                        input-type="text"
                        label-style="inline" />
                </div>

                <form-field
                    v-model="address.postcode"
                    name="address-postcode"
                    data-test-id="input-address-postcode"
                    label-text="Postcode"
                    input-type="text"
                    label-style="inline" />

                <form-selector />
                <user-note />
                <button
                    :class="[$style['o-btn--allergy'],
                             'o-btnLink']"
                    data-test-id="allergy-button">
                    {{ allergyText }}
                </button>

                <button
                    :class="[$style['o-btn--payment'],
                             'o-btn', 'o-btn--primary', 'o-btn--wide']"
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
import FormSelector from './Selector.vue';
import UserNote from './UserNote.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',

    components: {
        Card,
        FormField,
        FormSelector,
        UserNote
    },

    props: {
        locale: {
            type: String,
            default: ''
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
        title () {
            return `${this.firstName}, confirm your details`;
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
        padding: spacing(x5) spacing(x9) spacing(x4) spacing(x9);
    }

    h1 {
        @include font-size(heading-s);
        margin-bottom: spacing(x2);
    }

    input {
        height: 50px;
    }

    label {
        @include font-size(body-l);
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
        margin-bottom: spacing(x1);
    }

    .o-btn--payment {
        display: flex;
        margin: spacing(x2) auto;
        @include font-size(body-l);
        font-weight: $font-weight-bold;
        line-height: $line-height;
    }
}
</style>
