<script>
export default {
    watch: {
        locale (newValue) {
            this.setupLocale(newValue, true);
        }
    },

    created () {
        this.initialiseLocalisation();
    },

    methods: {
        setupLocale (locale, applyLocale = false) {
            const localeConfig = this.tenantConfigs[locale];
            this.$i18n.setLocaleMessage(locale, { ...localeConfig });

            if (applyLocale) {
                this.$i18n.locale = locale;
            }
        },

        initialiseLocalisation () {
            const currentLocale = this.locale || this.$i18n.locale;
            const fallbackLocale = 'en-GB';

            this.setupLocale(currentLocale, true);
            this.setupLocale(fallbackLocale, false);
        }
    }
};
</script>
