<template>
    <div data-test-id="activation-logged-in-component">
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1
            :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationAvailable') }}
        </h1>

        <p>
            {{ $t('messages.descriptionActivationAvailable1') }} <span :class="$style['c-takeawaypayActivation-email']">{{ consumerEmail }}</span>
        </p>

        <p>
            {{ $t('messages.descriptionActivationAvailable2') }}
        </p>

        <div :class="$style['c-takeawaypayActivation-actions']">
            <f-button
                :disabled="activationInProgress"
                :is-loading="activationInProgress"
                data-test-id="takeawaypay-activation-activate-button"
                button-type="primary"
                button-size="large"
                is-full-width
                @click="activate">
                {{ $t('actions.activateTakeawayPay') }}
            </f-button>
            <f-button
                v-if="!activationInProgress"
                :href="loginUrl"
                data-test-id="takeawaypay-activation-loggedin-login-link"
                button-type="outline"
                button-size="large"
                is-full-width>
                {{ $t('actions.loginToAccount1') }}
            </f-button>
            <f-button
                v-if="!activationInProgress"
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
import TakeawaypayActivationServiceApi from '../services/TakeawaypayActivationServiceApi';

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
        },
        activateUrl: {
            type: String,
            required: true
        },
        authToken: {
            type: String,
            required: true
        },
        consumerId: {
            type: String,
            required: true
        },
        consumerEmail: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            activationInProgress: false
        };
    },

    methods: {
        async activate () {
            this.activationInProgress = true;
            const activationSuccessful = await TakeawaypayActivationServiceApi.activate(this.activateUrl, this.employeeId, this.authToken, this.consumerId, this.$store, this.$logger);
            this.$emit('activation-result', activationSuccessful);
            this.activationInProgress = false;
        }
    }
};
</script>

<style lang="scss" module>

@import './../assets/scss/takeaway-pay-activation';

</style>
