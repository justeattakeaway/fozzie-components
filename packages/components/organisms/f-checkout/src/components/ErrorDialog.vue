<template>
    <div>
        <mega-modal
            data-test-id="checkout-issue-modal"
            has-overlay
            :is-open="shouldShowModal"
            @close="handleErrorDialogButtonClick"
        >
            <h3
                data-test-id="checkout-issue-modal-title"
                class="u-noSpacing"
            >
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.title`) }}
            </h3>

            <p data-test-id="checkout-issue-modal-message">
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.message`) }}
            </p>

            <f-button
                :class="$style['c-checkout-redirectButton']"
                button-size="large"
                data-test-id="redirect-to-menu-button"
                @click.native="handleErrorDialogButtonClick"
            >
                {{ $t(`errorMessages.checkoutIssues.${errorCode}.buttonText`) }}
            </f-button>
        </mega-modal>

        <alert
            v-if="shouldShowAlert"
            type="danger"
            :class="$style['c-checkout-alert']"
            :heading="$t('errorMessages.errorHeading')"
        >
            {{ errorCode }}
        </alert>
    </div>
</template>

<script>
import Alert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapActions, mapState } from 'vuex';
import {
    VUEX_CHECKOUT_MODULE
} from '../constants';

import EventNames from '../event-names';

export default {
    components: {
        Alert,
        MegaModal,
        FButton
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'displayError',
            'restaurant'
        ]),

        errorCode () {
            return this.displayError && this.displayError.code;
        },

        shouldShowModal () {
            return this.displayError ? this.displayError.shouldShowInDialog : false;
        },

        shouldShowAlert () {
            return this.displayError ? this.displayError.shouldShowInAlert : false;
        },

        restaurantMenuPageUrl () {
            return `restaurant-${this.restaurant.seoName}/menu`;
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateDisplayError'
        ]),

        handleButtonClick () {
            this.$emit(EventNames.CheckoutErrorDialogButtonClicked);
        },

        handleErrorDialogClose () {
            this.updateDisplayError(null);
        },

        handleErrorDialogButtonClick () {
            if (this.displayError && this.displayError.shouldRedirectToMenu) {
                window.location.assign(this.restaurantMenuPageUrl);
            }

            this.handleErrorDialogClose();
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-redirectButton {
    margin: spacing(x4) 0 spacing(x0.5);
}

.c-checkout-alert {
    width: $checkout-width;
    margin-left: auto;
    margin-right: auto;
}
</style>
