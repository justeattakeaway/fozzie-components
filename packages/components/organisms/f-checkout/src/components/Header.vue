<template>
    <div
        data-test-id='header-component'
        :class="$style['c-header']">
        <div
            v-if="isLoggedIn"
            data-test-id='user-header'>
            <h2 data-test-id='user-title'>
                {{ title }}
            </h2>
            <p
                :class="$style['c-header-loginLink']">
                <a
                    :href="loginUrl"
                    data-test-id="switch-user-link"
                    @click="onVisitLoginPage">
                    {{ $t('switchUserText', { name }) }}
                </a>
            </p>
        </div>

        <div
            v-else
            data-test-id='guest-header'>
            <h2 :class="$style['c-header-title']">
                {{ $t('guestHeader') }}
            </h2>
            <a
                :href="loginUrl"
                data-test-id="guest-login-button"
                :class="$style['c-header-loginButton']"
                @click="onVisitLoginPage">
                {{ $t('loginButtonText') }}
            </a>

            <div
                :class="$style['c-header-option']">
                <span>{{ $t('guestOption') }}</span>
            </div>

            <h2 :class="$style['c-header-title']">
                {{ $t('guestTitle') }}
            </h2>
            <p :class="$style['c-header-confirmation']">
                {{ $t('guestDeliveryHeader') }}
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
        },

        title () {
            return `${this.name}, confirm your details`;
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
.c-header {
    text-align: center;
}

.c-header-title {
    margin-top: 0;
    margin-bottom: spacing(x0.5);
    @include font-size('heading-s');
}

.c-header-loginButton {
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

.c-header-confirmation {
    margin-top: spacing(x0.5);
    margin-bottom: 0;
    @include font-size('body-s');
    font-weight: $font-weight-bold;
    color: $grey--dark;

}

.c-header-option {
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

        &::before {
            right: 100%;
            margin-right: 60px;
        }

        &::after {
            left: 100%;
            margin-left: 60px;
        }

        &:before,
        &:after {
            content: "";
            position: absolute;
            top: 50%;
            width: 9999px;
            height: 1px;
            background: $grey--mid;
        }
    }
}

.c-header-loginLink {
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
