<template>
    <div>
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

        <br>

        <a
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
