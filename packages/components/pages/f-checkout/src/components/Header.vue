<template>
    <div
        data-test-id="checkoutHeader-component"
        :class="$style['c-checkoutHeader']">
        <div
            v-if="isLoggedIn"
            data-test-id="user-checkoutHeader">
            <h1
                data-test-id="user-title"
                :class="$style['c-checkoutHeader-title']">
                {{ $t('checkoutHeader.user.title', { name }) }}
            </h1>

            <p :class="$style['c-checkoutHeader-loginLink']">
                <a
                    class="o-link--bold"
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
            <h1
                data-test-id="user-title"
                :class="$style['c-checkoutHeader-guestTitle']">
                {{ $t('checkoutHeader.guest.loginTitle') }}
            </h1>

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

            <h2
                :class="$style['c-checkoutHeader-guestTitle']"
                data-test-id="guest-title">
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
    name: 'CheckoutHeader',
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

            this.$log.info(
                'Consumer Visit Login Page',
                'checkout'
            );
        }
    }
};
</script>

<style lang="scss" module>
.c-checkoutHeader {
    text-align: center;
    background-color: #93e9be;
}

.c-checkoutHeader-title {
    @include font-size('heading-m');
}

.c-checkoutHeader-guestTitle {
    margin-top: 0;
    margin-bottom: spacing(a);
    @include font-size('heading-s');
}

.c-checkoutHeader-loginButton {
    margin-top: spacing(d);
}

.c-checkoutHeader-confirmation {
    margin-top: spacing(a);
    margin-bottom: 0;
    @include font-size('body-s');
    color: $color-content-subdued;
}

.c-checkoutHeader-option {
    display: block;
    margin-top: spacing(d);
    margin-bottom: spacing(d);
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
            background: $color-grey-40;
        }
    }
}

.c-checkoutHeader-loginLink {
    text-align: center;
}
</style>
