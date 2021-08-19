<script>
import { mapState, mapActions } from 'vuex';
import {
    getDisplaySize,
    getOrientation,
    mapRouteToGroup,
    mapRouteToFeature
} from '@/utils/helpers';

export default {
    computed:
    {
        ...mapState('f-analytics', [
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
