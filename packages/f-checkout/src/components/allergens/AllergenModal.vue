<template>
    <div>
        <button
            :class="[
                $style['o-btn--allergy'],
                'o-btnLink'
            ]"
            data-test-id="allergy-button"
            @click.prevent="showModal">
            <span
                class="u-showAboveMid"
                data-test-id="allergen-desktop-message">
                {{ copy.allergies.allergy }}
            </span>

            <span
                class="u-showBelowMid"
                data-test-id="allergen-mobile-message">
                {{ copy.allergies.allergyTap }}
            </span>
        </button>

        <mega-modal
            :is-open="shouldShowModal"
            has-overlay
            :has-close-button="false">
            <h3 class="u-noSpacing">
                {{ copy.allergies.allergenHeading }}
            </h3>

            <div v-if="isMcDonalds">
                <p>{{ copy.allergies.mcDonaldsAllergy }}</p>

                <a
                    :href="allergenUrl"
                    :class="$style['c-allergenAlert--link']"
                    data-test-id="allergen-url-link"
                    target="_blank"
                    rel="noopener"
                    @click="onUrlClick">
                    {{ copy.allergies.mcDonaldsReadMore }}
                </a>

                <br>

                <a
                    :href="copy.allergies.mcDonaldsNutritionUrl"
                    :class="$style['c-allergenAlert--link']"
                    data-test-id="nutrition-url-link"
                    target="_blank"
                    rel="noopener"
                    @click="onUrlClick">
                    {{ copy.allergies.mcDonaldsNutritionInformation }}
                </a>
            </div>
            <div v-else>
                <p v-if="hasPhoneNumberAndAllergenUrl">
                    {{ copy.allergies.phoneNumberAndUrl }}
                    <!-- <template #number> -->
                    <allergen-phone-number-link @handleClick="onPhoneClick" />
                    <!-- </template> -->
                    <!-- <template #readMoreUrl> -->
                    <allergen-url-link @handleClick="onUrlClick" />
                <!-- </template> -->
                </p>

                <p v-else-if="hasPhoneNumberOnly">
                    {{ copy.allergies.phoneNumberOnly }}
                    <!-- <template #number> -->
                    <allergen-phone-number-link @handleClick="onPhoneClick" />
                <!-- </template> -->
                </p>

                <p v-else-if="hasAllergenUrlOnly">
                    {{ copy.allergies.urlOnly }}
                    <!-- <template #readMoreUrl> -->
                    <allergen-url-link @handleClick="onUrlClick" />
                <!-- </template> -->
                </p>

                <p v-else>
                    {{ copy.allergies.noPhoneNumberAndNoUrl }}
                </p>
            </div>

            <button
                type="button"
                class="o-btn o-btn--primary o-btn--block o-btn--rounded"
                :class="$style['o-btn-close']"
                @click="onModalClose">
                {{ copy.allergies.allergenModalClose }}
            </button>
        </mega-modal>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import MegaModal from '@justeat/f-mega-modal';
import AllergenPhoneNumberLink from './AllergenPhoneNumberLink.vue';
import AllergenUrlLink from './AllergenUrlLink.vue';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
    components: { MegaModal, AllergenPhoneNumberLink, AllergenUrlLink },
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);
        return {
            copy: { ...localeConfig },
            theme,
            shouldShowModal: false,
            allergenPhoneNumber: null,
            allergenUrl: null,
            isMcDonalds: false
        };
    },
    computed: {
        // ...mapState('restaurantInfo', [
        //     'allergenPhoneNumber',
        //     'allergenUrl'
        // ]),
        contactMethod () {
            const phone = this.allergenPhoneNumber ? 'phone' : 'nophone';
            const url = this.allergenUrl ? 'url' : 'nourl';
            return `${phone}_${url}`;
        },
        hasPhoneNumberAndAllergenUrl () {
            return this.contactMethod === 'phone_url';
        },
        hasPhoneNumberOnly () {
            return this.contactMethod === 'phone_nourl';
        },
        hasAllergenUrlOnly () {
            return this.contactMethod === 'nophone_url';
        }
    },
    methods: {
        showModal () {
            this.shouldShowModal = true;
        },
        onModalClose () {
            // this.pushAllergensInteraction('click_close');
            this.shouldShowModal = false;
        },
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },
        onPhoneClick () {
            // this.pushAllergensInteraction('click_phone');
        },
        onUrlClick () {
            // this.pushAllergensInteraction('click_url');
        },
        onModalOpen () {
            // this.pushAllergensInteraction('view_dialog');
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
    .c-allergenAlert--link {
        display: inline-block;
        text-decoration: none;
        &:hover,
        &:focus {
            text-decoration: underline;
        }
        &:first-of-type {
            margin: spacing(x3) 0 spacing(x1.5);
        }
        &:last-of-type {
            margin: spacing(x1.5) 0 spacing(x3);
        }
    }
</style>
