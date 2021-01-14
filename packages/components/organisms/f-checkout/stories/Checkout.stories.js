import Vue from 'vue';
import Vuex from 'vuex';
import { select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
    ENGLISH_LOCALE
} from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutMock from '../src/demo/checkoutMock';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

Vue.use(Vuex);

const deliveryUrl = '/checkout-delivery.json';
const collectionUrl = '/checkout-collection.json';
const checkoutAvailableFulfilmentUrl = '/checkout-available-fulfilment.json';
const createGuestUrl = '/create-guest.json';

CheckoutMock.setupCheckoutMethod(deliveryUrl);
CheckoutMock.setupCheckoutMethod(collectionUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.passThroughAny();

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
            default: text('Create Guest Url', createGuestUrl)
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
        ':create-guest-url="createGuestUrl" ' +
        ':authToken="authToken" ' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${checkoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
