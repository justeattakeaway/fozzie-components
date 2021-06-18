<template>
    <div
        :class="$style['c-offers']"
        data-test-id="offers">
        <no-offers-found />
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import NoOffersFound from './NoOffersFound.vue';
import '@justeat/f-searchbox/dist/f-searchbox.css';

export default {
    name: 'VOffers',

    components: {
        NoOffersFound
    },

    mixins: [
        VueGlobalisationMixin
    ],

    data () {
        return {
            tenantConfigs
        };
    }
};
</script>

<style lang="scss" module>

.c-offers {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}

</style>
