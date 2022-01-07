<template>
    <card
        data-test-id="checkout-error-page-component"
        :class="$style['c-checkout-error']"
        :card-heading="$t(`errorMessages.${messageKey}.heading`)"
        :card-description=" $t(`errorMessages.${messageKey}.description`, { serviceType: serviceType })"
        :primary-button="primaryButton"
        @primary-button-click="redirectFromErrorPage">
        <template
            #icon>
            <bag-sad-bg-icon
                data-test-id="checkout-error-page-image" />
        </template>
    </card>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@justeat/f-card-with-content';
import { BagSadBgIcon } from '@justeat/f-vue-icons';
import '@justeat/f-card-with-content/dist/f-card-with-content.css';
import {
    VUEX_CHECKOUT_MODULE,
    CHECKOUT_ERROR_FORM_TYPE
} from '../constants';
import loggerMixin from '../mixins/logger.mixin';

export default {
    components: {
        Card,
        BagSadBgIcon
    },

    mixins: [
        loggerMixin
    ],

    props: {
        redirectUrl: {
            type: String,
            default: ''
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'restaurant',
            'checkoutErrorMessage',
            'serviceType'
        ]),

        messageKey () {
            return this.checkoutErrorMessage.messageKey;
        },

        primaryButton () {
            return {
                text: this.$t(`errorMessages.${this.messageKey}.buttonText`)
            };
        }
    },

    mounted () {
        this.logInvoker({
            message: 'Consumer Checkout Error Page',
            data: {},
            logMethod: this.$logger.logWarn
        });
    },

    methods: {
        redirectFromErrorPage () {
            if (this.messageKey === CHECKOUT_ERROR_FORM_TYPE.accessForbidden) {
                const cookieName = `je-mw-basket-${this.restaurant.id}`;
                const basketCookie = this.$cookies.get(cookieName);
                if (basketCookie) {
                    this.$cookies.remove(cookieName);
                }
            }

            window.location.assign(this.redirectUrl);
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-error {
    @include media('<=narrow') {
        border: none;
        padding-top: spacing(x2);
        padding-bottom: spacing(x2);
    }
}
</style>
