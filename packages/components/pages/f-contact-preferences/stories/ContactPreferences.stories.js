import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import ContactPreferences from '../src/components/ContactPreferences.vue';
import fContactPreferencesModule from '../src/store/contactPreferences.module';
import {
    setupApiState,
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

    watch: {
        apiState: {
            immediate: true,
            async handler (value) {
                setupApiState({
                    apiState: value
                });
            }
        },

        isNewsEmailOptedIn: {
            async handler (value) {
                this.$store.dispatch('fContactPreferencesModule/editPreference', { key: 'news', field: 'emailValue', value });
            }
        },

        isNewsSmsOptedIn: {
            async handler (value) {
                this.$store.dispatch('fContactPreferencesModule/editPreference', { key: 'news', field: 'smsValue', value });
            }
        }
    },

    store: new Vuex.Store({
        modules: {
            fContactPreferencesModule
        }
    }),

    template: '<contact-preferences ' +
    'authToken="some-auth-token" ' +
    ':isAuthFinished="true" ' +
    ':locale="locale" ' +
    'smart-gateway-base-url="" ' +
    // eslint-disable-next-line no-template-curly-in-string
    ':key="`${locale}`" />'

});

ContactPreferencesComponent.storyName = 'f-contact-preferences';
