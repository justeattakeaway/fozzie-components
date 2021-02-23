<template>
    <main-banner-container
        data-test-id="main-banner-container"
        :base-hero-url="baseHeroUrl"
        :copy="copy"
        :locale="componentLocale" />
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import MainBannerContainer from './MainBannerContainer.vue';
import { BASE_HERO_URL } from '../constants';

export default {
    components: {
        MainBannerContainer
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            componentLocale: locale,
            copy: { ...localeConfig },
            baseHeroUrl: BASE_HERO_URL
        };
    }
};
</script>
