<template>
    <div :class="$style['c-allergenAlert-standardContent-wrapper']">
        <p>{{ $t('allergies.mcDonaldsAllergy') }}</p>

        <a
            v-if="allergenUrl"
            :href="allergenUrl"
            :class="$style['c-allergenAlert--link']"
            data-test-id="allergen-url-link"
            target="_blank"
            rel="noopener"
            @click="onUrlClick">
            {{ $t('allergies.mcDonaldsReadMore') }}
        </a>

        <a
            v-if="allergenPhoneNumber"
            :href="$t('allergies.mcDonaldsNutritionUrl')"
            :class="$style['c-allergenAlert--link']"
            data-test-id="nutrition-url-link"
            target="_blank"
            rel="noopener"
            @click="onUrlClick">
            {{ $t('allergies.mcDonaldsNutritionInformation') }}
        </a>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import tenantConfigs from '../../tenants';

export default {
    data () {
        return {
            tenantConfigs
        };
    },
    computed: mapState('restaurant', [
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
    .c-allergenAlert-standardContent-wrapper {
        margin-bottom: spacing(x3);
    }

    .c-allergenAlert--link {
        display: block;
        text-decoration: none;
        margin-top: spacing(x3);

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
</style>
