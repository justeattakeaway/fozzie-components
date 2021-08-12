<script>
import { mapState, mapActions } from 'vuex';
import {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    MAP_ROUTE_TO_FEATURE_NAME
} from '@/constants';

export default {
    computed:
    {
        ...mapState('f-analytics', [
            'platformData',
            'userData'
        ]),

        isServerSide () {
            return typeof (window) === 'undefined';
        }
    },

    created () {
        this.prepareServersideAnalytics();
    },

    methods: {
        ...mapActions('f-analytics', [
            'pushPlatformData',
            'pushUserData'
        ]),

        prepareServersideAnalytics () {
            if (this.isServerSide) {
                // Only available serverside
                const platformData = { ...this.platformData };

                if (process.env.justEatEnvironment) platformData.environment = process.env.justEatEnvironment;
                if (process.env.FEATURE_VERSION) platformData.version = process.env.FEATURE_VERSION;
                if (process.env.INSTANCE_POSITION) platformData.instancePosition = process.env.INSTANCE_POSITION;

                // TODO - Read manually to reduce need on global '$cookies'
                if (this.$cookies) {
                    // This cookie is marked as `httponly` so need to read serverside
                    const value = this.$cookies.get('je-user_percentage');
                    if (value) platformData.jeUserPercentage = value;
                }

                this.pushPlatformData(platformData);
            }
        },

        preparePlatformData () {
            const platformData = { ...this.platformData };

            platformData.name = MAP_ROUTE_TO_FEATURE_NAME[this.$route.name] || this.$route.name;
            platformData.appType = DEFAULT_APP_TYPE;
            platformData.applicationId = DEFAULT_APP_ID;
            platformData.userAgent = navigator.userAgent || 'N/A';
            platformData.branding = COUNTRY_INFO[this.$i18n.locale].brand;
            platformData.country = COUNTRY_INFO[this.$i18n.locale].country;
            platformData.language = COUNTRY_INFO[this.$i18n.locale].language;
            platformData.currency = COUNTRY_INFO[this.$i18n.locale].currency;

            this.pushPlatformData(platformData);
        }
    }
};
</script>
