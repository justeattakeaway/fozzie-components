<template>
    <!-- Confirmation Modal, displayed when a user selects "Copy Code" on a promotional content card -->
    <mega-modal
        :is-open="isOpen"
        is-narrow
        :data-test-id="testIds.modal"
        @close="close">
        <h3>{{ $t('authenticated.voucherCodeModal.title') }}</h3>
        <p v-html="$t('authenticated.voucherCodeModal.body')" /><!--eslint-disable-line vue/no-v-html-->
        <f-button
            v-if="hasLink"
            :href="url"
            :data-test-id="testIds.confirm">
            {{ $t('authenticated.voucherCodeModal.confirmButton') }}
        </f-button>
        <f-button
            :data-test-id="testIds.dismiss"
            @click="close">
            {{ $t('authenticated.voucherCodeModal.dismissButton') }}
        </f-button>
    </mega-modal>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import FButton from '@justeat/f-button';

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
    },

    methods: {
        close () {
            this.$emit('close-modal');
        }
    }
};
</script>
