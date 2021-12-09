import { withA11y } from '@storybook/addon-a11y';
import VueHeader from '../src/components/Header.vue';

import { userInfo } from '../test-utils/helpers/objects';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

export const HeaderComponent = (args, { argTypes }) => ({
    components: {
        VueHeader
    },

    props: Object.keys(argTypes),

    template: `
        <vue-header
            :user-info-prop="userInfoProp"
            :show-offers-link="showOffersLink"
            :show-help-link="showHelpLink"
            :locale="locale"
            :is-logo-link-disabled="logoLinkDisabled"
            :header-background-theme="headerBackgroundTheme"
            :show-delivery-enquiry="showDeliveryEnquiry"
            :show-login-info="showLoginInfo"
            :show-country-selector="showCountrySelector"
            :custom-nav-links="customNavLinks"
            :key="locale"
            :show-skip-link="showSkipLink" />`
});

HeaderComponent.storyName = 'f-header';
HeaderComponent.args = {
    locale: 'en-GB',
    headerBackgroundTheme: 'white',
    showLoginInfo: true,
    userInfoProp: userInfo,
    customNavLinks: [],
    showCountrySelector: true,
    showHelpLink: true,
    showSkipLink: true,
    showOffersLink: false,
    showDeliveryEnquiry: false,
    logoLinkDisabled: false
};

HeaderComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        description: 'Select a tenant',
        options: ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']
    },

    headerBackgroundTheme: {
        control: { type: 'select' },
        description: 'Choose a theme for the header',
        options: ['white', 'highlight', 'transparent']
    },

    showLoginInfo: {
        description: 'For unauthenticated users, shows the "Login" link. For authenticated users, shows their name and contains links to the account pages.'
    },

    userInfoProp: {
        control: { type: 'object' },
        description: 'Configure the user details; set to `false` (in RAW mode) to simulate a logged out user'
    },

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    customNavLinks: {
        description: 'Array of objects representing custom navigation links. Each object should contain the properties `text` and `url`, and (optionally) a `gtm` object containing tracking properties.'
    //     options: ['Empty', 'CustomLink', 'CustomLinkWithGtm'],
    //     mapping: {
    //         Empty: [],
    //         CustomLink: [{ text: 'Custom Link', url: '/custom' }],
    //         CustomLinkWithGtm: [{ text: 'Custom Link (with GTM)', url: '/custom', gtm: { label: 'custom-link' } }]
    //     },
    //     control: {
    //         type: 'select',
    //         labels: {
    //             Empty: 'No custom links',
    //             CustomLink: 'Custom link',
    //             CustomLinkWithGtm: 'Custom link (with GTM label)'
    //         }
    //     }
    },

    showCountrySelector: {
        description: 'Shows the country selector which contains links to our sites in other countries.'
    },

    showHelpLink: {
        description: 'Shows the link to the "Help" page'
    },

    showSkipLink: {
        description: 'Includes the "Skip to main content" link'
    },

    showOffersLink: {
        description: 'Shows the link to the "For You" page'
    },

    showDeliveryEnquiry: {
        description: 'Shows the "Deliver with Just Eat" link'
    },

    logoLinkDisabled: {
        description: 'Prevents the header logo from also being a link'
    }
};
