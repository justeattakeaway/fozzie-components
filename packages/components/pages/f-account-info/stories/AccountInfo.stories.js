import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import AccountInfo from '../src/components/AccountInfo.vue';
import fAccountInfoModule from '../src/store/accountInfo.module';
import {
    // apiStates,
    apiStateOptions,
    setupApiMockState
} from './story.helper';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const AccountInfoComponent = (args, { argTypes }) => ({
    components: { AccountInfo },
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
            fAccountInfoModule
        }
    }),
    template:
    `<account-info
        :locale="locale"
        authToken="some-auth-token"
        :isAuthFinished="true"
        smart-gateway-base-url=""
    />`
});

AccountInfoComponent.argTypes = {
    apiDetailsState: apiStateOptions.default
};

AccountInfoComponent.storyName = 'f-account-info';

AccountInfoComponent.argTypes = {
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
        mapping: apiStateOptions.states,
        description: apiStateOptions.title,
        defaultValue: apiStateOptions.default
    }
};
