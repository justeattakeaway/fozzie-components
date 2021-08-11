<script>
import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import { mapState, mapActions } from 'vuex';
import {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    MAP_ROUTE_TO_FEATURE_NAME,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
} from '../constants';

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
            'updatePlatformData',
            'updateUserData'
        ]),

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

            this.updatePlatformData(platformData);
        },

        prepareUserData (authToken) {
            const userData = { ...this.userData };

            userData['a-UserId'] = this.$cookies.get('je-auser') || undefined;

            if (authToken) {
                const tokenData = jwtDecode(authToken);

                userData.authType = tokenData?.is_new_registration ? GRANT_TYPES.registration : GRANT_TYPES[tokenData?.grant_type] || GRANT_TYPES.default;
                userData.email = tokenData?.email ? SHA256(tokenData?.email).toString() : undefined;
                userData.globalUserId = tokenData?.global_user_id || undefined;
                userData.signinType = tokenData?.role === IDENTITY_PROVIDERS.otac ? IDENTITY_PROVIDERS.otac || IDENTITY_PROVIDERS[tokenData?.idp] : IDENTITY_PROVIDERS.default;
                userData.signupDate = tokenData?.created_date || undefined;
            }

            this.updateUserData(userData);
        },

        pushAnalytics () {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({
                platformData: { ...this.platformData },
                userData: { ...this.userData }
            });
        }
    }
};
</script>
