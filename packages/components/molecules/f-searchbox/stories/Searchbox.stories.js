// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
import {
    select, boolean
} from '@storybook/addon-knobs';
import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import VueSearchbox from '../src/components/Base.vue';
import SearchboxModule from '../src/store/searchbox.module';

Vue.use(Vuex);

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const VueSearchboxComponent = () => ({
    components: { VueSearchbox },
    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'primaryAlt', 'secondary', 'tertiary', 'link'])
        },
        fullWidth: {
            default: boolean('fullWidth', false)
        }
    },
    store: new Vuex.Store({
        modules: {
            checkout: SearchboxModule
        }
    }),
    template: '<vue-searchbox />'
});

VueSearchboxComponent.storyName = 'f-searchbox';
