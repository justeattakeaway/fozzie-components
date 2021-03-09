import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import {
    ENGLISH_LOCALE,
    SPANISH_LOCALE
} from '@justeat/storybook/constants/globalisation';

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
    template: '<searchbox :locale="locale" :key="locale" />'
});

SearchboxComponent.args = {
    locale: SPANISH_LOCALE
};

SearchboxComponent.argTypes = {
    locale: {
        control: { type: 'select', options: [ENGLISH_LOCALE, SPANISH_LOCALE] }
    }
};

SearchboxComponent.storyName = 'f-searchbox';
