<template>
    <div>
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
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { mapState } from 'vuex';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
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
            theme
        };
    },
    computed: mapState('checkout', [
        'allergenPhoneNumber',
        'allergenUrl'
    ]),
    methods: {
        /* TODO - Add tracking (separate ticket) */
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },
        onUrlClick () {
            // this.pushAllergensInteraction('click_url');
        }
    }
};
</script>

<style lang="scss" module>
    $line-height: 16px;
    .c-allergenAlert-standardContent-wrapper {
        margin: spacing(x3) 0;
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
