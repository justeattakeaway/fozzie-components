<script>
export default {
    name: 'GlobalisationMixin',
    props: {
        /*
            When locale is specified, it will be set as the current locale within i18n
            When not specified, the existing locale within i18n will be used
        */
        locale: {
            type: String,
            default: ''
        }
    },

    watch: {
        // Detect changes within the locale prop - load the language and set i18n locale
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

            if (!locale || !localeConfig) return;

            this.$i18n.setLocaleMessage(locale, localeConfig.messages);
            this.$i18n.setDateTimeFormat(locale, localeConfig.dateTimeFormats);

            if (applyLocale) {
                this.$i18n.locale = locale;
            }
        },

        initialiseLocalisation () {
            const currentLocale = this.locale || this.$i18n.locale;
            const fallbackLocale = 'en-GB';

            // If no locale passed do not set up locale.
            if (this.locale) {
                this.setupLocale(currentLocale, true);
            }

            // Don't load messages for en-GB twice
            if (currentLocale !== fallbackLocale) {
                this.setupLocale(fallbackLocale, false);
            }
        }
    }
};
</script>
