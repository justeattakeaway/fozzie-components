<template>
    <div>
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <p
            :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationAvailable') }}
        </p>

        <p>
            {{ $t('messages.descriptionActivationAvailable1') }} <span :class="$style['c-takeawaypayActivation-email']">test@mail.com</span>
        </p>

        <p>
            {{ $t('messages.descriptionActivationAvailable2') }}
        </p>

        <div :class="$style['c-takeawaypayActivation-actions']">
            <f-button
                :class="$style['c-registration-submit']"
                data-test-id="takeawaypay-activation-activate-button"
                button-type="primary"
                button-size="large"
                is-full-width>
                {{ $t('actions.activateTakeawayPay') }}
            </f-button>

            <f-button
                :href="loginUrl"
                data-test-id="takeawaypay-activation-loggedin-login-link"
                button-type="outline"
                button-size="large"
                is-full-width>
                {{ $t('actions.loginToAccount1') }}
            </f-button>

            <f-button
                :href="registrationUrl"
                data-test-id="takeawaypay-activation-loggedin-registration-link"
                button-type="outline"
                button-size="large"
                is-full-width>
                {{ $t('actions.createAccount') }}
            </f-button>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { BagCelebrateBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        FButton,
        BagCelebrateBgIcon
    },

    props: {
        loginUrl: {
            type: String,
            required: true
        },
        registrationUrl: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>

.c-takeawaypayActivation-icon {
    transform: translate(10%);
    width: 125px;
}

.c-takeawaypayActivation-title {
    @include font-size(body-l);
    font-weight: $font-weight-bold;
}

.c-takeawaypayActivation-email {
    font-weight: $font-weight-bold;
}

.c-takeawaypayActivation-actions {
    padding-top: spacing(x3);
}

</style>
