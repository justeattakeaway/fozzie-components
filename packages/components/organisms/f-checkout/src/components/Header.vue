<template>
    <div
        data-test-id="checkoutHeader-component"
        :class="$style['c-checkoutHeader']">
        <div
            v-if="isLoggedIn"
            data-test-id="user-checkoutHeader">
            <h2 data-test-id="user-title">
                {{ $t('checkoutHeader.user.title', { name }) }}
            </h2>

            <p :class="$style['c-checkoutHeader-loginLink']">
                <a
                    class="o-link--bold o-link--noDecoration"
                    :href="loginUrl"
                    data-test-id="switch-user-link"
                    @click="onVisitLoginPage">
                    {{ $t('checkoutHeader.user.switchUser', { name }) }}
                </a>
            </p>
        </div>

        <div
            v-else
            data-test-id="guest-checkoutHeader">
            <h2 :class="$style['c-checkoutHeader-title']">
                {{ $t('checkoutHeader.guest.loginTitle') }}
            </h2>

            <f-button
                button-type="primary"
                button-size="large"
                is-full-width
                :class="$style['c-checkoutHeader-loginButton']"
                data-test-id="guest-login-button"
                :href="loginUrl"
                @click.native="onVisitLoginPage">
                {{ $t('checkoutHeader.guest.loginButton') }}
            </f-button>

            <div
                :class="$style['c-checkoutHeader-option']">
                <span>{{ $t('checkoutHeader.guest.option') }}</span>
            </div>

            <h2 :class="$style['c-checkoutHeader-title']">
                {{ $t('checkoutHeader.guest.guestTitle') }}
            </h2>

            <p
                :class="$style['c-checkoutHeader-confirmation']"
                data-test-id="service-type-confirmation">
                {{ $t('checkoutHeader.guest.confirmation', { serviceType }) }}
            </p>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapState } from 'vuex';
import EventNames from '../event-names';
import { VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: {
        FButton
    },

    props: {
        loginUrl: {
            type: String,
            required: true
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer',
            'isLoggedIn',
            'serviceType'
        ]),

        name () {
            return (this.customer.firstName.charAt(0).toUpperCase() + this.customer.firstName.slice(1));
        }
    },

    methods: {
        onVisitLoginPage () {
            this.$emit(EventNames.CheckoutVisitLoginPage);

            this.$logger.logInfo('Consumer Visit Login Page', this.$store);
        }
    }
};
</script>

<style lang="scss" module>
.c-checkoutHeader {
    text-align: center;
}

.c-checkoutHeader-title {
    margin-top: 0;
    margin-bottom: spacing(x0.5);
    @include font-size('heading-s');
}

.c-checkoutHeader-loginButton {
    margin-top: spacing(x2);
}

.c-checkoutHeader-confirmation {
    margin-top: spacing(x0.5);
    margin-bottom: 0;
    @include font-size('body-s');
    font-weight: $font-weight-bold;
    color: $grey--dark;
}

.c-checkoutHeader-option {
    display: block;
    margin-top: spacing(x2);
    margin-bottom: spacing(x2);
    text-transform: uppercase;
    font-weight: 300;
    overflow: hidden;

    > span {
        @include font-size('caption');
        position: relative;
        display: inline-block;

        &:before {
            right: 100%;
            margin-right: 60px;
        }

        &:after {
            left: 100%;
            margin-left: 60px;
        }

        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            width: 9999px;
            height: 1px;
            background: $grey--mid;
        }
    }
}

.c-checkoutHeader-loginLink {
    text-align: center;
}
</style>
