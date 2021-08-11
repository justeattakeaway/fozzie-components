<template>
    <!-- Confirmation Modal, displayed when a user selects "Copy Code" on a promotional content card -->
    <mega-modal
        :is-open="isOpen"
        is-narrow
        :data-test-id="testIds.modal"
        @close="closeModal"
    >
        <h3>{{ $t('offersInbox.voucherCodeModal.title') }}</h3>
        <p v-html="$t('offersInbox.voucherCodeModal.body')" />
        <a
            v-if="hasLink"
            :href="url"
            :data-test-id="testIds.confirm"
            class="o-btn o-btn--primary o-btn--block o-btn--rounded"
        >
            {{ $t('offersInbox.voucherCodeModal.confirmButton') }}
        </a>
        <button
            type="button"
            class="o-btn o-btn--tertiary o-btn--block"
            :data-test-id="testIds.dismiss"
            @click="closeModal"
        >
            {{ $t('offersInbox.voucherCodeModal.dismissButton') }}
        </button>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';

export default {
    components: {
        MegaModal
    },

    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        closeModal: {
            type: Function,
            default: () => {}
        },
        url: {
            type: String,
            default: ''
        },
        testIds: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        /**
         * Returns true if the url prop is truthy in order to determine whether the modal should
         * display an ongoing url link
         *
         * @returns {boolean}
         */
        hasLink () {
            return !!this.url;
        }
    }
};
</script>
