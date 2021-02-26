import Vue from 'vue';
import Vuex from 'vuex';
import { select, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
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

const getCheckoutDeliveryUrl = '/checkout-delivery.json';
const getCheckoutCollectionUrl = '/checkout-collection.json';
const checkoutAvailableFulfilmentUrl = '/checkout-available-fulfilment.json';
const createGuestUrl = '/create-guest.json';
const getBasketDeliveryUrl = '/get-basket-delivery.json';
const getBasketCollectionUrl = '/get-basket-collection.json';
const updateCheckoutUrl = '/update-checkout.json';
const getAddressUrl = '/get-address.json';
const placeOrderUrl = '/place-order.json';
const paymentPageUrlPrefix = '#/pay'; // Adding the "#" so we don't get redirect out of the component in Storybook

CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.setupCheckoutMethod(getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getBasketCollectionUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutUrl);
CheckoutMock.setupCheckoutMethod(getAddressUrl);
CheckoutMock.setupCheckoutMethod(placeOrderUrl);
CheckoutMock.passThroughAny();

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            placeOrderUrl,
            paymentPageUrlPrefix,
            getAddressUrl,
            loginUrl: '/login',
            createGuestUrl,
            updateCheckoutUrl,
            checkoutAvailableFulfilmentUrl
        }
    },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
        },

        serviceType: {
            default: select('Service Type', ['Collection', 'Delivery'], 'Collection')
        },

        locale: {
            default: select('Locale', [ENGLISH_LOCALE])
        }
    },
    computed: {
        getCheckoutUrl () {
            if (this.serviceType === 'Collection') {
                return getCheckoutCollectionUrl;
            } else if (this.serviceType === 'Delivery') {
                return getCheckoutDeliveryUrl;
            } else {
                return 'An invalid URL';
            }
        },

        getBasketUrl () {
            if (this.serviceType === 'Collection') {
                return getBasketCollectionUrl;
            } else if (this.serviceType === 'Delivery') {
                return getBasketDeliveryUrl;
            } else {
                return 'An invalid URL';
            }
        },

        authToken () {
            return this.isLoggedIn ? 'Auth Token' : ''
        }
    },
    store: new Vuex.Store({
        modules: {
            checkout: CheckoutModule
        }
    }),
    template: '<vue-checkout ' +
        ':getCheckoutUrl="getCheckoutUrl" ' +
        ':updateCheckoutUrl="updateCheckoutUrl" ' +
        ':checkout-available-fulfilment-url="checkoutAvailableFulfilmentUrl" ' +
        ':create-guest-url="createGuestUrl" ' +
        ':getBasketUrl="getBasketUrl" ' +
        ':authToken="authToken" ' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        ':getAddressUrl="getAddressUrl" ' +
        ':placeOrderUrl="placeOrderUrl" ' +
        ':paymentPageUrlPrefix="paymentPageUrlPrefix" ' +
        'applicationName="Storybook" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
