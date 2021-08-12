<script>
import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import { mapState, mapActions } from 'vuex';
import {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
} from '../constants';
import {
    getDisplaySize,
    getOrientation,
    mapRouteToGroup,
    mapRouteToFeature
} from '../utils/helpers';

export default {
    computed:
    {
        ...mapState('f-analytics', [
            'platformData',
            'userData',
            'pageData'
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
            'updateUserData',
            'updatePageData'
        ]),

        prepareServersideAnalytics () {
            if (this.isServerSide) {
                // Only available serverside
                const platformData = { ...this.platformData };
                const pageData = { ...this.pageData };

                platformData.environment = process.env.justEatEnvironment || 'localhost';
                platformData.version = process.env.FEATURE_VERSION || '0.0.0.0';
                platformData.instancePosition = process.env.INSTANCE_POSITION || 'N/A';
                // Is of type `httponly` so need to read serverside
                platformData.jeUserPercentage = this.$cookies.get('je-user_percentage') || null;

                pageData.httpStatusCode = this.$ssrContext?.res?.statusCode || 0;

                this.updatePlatformData(platformData);
                this.updatePageData(pageData);
            }
        },

        preparePlatformData () {
            const platformData = { ...this.platformData };

            platformData.name = mapRouteToFeature(this.$route.name);
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

        preparePageData ({ conversationId = '', requestId = '', authToken = undefined } = {}) {
            const pageData = {
                ...this.pageData
            };

            pageData.group = mapRouteToGroup(this.$route.name);
            pageData.name = mapRouteToFeature(this.$route.name);

            if (pageData.name === 'Checkout 1 Overview' && !authToken) {
                pageData.name = 'Checkout 1 Guest';
            }

            pageData.isCached = false;
            pageData.conversationId = conversationId;
            pageData.requestId = requestId;

            if (!this.isServerSide) {
                pageData.display = getDisplaySize();
                pageData.orientation = getOrientation();
            }

            this.updatePageData(pageData);
        },

        pushAnalytics () {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({
                platformData: { ...this.platformData },
                userData: { ...this.userData },
                pageData: { ...this.pageData }
            });
        }
    }
};
</script>
