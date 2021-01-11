<template>
    <div data-test-id='header-component' :class="$style['c-header']">
        <div data-test-id='guest-header' v-if="isGuest">
            <h2 :class="$style['c-header-title']">{{ $t('guestHeader') }}</h2>
            <f-button
                button-type="primary"
                button-size="large"
                is-full-width
                data-test-id="guest-login-button"
                :class="$style['c-header-loginButton']">
                {{ $t('loginButtonText') }}
            </f-button>

            <div
                :class="$style['c-header-option']">
                    <span>{{ $t('guestOption') }}</span>
            </div>

            <h2 :class="$style['c-header-title']">{{ $t('guestTitle') }}</h2>
            <p :class="$style['c-header-confirmation']">{{ $t('guestDeliveryHeader') }}</p>
        </div>

        <div data-test-id='user-header' v-else>
            <h2 data-test-id='user-title'>{{ title }}</h2>
            <p
                :class="[
                    $style['c-checkout-link']
                ]">
                <a
                    :href="loginUrl"
                    data-test-id="switch-user-link"
                    @click="onVisitLoginPage">
                    {{ $t('switchUserText', { name }) }}
                </a>
            </p>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import EventNames from '../event-names';

// import { mapState } from 'vuex';

export default {
    components: { FButton },

    props: {
        isGuest: {
            type: Boolean,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        loginUrl: {
            type: String,
            required: true
        }
    },

    computed: {
        title () {
            return `${this.name}, confirm your details`;
        }
    },

    methods: {
        onVisitLoginPage () {
            this.$emit(EventNames.CheckoutVisitLoginPage);
        },

    }
};
</script>

<style lang="scss" module>

.c-header {
    text-align: center;
}

.c-header-title {
    margin-bottom: spacing();
    @include font-size('heading-m');
}

.c-header-loginButton {
    margin: spacing(x3) 0;
}

.c-header-confirmation {
    // margin-top: -16px;
    margin-bottom: spacing(x2);
    @include font-size('body-s');
    color: $grey--dark;
}

.c-header-option {
    display: block;
    margin-top: spacing(x3);
    margin-bottom: 20px;
    text-transform: uppercase;
    text-align: center;
    // font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
}

.c-header-option > span {
    // @include font-size('caption');
    position: relative;
    display: inline-block;
}

.c-header-option > span:before,
.c-header-option > span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: $grey--mid;
}

.c-header-option > span:before {
    right: 100%;
    margin-right: 60px;
}

.c-header-option > span:after {
    left: 100%;
    margin-left: 60px;
}

.c-checkout-link {
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
