import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import AccountInfo from '../src/components/AccountInfo.vue';
import fAccountInfoModule from '../src/store/accountInfo.module';
import {
    authToken,
    setupApiState,
    apiStates,
    apiGetPostDetailsStateOptions,
    apiGetPostAddressesStateOptions
} from './story.helper';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withKnobs, withA11y]
};

export const AccountInfoComponent = () => ({
    components: { AccountInfo },
    props: {
        locale: {
            default: select('Locale', [locales.gb], locales.gb)
        },
        apiGetDetailsState: {
            default: select(apiGetPostDetailsStateOptions.title, apiGetPostDetailsStateOptions.states, apiStates.none)
        },
        apiGetAddressesState: {
            default: select(apiGetPostAddressesStateOptions.title, apiGetPostAddressesStateOptions.states, apiStates.none)
        }
    },

    computed: {
        authToken () {
            return authToken;
        },

        prepareStory () {
            setupApiState({
                apiGetDetailsState: this.apiGetDetailsState,
                apiGetAddressesState: this.apiGetAddressesState
            });
        }
    },

    store: new Vuex.Store({
        modules: {
            fAccountInfoModule
        }
    }),

    template: '<account-info ' +
    ':authToken="authToken" ' +
    ':isAuthFinished="true" ' +
    ':locale="locale" ' +
    'smart-gateway-base-url="" ' +
    ':prepareStory="prepareStory" ' +
    // eslint-disable-next-line no-template-curly-in-string
    ':key="`${authToken},${locale}`" />'
});

AccountInfoComponent.storyName = 'f-account-info';
