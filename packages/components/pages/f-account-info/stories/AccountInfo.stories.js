import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import AccountInfo from '../src/components/AccountInfo.vue';
import fAccountInfoModule from '../src/store/accountInfo.module';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const AccountInfoComponent = () => ({
    components: { AccountInfo },
    props: {
        locale: {
            default: 'en-GB'
        },
        authToken: {
            type: String,
            default: 'sometoken'
        },
        isAuthFinished: {
            default: true
        },
        smartGatewayBaseUrl: {
            type: String,
            default: ''
        }
    },

    store: new Vuex.Store({
        modules: {
            fAccountInfoModule
        }
    }),

    template: '<account-info ' +
    ':authToken="authToken" ' +
    ':locale="locale" ' +
    ':isAuthFinished="isAuthFinished" ' +
    ':smart-gateway-base-url="smartGatewayBaseUrl" ' +
    // eslint-disable-next-line no-template-curly-in-string
    ':key="`${authToken},${locale},${smartGatewayBaseUrl}`" />'
});

AccountInfoComponent.storyName = 'f-account-info';
