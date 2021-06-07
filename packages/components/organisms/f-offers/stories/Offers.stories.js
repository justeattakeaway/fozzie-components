// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Vuex from 'vuex';
import Vue from 'vue';
import VOffers from '../src/components/Offers.vue';
import { offersHeaderSearchModule } from '../src/store/offersHeaderSearch.module';


export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

Vue.use(Vuex);

export const VOffersComponent = () => ({
    components: { VOffers },
    props: {
    },
    store: new Vuex.Store({
        modules: {
            offersHeaderSearchModule
        }
    }),
    template: '<v-offers />'
});

VOffersComponent.storyName = 'f-offers';
