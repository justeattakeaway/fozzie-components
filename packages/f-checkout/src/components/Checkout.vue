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
                action="">
                <form-field
                    v-model="mobileNumber"
                    name="mobile-number"
                    data-test-id="input-mobile-number"
                    label-text="Mobile number"
                    input-type="text"
                    label-style="inline" />

                <div :class="$style['form-field-group']">
                    <form-field
                        v-model="lineOne"
                        name="address-line-one"
                        data-test-id="input-address-line-one"
                        label-text="Address line 1"
                        input-type="text"
                        label-style="inline"
                        :class="$style['grouped-form-field']" />

                    <form-field
                        v-model="lineTwo"
                        name="address-line-two"
                        data-test-id="input-address-line-two"
                        label-text="Address line 2"
                        input-type="text"
                        label-style="inline"
                        :class="$style['grouped-form-field']" />

                    <form-field
                        v-model="city"
                        name="address-city"
                        data-test-id="input-address-city"
                        label-text="City"
                        input-type="text"
                        label-style="inline"
                        :class="$style['grouped-form-field']" />
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
                    <h4 :class="$style['note-heading']">
                        Leave a note
                    </h4>
                    <p :class="$style['note-text']">
                        {{ noteText }}
                    </p>

                    <textarea
                        id="c-fareaorm-text-"
                        name="notePlaceholder"
                        cols="30"
                        rows="10"
                        :class="$style['c-form-text-area']"
                        :placeholder="notePlaceholder" />
                </div>

                <allergy-note />

                <form-button
                    data-test-id="confirm-payment-submit-button"
                    button-style="primary">
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
import AllergyNote from './AllergyNote.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueCheckout',
    components: {
        Card,
        FormField,
        FormSelector,
        FormButton,
        AllergyNote
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
$form-input-colour                        : $color-text;
$form-input-bg                            : $white;
$form-input-borderRadius                  : 3px;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $grey--light;
$form-input-borderColour--focus           : $grey--dark;
$form-note-text                           : $grey--darkest;

.c-checkout {
    margin: auto;
    // min-height: 80vh;
    font-family: $font-family-base;
}

.c-card-padding {
    padding-top: 20px;
    padding-bottom: 40px;
}

.c-form-text-area {
    width: 100%;
    height: 12rem;
    padding: 0.5rem;
    resize: none;
    @include font-size();
    font-family: $font-family-base;
    color: $form-input-colour;
    font-weight: $font-weight-base;
    background-color: $form-input-bg;
    border: $form-input-borderWidth solid $form-input-borderColour;
    border-radius: $form-input-borderRadius;
    background-clip: padding-box;
}

.grouped-form-field {
    margin-top:-9px;
    margin-bottom:-18px;
}
.form-field-group {
    background: yellow;
    margin: 29px 0 40px 0;
}

.note-text {
    color: $form-input-borderColour--focus;
    margin-top: 5px;
}

.note-heading {
    margin: 0;
}
</style>
