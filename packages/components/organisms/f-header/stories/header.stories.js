import {
    withKnobs, boolean, select, object
} from '@storybook/addon-knobs';
import VueHeader from '../src/components/Header.vue';
import { withA11y } from '@storybook/addon-a11y';

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
    decorators: [withKnobs, withA11y]
};

export const HeaderComponent = () => ({
    components: { VueHeader },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO'])
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
        userInfoProp: {
            default: object('User info', userInfo)
        },
        showLoginInfo: {
            default: boolean('Show login/user info link', true)
        },
        showHelpLink: {
            default: boolean('Show help link', true)
        },
        showCountrySelector: {
            default: boolean('Show country selector', true)
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template: `
        <vue-header
            :userInfoProp="userInfoProp"
            :showOffersLink="showOffersLink"
            :showHelpLink="showHelpLink"
            :locale="locale"
            :headerBackgroundTheme="headerBackgroundTheme"
            :showDeliveryEnquiry="showDeliveryEnquiry"
            :showLoginInfo="showLoginInfo"
            :showCountrySelector="showCountrySelector"
            :key="locale" />`
});

HeaderComponent.storyName = 'f-header';