import Vue from 'vue';
import Vuex from 'vuex';
import { select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutModule from '../src/store/checkout.module';
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
const getBasketDeliveryUrl = '/get-basket-delivery.json';
const getBasketCollectionUrl = '/get-basket-collection.json';

CheckoutMock.setupCheckoutMethod(deliveryUrl);
CheckoutMock.setupCheckoutMethod(collectionUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.setupCheckoutMethod(getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getBasketCollectionUrl);
CheckoutMock.passThroughAny();

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    props: {
        locale: {
            default: select('Locale', [ENGLISH_LOCALE])
        },
        checkoutUrl: {
            default: select('Checkout Url', [deliveryUrl, collectionUrl, 'An invalid URL'], deliveryUrl)
        },
        checkoutAvailableFulfilmentUrl: {
            default: select('Available Fulfilment Url', [checkoutAvailableFulfilmentUrl], checkoutAvailableFulfilmentUrl)
        },
        createGuestUrl: {
            default: text('Create Guest Url', createGuestUrl)
        },
        getBasketUrl: {
            default: select('Get Basket Url', [getBasketDeliveryUrl, getBasketCollectionUrl], getBasketDeliveryUrl)
        },
        authToken: {
            default: select('Auth token', ['authToken', null], 'authToken')
        },
        loginUrl: {
            default: text('Login Url', '/login')
        }
    },
    store: new Vuex.Store({
        modules: {
            checkout: CheckoutModule
        }
    }),
    template: '<vue-checkout ' +
        ':checkoutUrl="checkoutUrl" ' +
        ':checkout-available-fulfilment-url="checkoutAvailableFulfilmentUrl" ' +
        ':create-guest-url="createGuestUrl" ' +
        ':get-basket-url="getBasketUrl" ' +
        ':authToken="authToken" ' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${checkoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
