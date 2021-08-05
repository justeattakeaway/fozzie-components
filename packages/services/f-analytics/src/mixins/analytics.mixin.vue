<script>
import { mapState, mapActions } from 'vuex';
import {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    MAP_ROUTE_TO_FEATURE_NAME
} from '../constants';
import {
    getDisplaySize,
    getOrientation,
    mapRouteToGroup,
    mapRouteToFeature
} from '../utils/helpers';

export default {
    name: 'Analytics',

    computed: {
        ...mapState('f-analytics', ['platformData', 'pageData']),

        isServerSide () {
            return typeof (window) === 'undefined';
        }
    },

    watch: {
        $route () {
            this.prepareAnalytics();
            this.pushAnalytics();
        }
    },

    created () {
        this.prepareServersideAnalytics();
    },

    mounted () {
        this.prepareAnalytics();
        this.pushAnalytics();
    },

    methods: {
        ...mapActions('f-analytics', ['updatePlatformData', 'updatePageData']),

        prepareServersideAnalytics () {
            if (this.isServerSide) {
                // Only available serverside
                const platformData = { ...this.platformData };
                platformData.environment = process.env.justEatEnvironment || 'localhost';
                platformData.version = process.env.FEATURE_VERSION || '0.0.0.0';
                platformData.instancePosition = process.env.INSTANCE_POSITION || 'N/A';

                // Is of type `httponly` so need to read serverside
                platformData.jeUserPercentage = this.$cookies.get('je-user_percentage') || null;

                this.updatePlatformData(platformData);
            }
        },

        prepareAnalytics () {
            const platformData = { ...this.platformData };

            platformData.name = MAP_ROUTE_TO_FEATURE_NAME[this.$route.name] || this.$route.name;
            platformData.appType = DEFAULT_APP_TYPE;
            platformData.applicationId = DEFAULT_APP_ID;
            platformData.userAgent = navigator.userAgent || 'N/A';
            platformData.branding = COUNTRY_INFO[this.$i18n.locale].brand;
            platformData.country = COUNTRY_INFO[this.$i18n.locale].country;
            platformData.language = COUNTRY_INFO[this.$i18n.locale].language;
            platformData.currency = COUNTRY_INFO[this.$i18n.locale].currency;

            this.updatePlatformData(platformData);

            this.preparePageData();
        },

        // TODO: pass auth, conversationid etc...
        preparePageData () {
            const pageData = {
                ...this.pageData,
                group: mapRouteToGroup(this.$route.name),
                name: mapRouteToFeature(this.$route.name)
            };

            pageData.httpStatusCode = 0;
            pageData.isCached = false;
            pageData.conversationId = '';
            pageData.requestId = '';

            // TODO: process.client & update tests
            pageData.display = getDisplaySize();
            pageData.orientation = getOrientation();

            this.updatePageData(pageData);
        },

        pushAnalytics () {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({ platformData: { ...this.platformData } });
        }
    }
};
</script>
