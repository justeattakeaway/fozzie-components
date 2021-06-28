// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Vuex from 'vuex';
import Vue from 'vue';
import VOffers from '../src/components/Offers.vue';
import { offersSearchModule } from '../src/store/offersSearch.module';
import makeSever from './mocks/server';
import groupedSeed from './mocks/seeds/grouped';
import cardsOnlySeed from './mocks/seeds/cardsOnly';
import noResultsSeed from './mocks/seeds/noResults';

const DISPLAY_STATE = {
    NO_RESULTS: 'No Results',
    GROUPED: 'Grouped',
    CARDS_ONLY: 'Cards Only'
};

const SEEDS = {
    NO_RESULTS: noResultsSeed,
    GROUPED: groupedSeed,
    CARDS_ONLY: cardsOnlySeed
};

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

Vue.use(Vuex);

export const VOffersComponent = (args, { argTypes }) => ({
    components: { VOffers },

    props: Object.keys(argTypes),

    data: () => ({
        server: undefined
    }),

    watch: {
        offersState: function (val) {
            const displayKey = Object.keys(DISPLAY_STATE).find(key => DISPLAY_STATE[key] === val);
            this.startServer(SEEDS[displayKey]);
            this.initialiseAppboyContentCardRefresh();
        }
    },

    store: new Vuex.Store({
        modules: {
            offersSearchModule
        }
    }),

    methods: {
        startServer (seed) {
            // first check to see if we have server already started
            if (this.server !== undefined) {
                this.server.shutdown();
            }

            // now create the server with the seed based on currently selected display state
            this.server = makeSever(seed);
        },

        initialiseAppboyContentCardRefresh () {
            if (window.appboy) {
                window.appboy.requestContentCardsRefresh();
            }
        }
    },

    created () {
        const displayKey = Object.keys(DISPLAY_STATE)
            .find(key => DISPLAY_STATE[key] === DISPLAY_STATE.GROUPED);
        this.startServer(SEEDS[displayKey]);
    },

    template: '<v-offers v-bind="$props" />'
});

VOffersComponent.storyName = 'f-offers';

VOffersComponent.args = {
    brazeApiKey: '__TEST_API_KEY__'
};

VOffersComponent.argTypes = {
    offersState: {
        control: {
            type: 'select',
            options: [
                DISPLAY_STATE.GROUPED,
                DISPLAY_STATE.NO_RESULTS,
                DISPLAY_STATE.CARDS_ONLY
            ]
        },
        defaultValue: DISPLAY_STATE.GROUPED
    }
};
