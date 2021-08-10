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
        },

        prepareUserData (authToken) {
            const userData = { ...this.userData };

            userData['a-UserId'] = undefined;
            // TODO - Read manually to reduce need on global '$cookies'
            if (this.$cookies) {
                const value = this.$cookies.get('je-auser');
                if (value) userData['a-UserId'] = value;
            }

            if (authToken) {
                const tokenData = jwtDecode(authToken);

                userData.authType = tokenData?.is_new_registration ? GRANT_TYPES.registration : GRANT_TYPES[tokenData?.grant_type] || GRANT_TYPES.default;
                userData.email = tokenData?.email ? SHA256(tokenData?.email).toString() : undefined;
                userData.globalUserId = tokenData?.global_user_id || undefined;
                userData.signinType = tokenData?.role === IDENTITY_PROVIDERS.otac ? IDENTITY_PROVIDERS.otac || IDENTITY_PROVIDERS[tokenData?.idp] : IDENTITY_PROVIDERS.default;
                userData.signupDate = tokenData?.created_date || undefined;
            }

            this.pushUserData(userData);
        }
    }
};
</script>
