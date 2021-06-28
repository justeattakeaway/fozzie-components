<template>
    <div>
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1 :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationNotLoggedIn') }}
        </h1>

        <p>
            {{ $t('messages.descriptionActivationNotLoggedIn') }}
        </p>

        <div :class="$style['c-takeawaypayActivation-actions']">
            <f-button
                :href="loginUrl"
                data-test-id="takeawaypay-activation-not-loggedin-login-link"
                button-type="primary"
                button-size="large"
                is-full-width>
                {{ $t('actions.loginToAccount2') }}
            </f-button>

            <f-button
                :href="registrationUrl"
                data-test-id="takeawaypay-activation-not-loggedin-registration-link"
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

.c-takeawaypayActivation-actions {
    padding-top: spacing(x3);
}

</style>
