<template>
    <div
        :data-theme="theme"
        :class="$style['c-checkout']"
        data-test-id='checkout-component'>
        <card
            :data-theme="theme"
            :card-heading="title"
            is-rounded
            has-outline
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="checkout-card-component"
            :class="$style['c-card-dimensions']">
            <form action="post">
                <form-field
                    v-model="mobileNumber"
                    :class="$style['c-formField']"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    label-text="Mobile number"
                    input-type="text"
                    label-style="inline" />

                <div :class="$style['l-address-group']">
                    <form-field
                        v-model="address.lineOne"
                        :class="$style['c-formField']"
                        name="address-line-one"
                        data-test-id="input-address-line-one"
                        label-text="Address line 1"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.lineTwo"
                        :class="$style['c-formField']"
                        name="address-line-two"
                        data-test-id="input-address-line-two"
                        label-text="Address line 2 (optional)"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.city"
                        :class="$style['c-formField']"
                        name="address-city"
                        data-test-id="input-address-city"
                        label-text="City"
                        input-type="text"
                        label-style="inline" />
                </div>

                <form-field
                    v-model="address.postcode"
                    :class="$style['c-formField']"
                    name="address-postcode"
                    data-test-id="input-address-postcode"
                    label-text="Postcode"
                    input-type="text"
                    label-style="inline" />

                <form-selector />
                <user-note />
                <allergy-note />

                <form-button
                    data-test-id="confirm-payment-submit-button">
                    {{ buttonText }}
                </form-button>
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
import FormButton from './Button.vue';
import UserNote from './UserNote.vue';
import AllergyNote from './AllergyNote.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',

    components: {
        Card,
        FormField,
        FormSelector,
        FormButton,
        AllergyNote,
        UserNote
    },

    props: {
        locale: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: 'Go to payment'
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme,
            firstName: 'faye',
            mobileNumber: null,
            address: {
                lineOne: null,
                lineTwo: null,
                city: null,
                postcode: null
            }
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
$font-family                              : $font-family-base;
$font-colour                              : $color-text;
$font-weight                              : $font-weight-base;

.c-checkout {
    margin: auto;
    font-family: $font-family-base;
    color: $font-colour;
    font-weight: $font-weight;

    .c-card-dimensions {
        width: 462px;
        padding: 25px 80px 50px 80px;
    }

    h1 {
        font-size: 20px;
        margin-bottom: 20px;
    }

    .c-formField {
        input {
            height: 50px;
        }
    }

    .l-address-group {
        margin: 18px 0 34px 0;
        @include font-size(body-s);

        div {
            margin-bottom: -17px;
        }
    }
}
</style>
