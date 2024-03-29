import Vuex from 'vuex';
import Vue from 'vue';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import { setupApiMockState, apiStateOptions } from './story.helper';
import SelfExclusion from '../src/components/SelfExclusion.vue';
import fSelfExclusionModule from '../src/store/selfExclusion.module';

Vue.use(Vuex);

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const SelfExclusionComponent = (args, { argTypes }) => ({
    components: { SelfExclusion },
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
            fSelfExclusionModule
        }
    }),

    template:
        '<self-exclusion v-bind="$props" />'
});

SelfExclusionComponent.storyName = 'f-self-exclusion';

SelfExclusionComponent.args = {
    authToken: 'some-auth-token',
    locale: locales.au,
    smartGatewayBaseUrl: '',
    showUnsavedChangesAlert: false,
    privacyPolicyUrl: 'https://www.menulog.com.au/info/privacy-policy',
    navLinks: [
        {
            url: '/account/info',
            text: 'Account Info'
        },
        {
            url: '/order-history',
            text: 'Orders'
        },
        {
            url: '/account/credit',
            text: 'Account Credit'
        },
        {
            url: '/account/saved-cards',
            text: 'Payment Methods'
        },
        {
            url: '/account/addressbook',
            text: 'Delivery Addresses'
        },
        {
            url: '/account/contact-preferences',
            text: 'Contact Preferences'
        }
    ]
};

SelfExclusionComponent.argTypes = {
    apiState: {
        control: { type: 'select' },
        options: apiStateOptions.states,
        description: apiStateOptions.title,
        defaultValue: apiStateOptions.default
    }
};
