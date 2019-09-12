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
        const locale = this.getLocale();
        const localeConfig = tenantConfigs[locale];
        const theme = this.getTheme(locale);
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
    },
    methods: {
        getLocale () {
            let locale = this.locale || (this.$i18n ? this.$i18n.locale : null); // use prop, or the i18n locale value set

            // if the locale is either
            // a) not set
            // or b) set to a country code that this component does not recognise
            // it will be set to 'en-GB'
            if (!tenantConfigs[locale]) {
                locale = 'en-GB';
            }
            return locale;
        },
        getTheme (locale) {
            switch (locale) {
                case 'en-AU':
                case 'en-NZ':
                    return 'ml';
                default:
                    return 'je';
            }
        }
    }
};
</script>

<style lang="scss">
</style>
