<template>
    <div
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
            :class="$style['c-card-padding']">
            <form
                action=""
                :class="$style['o-form']">
                <form-field
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    label-text="Mobile number"
                    input-type="text"
                    label-style="inline" />

                <div>
                    <form-field
                        v-model="lineOne"
                        name="address-line-one"
                        data-test-id="input-address-line-one"
                        label-text="Address line 1"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="lineTwo"
                        name="address-line-two"
                        data-test-id="input-address-line-two"
                        label-text="Address line 2"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="mobileNumber"
                        name="address-city"
                        data-test-id="input-address-city"
                        label-text="City"
                        input-type="text"
                        label-style="inline" />
                </div>

                <form-field
                    v-model="postcode"
                    name="address-postcode"
                    data-test-id="input-address-postcode"
                    label-text="Postcode"
                    input-type="text"
                    label-style="inline" />

                <form-selector />

                <div>
                    <h3>Leave a note</h3>
                    <p>
                        {{ noteText }}
                    </p>

                    <textarea
                        id=""
                        name=""
                        cols="30"
                        rows="10"
                        :placeholder="notePlaceholder" />
                </div>

                <form-button
                    data-test-id="confirm-payment-submit-button"
                    button-style="primary"
                    :disabled="shouldDisableCreateAccountButton">
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
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',
    components: {
        Card,
        FormField,
        FormSelector,
        FormButton
    },
    props: {
        locale: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '#name, confirm your details'
        },
        mobileNumber: {
            type: String,
            default: null
        },
        lineOne: {
            type: String,
            default: null
        },
        lineTwo: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        postcode: {
            type: String,
            default: null
        },
        deliveryTimes: {
            type: Array,
            default: () => []
        },
        noteText: {
            type: String,
            default: "Leave a note for the restaurant with anything they need to know (e.g. the doorbell doesn't work). Do not include details about any allergies here."
        },
        notePlaceholder: {
            type: String,
            default: "e.g. the dorbell doesn't work. Do not include details about any allergies here. \n\n We're working with resturants to cut waste. Please don't as for plastic cutlery."
        },
        buttonText: {
            type: String,
            default: 'Go to Payment'
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};
</script>

<style lang="scss" module>
// .c-checkout {
//     display: flex;
//     justify-content: center;
//     min-height: 80vh;
//     width: 80vw;
//     margin: auto;
//     border: 1px solid $red;
//     font-family: $font-family-base;
//     @include font-size(heading-m);
// }

.c-card-padding {
    padding-top: 30px;
}

.o-form {
    @include font-size(body-l);
}
</style>
