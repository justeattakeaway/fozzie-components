<script>
import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import { mapState, mapActions } from 'vuex';
import {
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
            'userData',
            'pageData'
        ]),

        isServerSide () {
            return typeof (window) === 'undefined';
        },

        isDataLayerPresent () {
            return typeof (window) !== 'undefined' && window.dataLayer;
        }
    },

    methods: {
        ...mapActions('f-analytics', [
            'updatePageData'
        ]),

        pushUserData (authToken) {
            const userData = { ...this.userData };

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

            if (this.isDataLayerPresent) {
                window.dataLayer.push({ userData: { ...userData } });
            }
        },

        pushPageData ({ conversationId = '', requestId = '', authToken = undefined } = {}) {
            const pageData = { ...this.pageData };

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

            if (this.isDataLayerPresent) {
                window.dataLayer.push({ pageData: { ...this.pageData } });
            }
        }
    }
};
</script>
