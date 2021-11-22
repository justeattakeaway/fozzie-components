import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import ContactPreferences from '../src/components/ContactPreferences.vue';
import fContactPreferencesModule from '../src/store/contactPreferences.module';
import {
    authToken,
    setupApiState,
    setupNewsDataState,
    apiStates,
    apiStateOptions
} from './story.helper';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withKnobs, withA11y]
};

export const ContactPreferencesComponent = () => ({
    components: {
        ContactPreferences
    },

    props: {
        locale: {
            default: select('Locale', [locales.gb], locales.gb)
        },

        apiState: {
            default: select(apiStateOptions.title, apiStateOptions.states, apiStates.none)
        },

        isNewsEmailOptedIn: {
            default: boolean('News - Email - Opted In', false)
        },

        isNewsSmsOptedIn: {
            default: boolean('News - Sms - Opted In', false)
        }
    },

    computed: {
        smartGatewayBaseUrl () {
            return '';
        },

        authToken () {
            return authToken;
        },

        prepareStory () {
            setupApiState({
                apiState: this.apiState
            });
            setupNewsDataState({
                store: this.$store,
                emailState: this.isNewsEmailOptedIn,
                smsState: this.isNewsSmsOptedIn
            });
        }
    },

    store: new Vuex.Store({
        modules: {
            fContactPreferencesModule
        }
    }),

    template: '<contact-preferences ' +
    ':authToken="authToken" ' +
    ':locale="locale" ' +
    ':smart-gateway-base-url="smartGatewayBaseUrl" ' +
    ':prepareStory="prepareStory" ' +
    // eslint-disable-next-line no-template-curly-in-string
    ' :key="`${authToken},${locale},${smartGatewayBaseUrl}`" />'

});

ContactPreferencesComponent.storyName = 'f-contact-preferences';
