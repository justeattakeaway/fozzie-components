<template>
    <mega-modal
        data-test-id="checkout-issue-modal"
        has-overlay
        :is-open="isOpen"
        @close="closeErrorDialog"
    >
        <span v-if="isOpen">
            <h3
                data-test-id="checkout-issue-modal-title"
                class="u-noSpacing"
            >
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.title`, { serviceType: serviceTypeText }) }}
            </h3>

            <p data-test-id="checkout-issue-modal-message">
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.message`, { serviceType: serviceTypeText }) }}
            </p>

            <f-button
                :class="$style['c-checkout-redirectButton']"
                button-size="large"
                data-test-id="redirect-to-menu-button"
                @click.native="closeErrorDialog"
            >
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.buttonText`) }}
            </f-button>
        </span>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapActions, mapState } from 'vuex';
import {
    VUEX_CHECKOUT_MODULE
} from '../constants';

export default {
    components: {
        FButton,
        MegaModal
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'message',
            'restaurant',
            'serviceType'
        ]),

        errorCode () {
            return this.message && this.message.code;
        },

        isOpen () {
            return this.message && this.message.shouldShowInDialog;
        },

        restaurantMenuPageUrl () {
            return `restaurant-${this.restaurant.seoName}/menu`;
        },

        serviceTypeText () {
            return this.$t(`serviceTypes.${this.serviceType}`);
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateMessage'
        ]),

        closeErrorDialog () {
            if (this.message && this.message.shouldRedirectToMenu) {
                window.location.assign(this.restaurantMenuPageUrl);
            }

            this.updateMessage();
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-redirectButton {
    margin: spacing(x4) 0 spacing(x0.5);
}
</style>
