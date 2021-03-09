import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import Searchbox from '../src/components/Base.vue';
import SearchboxModule from '../src/store/searchbox.module';

Vue.use(Vuex);

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const SearchboxComponent = (args, { argTypes }) => ({
    components: { Searchbox },
    props: Object.keys(argTypes),
    store: new Vuex.Store({
        modules: {
            checkout: SearchboxModule
        }
    }),
    template: '<searchbox v-bind="$props" :key="locale" />'
});

SearchboxComponent.args = {
    locale: locales.gb
};

SearchboxComponent.argTypes = {
    locale: {
        control: {
            type: 'select',
            options: Object.values(locales)
        }
    }
};

SearchboxComponent.storyName = 'f-searchbox';
