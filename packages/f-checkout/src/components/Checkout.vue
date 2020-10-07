<template>
    <div
        :class="$style['c-checkout']"
        data-test-id='checkout-component'>
        <card
            :data-theme="theme"
            :card-heading="title"
            has-outline
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="checkout-card-component"
            :class="$style['c-card-padding']">
            <form action="">
                <form-field
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    label-text="Mobile Number"
                    input-type="text"
                    label-style="inline" />

                <div>
                    <form-field
                        v-model="address.lineOne"
                        name="address-line-one"
                        data-test-id="input-address-line-one"
                        label-text="Address Line 1"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.lineTwo"
                        name="address-line-two"
                        data-test-id="input-address-line-two"
                        label-text="Address Line 2"
                        input-type="text"
                        label-style="inline" />

                    <form-field
                        v-model="address.mobileNumber"
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
            </form>
        </card>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',
    components: {
        Card,
        FormField
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
        address: {
            type: Object,
            default: () => {}
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

.c-checkout {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

.c-card-padding {
    padding-top: 30px;
}

</style>
