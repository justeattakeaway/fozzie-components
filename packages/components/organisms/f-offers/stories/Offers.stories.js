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

/**
 * Resets all locally stored braze data so that the stubbed data is always fresh on page load
 */
function resetBrazeData () {
    document.cookie
        .split('; ')
        .filter(row => row.startsWith('ab.'))
        .map(row => row.split('=')[0])
        .forEach(cookieName => {
            document.cookie = `${cookieName}=;max-age=0`;
        });

    Object.keys(localStorage)
        .filter(row => row.startsWith('ab.'))
        .forEach(storageItem => {
            localStorage.removeItem(storageItem);
        });
}

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
            resetBrazeData();
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
    authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImxiRmxsR2dSVTRUaldlTEJxVzlacDNBNW00USIsImtpZCI6ImxiRmxsR2dSVTRUaldlTEJxVzlacDNBNW00USJ9.eyJpc3MiOiJodHRwczovL2FsbC1hdXRob3JpemVhcGktc3RhZ2luZy11ay5zdGFnaW5nLXVrLmplLWxhYnMuY29tL2lkZW50aXR5IiwiYXVkIjoiaHR0cHM6Ly9hbGwtYXV0aG9yaXplYXBpLXN0YWdpbmctdWsuc3RhZ2luZy11ay5qZS1sYWJzLmNvbS9pZGVudGl0eS9yZXNvdXJjZXMiLCJleHAiOjE2MzA0ODgwMzksIm5iZiI6MTYzMDQ4NDQzOSwiY2xpZW50X2lkIjoid2ViX3NvY2lhbCIsInJlYWxtX2lkIjoiYTNjMjQ2ZTEtMjRhNC00NWE2LWEzNjItZmRhNzNhNGI3NWFiIiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiLCJtb2JpbGVfc2NvcGUiXSwic3ViIjoiMTc5ODQ3MDgiLCJhdXRoX3RpbWUiOjE2Mjg1MjA1MTAsImlkcCI6Imlkc3J2IiwiZW1haWwiOiJtYXR0aGV3aGFyZGVybkBnbWFpbC5jb20iLCJjcmVhdGVkX2RhdGUiOiIyMDIwLTEwLTE1VDA5OjI5OjE2LjAzMDAwMDBaIiwibmFtZSI6Im1hdHRoZXcgaGFyZGVybiIsImdsb2JhbF91c2VyX2lkIjoiVTB0WlV4QWhvKzZkSGs3UC9kcmRlUlJ2emVvPSIsImdpdmVuX25hbWUiOiJtYXR0aGV3Iiwicm9sZSI6IlJlZ2lzdGVyZWQiLCJmYW1pbHlfbmFtZSI6ImhhcmRlcm4iLCJqZXQiOiJINGVpcVZBTjJrMmgwRzIxUUQwZ3ZRIiwiZ3JhbnRfdHlwZSI6InJlZnJlc2hfdG9rZW4iLCJhbXIiOlsiZGVsZWdhdGlvbiJdfQ.RcnhqcxOsY-FKwdyd4mPoGi3gZi20Gq1mGYamku3qLFeg_EyMXO6Rijd8lW2w0d42AXTnyaPznllyk97fnSglIWshUnlEmIsKsB24KC1sJ6TOQFxVdcahMA9UNqVJNFT87Rjp-NNLOwNF31YtE6oR10im_4aWc2pprjdm7nVZJWJR8XZC2bxjnQfjY0FbTPs__wbjbX73kU3LltIPgzAcWoyjPtx01SSqBGHnuG0VDrsP-Lhl3vZtETS89CZ5IK7yFWP1uRaPgG1R2SEUytRM73uHVKJ2qldnDnvi31TxYwWNnzR1OIWwpl2UgnWg-0peNXF0c4qbiRLfxhWY9bYHb4_i547TNQ7xKEJfleJmus0YpS1z2Rd1UDsapHPKqCAFF5cZMV_MjQ8Yf3lP9l-sO6l4w3_uH2RPw28pGcRdxfws5ecvra5KsoUYXl4usOw_tZ0YykRk7Fk6vVVoIuR8edbKU_uODzL55vx3L8dt86v1EYzgLdwSVF5l_n8R35K_aQkin4XUcx-OO_Z5NF_LQsqz_4FBlEWrGHoQP2b8FCOfHj6MP4OFo0-ycS_x5_r0rfQ03j8ZyCT04399NyUnzy26EC6JLaoqCu6NhZIacrk_OPvn2k-zqqyIQ4ShAcs5JIjLezx7Ot658bqrHqymglEXfL1Bsktk6wPDHCg8Ho',
    brazeApiKey: '3360df52-217f-41e9-9c9c-0dcda2538025'
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
