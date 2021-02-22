// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import StatusBanner from '../src/components/StatusBanner.vue';

Vue.use(Vuex);

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const StatusBannerComponent = () => ({
    components: { StatusBanner },
    props: {
    },
    store: new Vuex.Store({}),
    template: `<status-banner />`
});

StatusBannerComponent.storyName = 'f-status-banner';
