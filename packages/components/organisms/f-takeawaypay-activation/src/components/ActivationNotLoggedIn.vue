<template>
    <div data-test-id="activation-not-logged-in-component">
        <bag-run-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1 :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationNotLoggedIn') }}
        </h1>

        <p
            :class="$style['c-takeawaypayActivation-description']">
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
import { BagRunBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        FButton,
        BagRunBgIcon
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

@import './../assets/scss/takeaway-pay-activation';

</style>
