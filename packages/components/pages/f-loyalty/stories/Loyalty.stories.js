import { withA11y } from '@storybook/addon-a11y';
import Vue from 'vue';
import Vuex from 'vuex';
import makeSever from './stories/mocks/server';
import VLoyalty from '../src/components/Loyalty.vue';
import loyaltyModule from '../src/store/loyalty.module';

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

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const VLoyaltyComponent = (args, { argTypes }) => ({
    components: { VLoyalty },

    props: Object.keys(argTypes),

    store: new Vuex.Store({
        modules: {
            loyaltyModule
        }
    }),

    created () {
        this.startServer();
    },

    methods: {
        startServer () {
            // first check to see if we have server already started
            if (this.server !== undefined) {
                this.server.shutdown();
            }
            resetBrazeData();
            // now create the server with the seed based on currently selected display state
            this.server = makeSever();
        }
    },

    template: '<v-loyalty v-bind="$props" />'
});

VLoyaltyComponent.storyName = 'f-loyalty';

VLoyaltyComponent.args = {
    authToken: null,
    brazeApiKey: '__TEST_API_KEY__'
};
