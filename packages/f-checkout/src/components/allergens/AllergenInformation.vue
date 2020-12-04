<template>
    <div :class="$style['c-allergen-linkButton']">
        <button-component
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

            <allergen-mc-donalds-content v-if="isMcDonalds" />

            <allergen-standard-content v-else />

            <button-component
                :class="$style['c-allergen-closeButton']"
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
import { mapGetters } from 'vuex';
import AllergenMcDonaldsContent from './AllergenMcDonaldsContent.vue';
import AllergenStandardContent from './AllergenStandardContent.vue';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';
import { ALLERGEN_COOKIE_NAME } from '../../constants';

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
        ...mapGetters('restaurant', [
            'isMcDonalds'
        ]),

        isAllergenCookiePresent () {
            return this.$cookies.get(ALLERGEN_COOKIE_NAME) === 1;
        }
    },
    mounted () {
        if (this.isAllergenCookiePresent) {
            this.showModal();
        }
    },
    methods: {
        /* TODO - Add tracking (separate ticket) */
        showModal () {
            this.shouldShowModal = true;

            this.setAllergenCookie();
        },

        hideModal () {
            // this.pushAllergensInteraction('click_close');
            this.shouldShowModal = false;
        },

        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },

        setAllergenCookie () {
            this.$cookies.set(ALLERGEN_COOKIE_NAME, 1);
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

    .c-allergen-linkButton {
        margin-top: spacing(x1.5);
    }

    .c-allergen-closeButton {
        margin-top: spacing(x3);
    }
</style>
