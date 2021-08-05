<template>
    <card
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        data-test-id="checkout-age-verification-component"
        :class="[$style['c-checkout-ageVerification'], $style['c-checkout-ageVerification--verticalPadding']]">
        <h1
            :class="$style['c-checkout-ageVerification-heading']"
            data-test-id="checkout-age-verification-heading">
            {{ $t(`ageVerification.heading`) }}
        </h1>

        <p
            :class="$style['c-checkout-ageVerification-description']"
            data-test-id="checkout-age-verification-description">
            {{ $t(`ageVerification.description`) }}
        </p>

        <form-field
            id="day-selection"
            input-type="dropdown"
            :label-text="$t(`ageVerification.ageSelection.day`)"
            :dropdown-options="days"
            :value="days[0]" />

        <form-field
            id="month-selection"
            input-type="dropdown"
            :label-text="$t(`ageVerification.ageSelection.month`)"
            :dropdown-options="months"
            :value="months[0]" />
        <form-field
            id="year-selection"
            input-type="dropdown"
            :label-text="$t(`ageVerification.ageSelection.year`)"
            :dropdown-options="years"
            :value="years[0]" />

        <p
            :class="$style['c-checkout-ageVerification-askForIdDescription']"
            data-test-id="checkout-age-verification-askForIdDescription">
            {{ $t(`ageVerification.askForIdDescription`) }}
        </p>

        <f-button
            :class="$style['c-checkout-ageVerification-button']"
            button-size="large"
            button-type="primary"
            is-full-width
            data-test-id="age-verification-redirect-button"
            @click.native="redirectFromErrorPage">
            {{ $t(`ageVerification.buttonText`) }}
        </f-button>
    </card>
</template>

<script>
// import { mapState } from 'vuex';
import Card from '@justeat/f-card';
import FButton from '@justeat/f-button';
import FormField from '@justeat/f-form-field';
// import SadBagIconDecorator from '../assets/images/jet-sad-bag.svg';
import '@justeat/f-form-field/dist/f-form-field.css';
import '@justeat/f-button/dist/f-button.css';
import '@justeat/f-card/dist/f-card.css';
// import {
//     VUEX_CHECKOUT_MODULE,
//     CHECKOUT_ERROR_FORM_TYPE
// } from '../constants';
// import loggerMixin from '../mixins/logger.mixin';

export default {
    components: {
        Card,
        FButton,
        FormField
        // SadBagIconDecorator
        // },
        // mixins: [
        //     loggerMixin
        // ],
        // props: {
        //     errorFormType: {
        //         type: String,
        //         required: true
        //     },
        //     redirectUrl: {
        //         type: String,
        //         default: ''
        //     },
        //     serviceType: {
        //         type: String,
        //         default: ''
        //     }
    },

    computed: {
        //     ...mapState(VUEX_CHECKOUT_MODULE, [
        //         'restaurant'
        //     ])
        days () {
            return [1, 2, 3, 4, 5];
        },
        months () {
            return [1, 2, 3, 4, 5];
        },
        years () {
            return [1, 2, 3, 4, 5];
        }
        // },

        // mounted () {
        //     this.logInvoker({
        //         message: 'Consumer Checkout Error Page',
        //         data: {},
        //         logMethod: this.$logger.logWarn
        //     });
        // },

        // methods: {
        //     redirectFromErrorPage () {
        //         if (this.errorFormType === CHECKOUT_ERROR_FORM_TYPE.accessForbidden) {
        //             const cookieName = `je-mw-basket-${this.restaurant.id}`;
        //             const basketCookie = this.$cookies.get(cookieName);
        //             if (basketCookie) {
        //                 this.$cookies.remove(cookieName);
        //             }
        //         }

    //         window.location.assign(this.redirectUrl);
    //     }
    }
};
</script>

<style lang="scss" module>
.c-checkout-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &.c-checkout-error--verticalPadding {
        @include media('<=narrow') {
            border: none;
            padding-top: spacing(x2);
            padding-bottom: spacing(x2);
        }
    }
}

.c-checkout-error-heading {
    @include font-size(heading-s);
    margin-top: spacing(x8);
    margin-bottom: 0;
}

.c-checkout-error-description {
    @include font-size(body-l);
    margin-top: spacing();
}

.c-checkout-error-button {
    margin: spacing(x4) 0 spacing(x0.5);
}
</style>
