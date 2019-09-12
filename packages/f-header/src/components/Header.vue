<template>
    <header
        v-if="copy"
        :data-theme="theme"
        class="c-header">
        <skip-to-main
            :text="copy.skipToMainContentText"
            :transparent-bg="isTransparent" />
        <logo
            :theme="theme"
            :is-transparent="isTransparent"
            :company-name="copy.companyName"
            :logo-gtm-label="copy.logo.gtm" />
        <navigation
            :user-info="user"
            :nav-links="copy.navLinks"
            :help="copy.help"
            :account-logout="copy.accountLogout"
            :account-login="copy.accountLogin"
            :open-menu-text="copy.openMenuText" />
    </header>
</template>

<script>
import Logo from './Logo.vue';
import Navigation from './Navigation.vue';
import SkipToMain from './SkipToMain.vue';
import tenantConfigs from '../tenants';
import sharedService from '../../../shared.servive';

export default {
    name: 'VueHeader',
    components: {
        Logo,
        SkipToMain,
        Navigation
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
        const locale = sharedService.getLocale(this.tenantConfigs, this.locale, this.$118n);
        const localeConfig = tenantConfigs[locale];
        const theme = sharedService.getTheme(locale);
        const user = {
            isAuthenticated: true,
            friendlyName: 'John Doe',
            email: 'john.doe@example.com'
        };

        return {
            copy: { ...localeConfig },
            theme,
            user
        };
    }
};
</script>

<style lang="scss">
</style>
