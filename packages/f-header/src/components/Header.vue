<template>
    <header
        :data-theme="theme"
        class="c-header">
        <skip-to-main
            :text="copy.skipToMainContentText"
            :transparent-bg="isTransparent" />
        <logo
            :theme="theme"
            :is-transparent="isTransparent"
            :company-name="copy.companyName" />
    </header>
</template>

<script>
import Logo from './Logo.vue';
import SkipToMain from './SkipToMain.vue';
import tenantConfigs from '../tenants';
import sharedService from '../../../shared.service';

export default {
    name: 'VueHeader',
    components: {
        Logo,
        SkipToMain
    },
    props: {
        locale: {
            type: String,
            required: false,
            default: ''
        },
        isTransparent: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        const locale = sharedService.getLocale(tenantConfigs, this.locale, this.$118n);
        const localeConfig = tenantConfigs[locale];
        const theme = sharedService.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};
</script>

<style lang="scss">
</style>
