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
                {{ $t('checkoutHeader.guest.guestTitle') }}
            </h2>

            <a
                :href="loginUrl"
                data-test-id="guest-login-button"
                :class="$style['c-checkoutHeader-loginButton']"
                @click="onVisitLoginPage">
                {{ $t('checkoutHeader.guest.loginButton') }}
            </a>

            <div
                :class="$style['c-checkoutHeader-option']">
                <span>{{ $t('checkoutHeader.guest.option') }}</span>
            </div>

            <h2 :class="$style['c-checkoutHeader-title']">
                {{ $t('checkoutHeader.guest.guestTitle') }}
            </h2>

            <p :class="$style['c-checkoutHeader-confirmation']">
                {{ $t('checkoutHeader.guest.confirmation') }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EventNames from '../event-names';

export default {
    props: {
        loginUrl: {
            type: String,
            required: true
        }
    },

    computed: {
        ...mapState('checkout', [
            'customer',
            'isLoggedIn'
        ]),

        name () {
            return (this.customer.firstName.charAt(0).toUpperCase() + this.customer.firstName.slice(1));
        }
    },

    methods: {
        onVisitLoginPage () {
            this.$emit(EventNames.CheckoutVisitLoginPage);
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

// TODO: Add link button to f-button
.c-checkoutHeader-loginButton {
    display: inline-block;
    width: 100%;
    background-color: $orange;
    padding: spacing(x2) 0;
    margin-top: spacing(x2);
    border: 1px solid transparent;
    border-radius: $border-radius;
    text-align: center;
    font-weight: $font-weight-bold;
    @include font-size('body-l');
    text-decoration: none;
    color: $white;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
        color: $white;
    }

    &:hover {
        background-color: $orange--dark;
    }

    &:active {
        background-color: $orange--darkest;
    }
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

    a {
        text-decoration: none;
        font-weight: $font-weight-bold;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
}
</style>
