<template>
    <div
        :class="$style['c-loyalty']"
        data-test-id="loyalty">
        <loyalty-header />
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import { mapActions } from 'vuex';
import tenantConfigs from '../tenants';
import loyalty from '../store/loyalty.module';
import { ACTION_INITIALISE_LOYALTY, VUEX_MODULE_NAMESPACE_LOYALTY } from '../store/types';
import LoyaltyHeader from './Header.vue';

export default {
    name: 'VLoyalty',

    components: {
        LoyaltyHeader
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
        }
    },

    data () {
        return {
            tenantConfigs
        };
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
            authToken: this.authToken
        });
    },

    methods: {
        ...mapActions(VUEX_MODULE_NAMESPACE_LOYALTY, {
            init: ACTION_INITIALISE_LOYALTY
        })
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
    background-color: $color-grey-10;
}

</style>
