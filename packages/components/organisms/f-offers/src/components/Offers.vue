<template>
    <div
        :class="$style['c-offers']"
        data-test-id="offers">
        <offers-header />
        <div :class="$style['c-offers-wrapper']">
            <offers-results v-if="isAuthenticated" />
            <unauthenticated v-else />
            <no-offers-found />
        </div>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import { mapActions, mapGetters } from 'vuex';
import tenantConfigs from '../tenants';
import NoOffersFound from './NoOffersFound.vue';
import Unauthenticated from './Unauthenticated.vue';
import '@justeat/f-searchbox/dist/f-searchbox.css';
import OffersHeader from './Header.vue';
import OffersResults from './Results.vue';
import { ACTION_INITIALISE_OFFERS, VUEX_MODULE_NAMESPACE_OFFERS } from '../store/types';
import offers from '../store/offers.module';

const TIMEOUT = 3000;

export default {
    name: 'VOffers',

    components: {
        NoOffersFound,
        OffersHeader,
        OffersResults,
        Unauthenticated
    },

    mixins: [
        VueGlobalisationMixin
    ],

    props: {
        getOffersUrl: {
            type: String,
            default: undefined
        },
        authToken: {
            type: String,
            default: undefined
        },
        brazeApiKey: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        ...mapGetters(VUEX_MODULE_NAMESPACE_OFFERS, [
            'isAuthenticated'
        ])
    },

    /**
     * Set up the offers vuex module
    */
    beforeCreate () {
        if (!this.$store.hasModule(VUEX_MODULE_NAMESPACE_OFFERS)) {
            this.$store.registerModule(VUEX_MODULE_NAMESPACE_OFFERS, offers);
        }
    },

    /**
     * Initialise the offers module by passing in the required values from props
     */
    async mounted () {
        await this.init({
            url: this.getOffersUrl,
            timeout: TIMEOUT,
            brazeApiKey: this.brazeApiKey,
            authToken: this.authToken
        });
    },

    methods: {
        ...mapActions(VUEX_MODULE_NAMESPACE_OFFERS, {
            init: ACTION_INITIALISE_OFFERS
        })
    }
};
</script>

<style lang="scss" module>

.c-offers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: auto;
    background-color: $color-grey-10;
}

.c-offers-wrapper {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: 0 auto;
    padding: #{$layout-margin}px;

    @include media('<mid') {
        padding: #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding: #{$layout-margin--narrow}px;
    }
}

</style>
