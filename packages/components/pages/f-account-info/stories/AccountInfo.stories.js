import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import AccountInfo from '../src/components/AccountInfo.vue';
import fAccountInfoModule from '../src/store/accountInfo.module';
import {
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

        apiDetailsState: {
            default: select(apiGetPostDetailsStateOptions.title, apiGetPostDetailsStateOptions.states, apiStates.none)
        },

        apiAddressesState: {
            default: select(apiGetPostAddressesStateOptions.title, apiGetPostAddressesStateOptions.states, apiStates.none)
        }
    },

    watch: {
        apiDetailsState: {
            immediate: true,
            async handler (value) {
                setupApiState({
                    apiDetailsState: value,
                    apiAddressState: this.apiAddressesState
                });
            }
        },

        apiAddressesState: {
            immediate: true,
            async handler (value) {
                setupApiState({
                    apiDetailsState: this.apiDetailsState,
                    apiAddressState: value
                });
            }
        }
    },

    store: new Vuex.Store({
        modules: {
            fAccountInfoModule
        }
    }),

    template: '<account-info ' +
    'authToken="some-auth-token" ' +
    ':isAuthFinished="true" ' +
    ':locale="locale" ' +
    'smart-gateway-base-url="" ' +
    // eslint-disable-next-line no-template-curly-in-string
    ':key="`${locale}`" />'
});

AccountInfoComponent.storyName = 'f-account-info';
