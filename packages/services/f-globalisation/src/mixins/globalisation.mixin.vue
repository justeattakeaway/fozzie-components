<script>
export default {
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

            // Merge new locale messages with existing ones - prioritising new ones
            this.$i18n.setLocaleMessage(locale, {
                ...this.$i18n.messages[locale],
                ...localeConfig.messages
            });

            this.$i18n.setDateTimeFormat(locale, localeConfig.dateTimeFormats);

            if (applyLocale) {
                this.$i18n.locale = locale;
            }
        },

        initialiseLocalisation () {
            const currentLocale = this.locale || this.$i18n.locale;
            const fallbackLocale = 'en-GB';

            this.setupLocale(currentLocale, true);

            // Don't load messages for en-GB twice
            if (currentLocale !== fallbackLocale) {
                this.setupLocale(fallbackLocale, false);
            }
        }
    }
};
</script>
