<template>
    <div>
        <button-component
            :class="$style['c-checkout-allergyButton']"
            button-type="link"
            data-test-id="allergy-button"
            @click.native.prevent="showModal">
            <span
                :class="$style['u-showAboveMid']"
                data-test-id="allergen-desktop-message">
                {{ $t('allergies.allergy') }}
            </span>

            <span
                :class="$style['u-showBelowMid']"
                data-test-id="allergen-mobile-message">
                {{ $t('allergies.allergyTap') }}
            </span>
        </button-component>

        <mega-modal
            :is-open="shouldShowModal"
            has-overlay
            :has-close-button="false">
            <h3 class="u-noSpacing">
                {{ $t('allergies.allergenHeading') }}
            </h3>

            <allergen-mc-donalds-content v-if="!isMcDonalds" />

            <allergen-standard-content v-else />

            <button-component
                :class="$style['c-checkout-closeButton']"
                button-type="primary"
                data-test-id="allergy-modal-close-button"
                is-full-width
                @click.native.prevent="hideModal">
                {{ $t('allergies.allergenModalClose') }}
            </button-component>
        </mega-modal>
    </div>
</template>

<script>
import MegaModal from '@justeat/f-mega-modal';
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { mapState } from 'vuex';
import AllergenMcDonaldsContent from './AllergenMcDonaldsContent.vue';
import AllergenStandardContent from './AllergenStandardContent.vue';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
    components: {
        AllergenMcDonaldsContent, AllergenStandardContent, ButtonComponent, MegaModal
    },
    data () {
        return {
            tenantConfigs,
            shouldShowModal: false
        };
    },
    computed: {
        ...mapState('checkout', [
            'isMcDonalds'
        ])
    },
    methods: {
        /* TODO - Add tracking (separate ticket) */
        showModal () {
            this.shouldShowModal = true;
        },
        hideModal () {
            // this.pushAllergensInteraction('click_close');
            this.shouldShowModal = false;
        },
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },
        onModalOpen () {
            // this.pushAllergensInteraction('view_dialog');
        }
    }
};
</script>

<style lang="scss" module>
    .u-showAboveMid {
        @include media('<mid') {
            display: none !important;
        }
    }

    .u-showBelowMid {
        @include media('>=mid') {
            display: none !important;
        }
    }

    .c-checkout-allergyButton {
        margin-top: spacing(x2);
    }

    .c-checkout-closeButton {
        margin-top: spacing(x3);
    }
</style>
