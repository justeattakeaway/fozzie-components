<template>
    <header
        :data-theme="theme"
        class="c-header">
        <skip-to-main
            :skip-to-main-content-text="copy.skipToMainContentText"
            :extra-classes="[isTransparent ? 'c-skipTo--whiteLink' : '']" />
        <logo
            :theme="theme"
            :is-transparent="isTransparent"
            :company-name="copy.companyName" />
    </header>
</template>

<script>
import Logo from './Logo.vue';
import tenantConfigs from '../tenants';
import SkipToMain from './SkipToMain.vue';

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
            required: true
        }
    },
    data () {
        const locale = this.getLocale();
        const localeConfig = tenantConfigs[locale];
        const theme = this.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
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
