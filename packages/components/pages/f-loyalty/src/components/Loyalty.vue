<template>
    <div role="main">
        <div
            v-if="showLoyaltyNavigationElements"
            :class="$style['c-loyalty']"
            data-test-id="loyalty">
            <loyalty-header />
            <div
                :class="$style['c-loyalty-tabs']">
                <tabs :animate="shouldAnimate">
                    <tab
                        name="stamp-cards"
                        :title="$t('tabs.stamps.title')"
                        :selected="!showHowItWorks"
                    >
                        <loyalty-cards
                            v-if="isAuthenticated"
                            data-test-id="StampCards-StampCardsTab-AuthedContent" />
                        <unauthenticated
                            v-else
                            data-test-id="StampCards-StampCardsTab-UnauthContent" />
                    </tab>
                    <tab
                        name="how-it-works"
                        :selected="showHowItWorks"
                        :title="$t('tabs.howItWorks.title')">
                        <how-it-works data-test-id="StampCards-HowItWorksTab-Content" />
                    </tab>
                </tabs>
            </div>
        </div>
        <div
            v-else
            :class="$style['c-loyalty-appsHowItWorksContainer']"
            data-test-id="StampCards-HowItWorks-Content">
            <how-it-works />
        </div>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import { mapActions, mapGetters } from 'vuex';
import { FTab as Tab, FTabs as Tabs } from '@justeat/f-tabs';
import '@justeat/f-tabs/dist/f-tabs.css';
import tenantConfigs from '../tenants';
import loyalty from '../store/loyalty.module';
import { ACTION_INITIALISE_LOYALTY, VUEX_MODULE_NAMESPACE_LOYALTY } from '../store/types';
import LoyaltyHeader from './Header.vue';
import HowItWorks from './HowItWorks.vue';
import LoyaltyCards from './LoyaltyCards.vue';
import Unauthenticated from './Unauthenticated.vue';


export default {
    name: 'VLoyalty',

    components: {
        LoyaltyHeader,
        LoyaltyCards,
        Unauthenticated,
        HowItWorks,
        Tabs,
        Tab
    },

    mixins: [
        VueGlobalisationMixin
    ],

    props: {
        authToken: {
            type: String,
            default: undefined
        },
        brazeApiKey: {
            type: String,
            required: true
        },
        showLoyaltyNavigationElements: {
            type: Boolean,
            default: true
        },
        hash: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            tenantConfigs,
            shouldAnimate: true
        };
    },

    computed: {
        ...mapGetters(VUEX_MODULE_NAMESPACE_LOYALTY, [
            'isAuthenticated'
        ]),

        /**
         * checks for the how it works hash so we can load the how it works tab automatically
         * @returns {boolean}
         */
        showHowItWorks () {
            return this.hash === '#how-it-works';
        }
    },

    /**
     * Set up the loyalty vuex module
     */
    beforeCreate () {
        if (!this.$store.hasModule(VUEX_MODULE_NAMESPACE_LOYALTY)) {
            this.$store.registerModule(VUEX_MODULE_NAMESPACE_LOYALTY, loyalty);
        }
    },

    /**
     * Initialise the loyalty module by passing in the required values from props
     */
    async mounted () {
        await this.init({
            brazeApiKey: this.brazeApiKey,
            authToken: this.authToken,
            logger: this.$log,
            errorHandler: this.handleErrors
        });
    },

    methods: {
        ...mapActions(VUEX_MODULE_NAMESPACE_LOYALTY, {
            init: ACTION_INITIALISE_LOYALTY
        }),

        handleErrors (error) {
            this.$emit('onError', error);
        }
    }
};
</script>

<style lang="scss" module>
.c-loyalty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: auto;
    background-color: $color-background-default;
}

.c-loyalty-tabs {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: -42px auto 0;
    padding: 0 #{$layout-margin}px;

    @include media('<mid') {
        padding: 0 #{$layout-margin--mid}px;
    }

    @include media('<narrow') {
        padding: 0 #{$layout-margin--narrow}px;
    }
}

.c-loyalty-appsHowItWorksContainer {
    padding-left: spacing(f);
    padding-right: spacing(f);

    @include media('<=wide') {
        padding-left: spacing(d);
        padding-right: spacing(d);
    }
}
</style>
