import Vue from 'vue';
import Vuex from 'vuex';
import { withA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs';
import { locales } from '@justeat/storybook/constants/globalisation';
import ContactPreferences from '../src/components/ContactPreferences.vue';
import fContactPreferencesModule from '../src/store/contactPreferences.module';

export default {
    title: 'Components/Pages',
    decorators: [withKnobs, withA11y]
};

Vue.use(Vuex);

export const ContactPreferencesComponent = () => ({
    components: {
        ContactPreferences
    },
    props: {
        locale: {
            default: select('Locale', [locales.gb], locales.gb)
        }
    },
    store: new Vuex.Store({
        modules: {
            fContactPreferencesModule
        }
    }),
    template: `<contact-preferences
        :locale="locale"
        smart-gateway-base-url="" />`
});

ContactPreferencesComponent.storyName = 'f-contact-preferences';
