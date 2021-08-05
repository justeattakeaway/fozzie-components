<template>
    <card
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        :card-heading="$t(`ageVerification.heading`)"
        data-test-id="checkout-age-verification-component"
        :class="[$style['c-checkout-ageVerification'], $style['c-checkout-ageVerification--verticalPadding']]">
        <p
            :class="$style['c-checkout-ageVerification-description']"
            data-test-id="checkout-age-verification-description">
            {{ $t(`ageVerification.description`) }}
        </p>

        <div
            :class="$style['c-checkout-ageVerification-fields']">
            <form-field
                id="day-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.day`)"
                :dropdown-options="days"
                :value="days[0].text" />

            <form-field
                id="month-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.month`)"
                :dropdown-options="months"
                :value="months[0].text" />

            <form-field
                id="year-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.year`)"
                :dropdown-options="years"
                :value="years[0].text" />
        </div>


        <p
            :class="$style['c-checkout-ageVerification-description']"
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
            return [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' },
                { text: '6', value: '6' }
            ];
        },
        months () {
            return [
                { text: 'Jan', value: '1' },
                { text: 'Feb', value: '2' },
                { text: 'Mar', value: '3' },
                { text: 'Apr', value: '4' },
                { text: 'May', value: '5' },
                { text: 'June', value: '6' },
                { text: 'July', value: '7' },
                { text: 'Aug', value: '8' },
                { text: 'Sept', value: '9' },
                { text: 'Oct', value: '10' },
                { text: 'Nov', value: '11' },
                { text: 'Dec', value: '12' }
            ];
        },
        years () {
            return [
                { text: '1990', value: '1990' },
                { text: '1991', value: '1991' },
                { text: '1992', value: '1992' },
                { text: '1993', value: '1993' },
                { text: '1994', value: '1994' },
                { text: '1995', value: '1995' },
                { text: '1996', value: '1996' }
            ];
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
// .c-checkout-error {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     text-align: center;

//     &.c-checkout-error--verticalPadding {
//         @include media('<=narrow') {
//             border: none;
//             padding-top: spacing(x2);
//             padding-bottom: spacing(x2);
//         }
//     }
// }

.c-checkout-ageVerification-description {
    margin: spacing(x2) 0 spacing(x2);
}

.c-checkout-ageVerification-button {
    margin: spacing(x2) 0 spacing();
}

.c-checkout-ageVerification-fields {
    display: flex;
    flex-wrap: nowrap;
    justify-content: stretch;
    gap: spacing();

}
.c-checkout-ageVerification-field {
    flex-basis: calc(100% /3);
}
</style>
