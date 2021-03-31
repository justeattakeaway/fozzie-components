<template>
    <mega-modal
        :is-open="isOpen"
        data-test-id="checkout-issue-modal"
        has-overlay
        v-bind="$attrs"
        v-on="$listeners">
        <h3
            data-test-id="checkout-issue-modal-title"
            class="u-noSpacing">
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.title`) }}
        </h3>

        <p data-test-id="checkout-issue-modal-message">
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.message`) }}
        </p>

        <f-button
            :class="$style['c-checkout-redirectButton']"
            button-size="large"
            data-test-id="redirect-to-menu-button"
            @click.native="handleButtonClick">
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.buttonText`) }}
        </f-button>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import EventNames from '../event-names';

export default {
    components: {
        MegaModal,
        FButton
    },

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        errorCode: {
            type: String,
            default: ''
        }
    },

    methods: {
        handleButtonClick () {
            this.$emit(EventNames.CheckoutErrorDialogButtonClicked);
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-redirectButton {
    margin: spacing(x4) 0 spacing(x0.5);
}
</style>
