<template>
    <div>
        <header-component
            data-test-id="header-component"
            :locale="componentLocale"
            :is-transparent="true" />

        <main-banner-container
            data-test-id="main-banner-container"
            :base-hero-url="baseHeroUrl"
            :copy="copy"
            :locale="componentLocale" />

        <footer-component
            data-test-id="footer-component"
            :locale="componentLocale" />
    </div>
</template>

<script>
import HeaderComponent from '@justeat/f-header';
import '@justeat/f-header/dist/f-header.css';
import FooterComponent from '@justeat/f-footer';
import '@justeat/f-footer/dist/f-footer.css';
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import MainBannerContainer from './MainBannerContainer.vue';
import { BASE_HERO_URL } from '../constants';

export default {
    components: {
        HeaderComponent,
        FooterComponent,
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

<style lang="scss" module>


</style>
