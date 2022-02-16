import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import ContactPreferences from '../src/components/ContactPreferences.vue';
import fContactPreferencesModule from '../src/store/contactPreferences.module';
import {
    apiStateOptions,
    setupApiMockState
} from './story.helper';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const ContactPreferencesComponent = (args, { argTypes }) => ({
    components: {
        ContactPreferences
    },

    props: Object.keys(argTypes),

    watch: {
        apiState: {
            immediate: true,
            async handler (value) {
                setupApiMockState(value);
            }
        }
    },

    store: new Vuex.Store({
        modules: {
            fContactPreferencesModule
        }
    }),

    template:
    `<contact-preferences
        authToken="some-auth-token"
        :isAuthFinished="true"
        :locale="locale"
        smart-gateway-base-url=""
    />`

});

ContactPreferencesComponent.storyName = 'f-contact-preferences';

ContactPreferencesComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    },

    apiState: {
        control: {
            type: 'select'
        },
        options: apiStateOptions.states,
        description: apiStateOptions.title,
        defaultValue: apiStateOptions.default
    }
};
