<template>
    <mega-modal
        ref="errorModal"
        data-test-id="checkout-issue-modal"
        has-overlay
        :title="$t(`errorMessages.checkoutIssues.${errorCode}.title`, { serviceType: serviceTypeText })"
        :is-open="isOpen"
        @close="closeErrorDialog"
    >
        <p data-test-id="checkout-issue-modal-message">
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.message`, { serviceType: serviceTypeText }) }}
        </p>

        <f-button
            :class="$style['c-checkout-errorDialogButton']"
            :data-gtm="isDuplicateOrderError ? 'engagement|dialog_duplicate_order_warning|click_acknowledge' : undefined"
            button-size="large"
            :button-type="isDuplicateOrderError ? 'secondary' : 'primary'"
            data-test-id="redirect-to-menu-button"
            @click.native="closeErrorDialog"
        >
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.buttonText`) }}
        </f-button>

        <f-button
            v-if="isDuplicateOrderError"
            :class="$style['c-checkout-errorDialogButton']"
            button-size="large"
            button-type="primary"
            data-test-id="redirect-to-orderhistory-button"
            data-gtm="engagement|dialog_duplicate_order_warning|click_view_orders"
            @click.native="showOrderHistory"
        >
            {{ $t(`errorMessages.checkoutIssues.${errorCode}.buttonTextPrimary`) }}
        </f-button>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapActions, mapState } from 'vuex';
import { VUEX_CHECKOUT_MODULE } from '../constants';

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
            'message',
            'restaurant',
            'serviceType'
        ]),

        errorCode () {
            return this.message && this.message.code;
        },

        serviceTypeText () {
            return this.$t(`serviceTypes.${this.serviceType}`);
        },

        isDuplicateOrderError () {
            return this.errorCode === 'DuplicateOrder';
        }
    },

    mounted () {
        const modalContext = this.getModalContext();

        if (modalContext) {
            modalContext.open();
        }

        this.$emit('created', {
            code: this.message?.code,
            isDuplicateOrderError: this.isDuplicateOrderError
        });
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateMessage'
        ]),

        getModalContext () {
            const { errorModal } = this.$refs;
            const { megaModal } = errorModal.$refs;

            return megaModal ? errorModal : null;
        },

        closeErrorDialog () {
            const modalContext = this.getModalContext();

            if (this.message && this.message.shouldRedirectToMenu) {
                window.location.assign(this.redirectUrl);
            }

            this.updateMessage();

            if (modalContext) {
                modalContext.close();
            }
        },

        showOrderHistory () {
            window.location.assign('order-history');

            this.updateMessage();
        }
    }
};

</script>

<style lang="scss" module>
.c-checkout-errorDialogButton {
    margin: spacing(x4) spacing(x1.5) spacing(x0.5);
}
</style>
