<script>
import { mapState, mapActions } from 'vuex';
import fAnalyticsModule from '../store/analyticsModule';

export default {
    name: 'Analytics',

    computed:
    {
        ...mapState('fAnalyticsModule', ['platformData']),

        getGtmSettings () {
            return this.gtmSettings || { id: 'GTM-XXXXXXX' };
        },

        isServerSide () {
            return typeof (window) === 'undefined';
        }
    },

    created () {
        this.registerStoreModule();
        this.prepareServersideAnalytics();
    },

    mounted () {
        this.preparePage();
        this.prepareAnalytics();
        this.pushAnalytics();
    },

    methods: {
        ...mapActions('fAnalyticsModule', ['updatePlatformData']),

        registerStoreModule () {
            if (!this.$store.hasModule('fAnalyticsModule')) {
                this.$store.registerModule('fAnalyticsModule', fAnalyticsModule);
            }
        },

        prepareServersideAnalytics () {
            if (this.isServerSide) {
                // Only available serverside
                const platformData = { ...this.platformData };

                platformData.environment = process.env.justEatEnvironment || 'localhost';
                platformData.version = process.env.FEATURE_VERSION || '0.0.0.0';
                platformData.instancePosition = process.env.INSTANCE_POSITION || 'N/A';

                // Is of type `httponly` so need to read serverside
                platformData.jeUserPercentage = this.$cookies.get('je-user_percentage') || 0;

                this.updatePlatformData(platformData);
            }
        },

        preparePage () {
            if (!window.dataLayer) {
                const queryString = (this.getGtmSettings.auth !== undefined)
                    ? `&gtm_auth=${this.getGtmSettings.auth}&gtm_preview=${this.getGtmSettings.preview}&gtm_cookies_win=${this.getGtmSettings.cookiesWin}`
                    : '';

                // See : https://developers.google.com/tag-manager/quickstart
                const headJsGtmTag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl${queryString};f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${this.getGtmSettings.id}');`;
                const script = document.createElement('script');
                script.text = headJsGtmTag;
                document.head.prepend(script);

                const iframeTag = document.createElement('iframe');
                iframeTag.src = `https://www.googletagmanager.com/ns.html?id=${this.getGtmSettings.id}`;
                iframeTag.setAttribute('height', 0);
                iframeTag.setAttribute('width', 0);
                iframeTag.style.display = 'none';
                iframeTag.style.visibility = 'hidden';
                const noScript = document.createElement('noscript');
                noScript.appendChild(iframeTag);
                document.body.prepend(noScript);
            }
        },

        prepareAnalytics () {
            const platformData = { ...this.platformData };

            platformData.name = this.$route.name;
            platformData.appType = 'web';
            platformData.applicationId = 7;
            platformData.userAgent = navigator.userAgent || 'N/A';
            platformData.branding = this.getBrand(this.$i18n.locale);
            platformData.country = this.getCountry(this.$i18n.locale);
            platformData.language = this.getLanguage(this.$i18n.locale);
            platformData.currency = this.getCurrency(this.$i18n.locale);

            this.updatePlatformData(platformData);
        },

        pushAnalytics () {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({ platformData: { ...this.platformData } });
        },

        getLanguage (locale) {
            switch (locale) {
                case 'it-IT':
                    return 'it';
                case 'es-ES':
                    return 'es';
                default:
                    return 'en';
            }
        },

        getCountry (locale) {
            switch (locale) {
                case 'en-GB':
                    return 'uk';
                case 'en-IE':
                    return 'ie';
                case 'it-IT':
                    return 'it';
                case 'es-ES':
                    return 'es';
                case 'en-AU':
                    return 'au';
                case 'en-NZ':
                    return 'nz';
                default:
                    return '';
            }
        },

        getBrand (locale) {
            switch (locale) {
                case 'en-AU':
                case 'en-NZ':
                    return 'menulog';
                default:
                    return 'justeat';
            }
        },

        getCurrency (locale) {
            switch (locale) {
                case 'en-GB':
                    return 'gbp';
                case 'en-AU':
                    return 'aud';
                case 'en-NZ':
                    return 'nzd';
                default:
                    return 'eur';
            }
        }
    }
};
</script>
