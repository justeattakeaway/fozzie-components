<template>
    <mega-modal
        ref="errorModal"
        data-test-id="checkout-issue-modal"
        has-overlay
        :title="$t(`errorMessages.checkoutIssues.${messageKey}.title`, { serviceType: serviceTypeText })"
        :is-open="isOpen"
        @close="closeErrorDialog">
        <p data-test-id="checkout-issue-modal-message">
            {{ $t(`errorMessages.checkoutIssues.${messageKey}.message`, { serviceType: serviceTypeText }) }}
        </p>

        <div>
            <f-button
                :class="$style['c-checkout-errorDialogButton']"
                :data-gtm="isDuplicateOrderError ? 'engagement|dialog_duplicate_order_warning|click_acknowledge' : undefined"
                button-size="large"
                :button-type="isDuplicateOrderError ? 'secondary' : 'primary'"
                data-test-id="redirect-to-menu-button"
                @click.native="closeErrorDialog">
                {{ $t(`errorMessages.checkoutIssues.${messageKey}.buttonText`) }}
            </f-button>

            <f-button
                v-if="isDuplicateOrderError"
                :class="$style['c-checkout-errorDialogButton']"
                button-size="large"
                button-type="primary"
                data-test-id="redirect-to-orderhistory-button"
                data-gtm="engagement|dialog_duplicate_order_warning|click_view_orders"
                @click.native="showOrderHistory">
                {{ $t(`errorMessages.checkoutIssues.${messageKey}.buttonTextPrimary`) }}
            </f-button>
        </div>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapActions, mapState } from 'vuex';
import { DUPLICATE_ORDER, NOTE_NOT_ACCEPTED_SUFFIX, VUEX_CHECKOUT_MODULE } from '../constants';
import EventNames from '../event-names';

export default {
    components: {
        FButton,
        MegaModal
    },

    props: {
        redirectUrl: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            isOpen: true
        };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'checkoutErrorMessage',
            'restaurant',
            'serviceType'
        ]),

        messageKey () {
            return this.checkoutErrorMessage?.messageKey;
        },

        serviceTypeText () {
            return this.$t(`serviceTypes.${this.serviceType}`);
        },

        isDuplicateOrderError () {
            return this.messageKey === DUPLICATE_ORDER;
        }
    },

    mounted () {
        const modalContext = this.getModalContext();

        if (modalContext) {
            modalContext.open();
        }

        this.$emit('created', {
            code: this.checkoutErrorMessage?.messageKey,
            isDuplicateOrderError: this.isDuplicateOrderError
        });
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCheckoutErrorMessage'
        ]),

        getModalContext () {
            const { errorModal } = this.$refs;
            const { megaModal } = errorModal.$refs;

            return megaModal ? errorModal : null;
        },

        closeErrorDialog () {
            const modalContext = this.getModalContext();

            if (this.checkoutErrorMessage && this.checkoutErrorMessage.shouldRedirectToMenu) {
                window.location.assign(this.redirectUrl);
            }

            if (this.checkoutErrorMessage?.messageKey?.includes(NOTE_NOT_ACCEPTED_SUFFIX)) {
                this.$emit(EventNames.NoteNotAccepted);
            }

            this.updateCheckoutErrorMessage();

            if (modalContext) {
                modalContext.close();
            }
        },

        showOrderHistory () {
            window.location.assign('order-history');

            this.updateCheckoutErrorMessage();
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-errorDialogButton {
    margin: spacing(f) spacing(c) spacing(a);
}
</style>
