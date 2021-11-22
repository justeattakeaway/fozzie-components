import {
    withKnobs, boolean, select, object
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueHeader from '../src/components/Header.vue';

const userInfo = {
    friendlyName: 'John',
    isAuthenticated: true,
    email: 'je@test.com',
    userData: {
        signupDate: '2018-05-21T22:54:49.4630000Z',
        email: 'test',
        'a-UserId': 'test',
        consumerStatus: 'test'
    }
};

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
            default: boolean('Show login link / user info', true)
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
            :key="locale"
            :show-skip-link="showSkipLink" />`
});

HeaderComponent.storyName = 'f-header';
