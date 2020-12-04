<template>
    <div>
        <button-component
            :class="$style['c-checkout-allergyButton']"
            button-type="link"
            data-test-id="allergy-button"
            @click.native.prevent="showModal">
            <span
                class="u-showAboveMid"
                data-test-id="allergen-desktop-message">
                {{ $t('allergies.allergy') }}
            </span>

            <!-- <span
                class="u-showBelowMid"
                data-test-id="allergen-mobile-message">
                {{ $t('allergies.allergyTap') }}
            </span> -->
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
                :class="$style['o-btn-close']"
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
    $line-height: 16px;

    button.o-btn--allergy {
        padding: 0 spacing(x3);
        @include font-size(body-l);
        font-weight: $font-weight-bold;
        line-height: $line-height;
        margin: spacing() 0;
    }

    button.o-btn-close {
        margin: 0 auto;
        max-width: 400px;
    }

    .c-checkout-allergyButton {
        margin-top: spacing(x1.5);
    }
</style>
