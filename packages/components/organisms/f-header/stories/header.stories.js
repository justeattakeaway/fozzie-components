import {
    withKnobs, boolean, select, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueHeader from '../src/components/Header.vue';

import { customNavLinks, userInfo } from '../test-utils/helpers/objects';

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

export const HeaderComponent = () => ({
    components: { VueHeader },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO'])
        },
        logoLinkDisabled: {
            default: boolean('Disable logo link', false)
        },
        showOffersLink: {
            default: boolean('Show offers link', false)
        },
        showDeliveryEnquiry: {
            default: boolean('Show delivery enquiry', false)
        },
        headerBackgroundTheme: {
            default: select('Header theme', ['white', 'highlight', 'transparent'])
        },
        showLoginInfo: {
            default: boolean('Show login/user info link', true)
        },
        isLoggedIn: {
            default: boolean('Is logged in?', true)
        },
        userInfoProp: {
            default: object('User info (if logged in)', userInfo)
        },
        showHelpLink: {
            default: boolean('Show help link', true)
        },
        showCountrySelector: {
            default: boolean('Show country selector', true)
        },
        showSkipLink: {
            default: boolean('Show skip link', true)
        },
        showCustomNavLinks: {
            default: boolean('Show custom nav links?', false)
        },
        customNavLinks: {
            default: object('Custom nav links', customNavLinks)
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: `
        <vue-header
            :user-info-prop="isLoggedIn && userInfoProp"
            :show-offers-link="showOffersLink"
            :show-help-link="showHelpLink"
            :locale="locale"
            :is-logo-link-disabled="logoLinkDisabled"
            :header-background-theme="headerBackgroundTheme"
            :show-delivery-enquiry="showDeliveryEnquiry"
            :show-login-info="showLoginInfo"
            :show-country-selector="showCountrySelector"
            :custom-nav-links="showCustomNavLinks ? customNavLinks : []"
            :key="locale"
            :show-skip-link="showSkipLink" />`
});

HeaderComponent.storyName = 'f-header';
