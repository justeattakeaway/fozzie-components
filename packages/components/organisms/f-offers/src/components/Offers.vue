<template>
    <div
        :class="$style['c-offers']"
        data-test-id="offers">
        <no-results />
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import NoResults from './NoResults.vue';
import '@justeat/f-searchbox/dist/f-searchbox.css';

export default {
    name: 'VOffers',

    components: {
        NoResults
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
