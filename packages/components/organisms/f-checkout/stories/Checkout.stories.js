import Vue from 'vue';
import Vuex from 'vuex';
import { select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutMock from '../src/demo/checkoutMock';

Vue.use(Vuex);

const deliveryUrl = '/checkout-delivery.json';
const collectionUrl = '/checkout-collection.json';
const checkoutAvailableFulfilmentUrl = '/checkout-available-fulfilment.json';

CheckoutMock.setupCheckoutMethod(deliveryUrl);
CheckoutMock.setupCheckoutMethod(collectionUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.passThroughAny();

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    props: {
        locale: {
            default: select('Locale', [ENGLISH_LOCALE])
        },
        checkoutUrl: {
            default: select('Checkout Url', [deliveryUrl, collectionUrl], deliveryUrl)
        },
        checkoutAvailableFulfilmentUrl: {
            default: select('Available Fulfilment Url', [checkoutAvailableFulfilmentUrl], checkoutAvailableFulfilmentUrl)
        },
        createGuestUrl: {
            default: text('Create Guest Url', 'https://smartgateway.staging-uk.je-labs.com/consumers/uk')
        },
        authToken: {
            default: text('Auth token', '')
        },
        loginUrl: {
            default: text('Login Url', '/login')
        }
    },
    store: new Vuex.Store({}),
    template: '<vue-checkout ' +
        ':checkoutUrl="checkoutUrl" ' +
        ':checkout-available-fulfilment-url="checkoutAvailableFulfilmentUrl" ' +
        ':authToken="authToken" ' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${checkoutUrl},${checkoutAvailableFulfilmentUrl},${authToken}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
