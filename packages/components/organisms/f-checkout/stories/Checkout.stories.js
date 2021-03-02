import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import {
    ENGLISH_LOCALE
} from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutModule from '../src/store/checkout.module';
import AnalyticsModule from '../src/store/analytics.module';
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
const getGeoLocationUrl = '/get-geo-location.json';

CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.setupCheckoutMethod(getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getBasketCollectionUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutUrl);
CheckoutMock.setupCheckoutMethod(getAddressUrl);
CheckoutMock.setupCheckoutMethod(placeOrderUrl);
CheckoutMock.setupCheckoutMethod(getGeoLocationUrl);
CheckoutMock.passThroughAny();

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            checkoutAvailableFulfilmentUrl,
            createGuestUrl,
            getAddressUrl,
            loginUrl: '/login',
            paymentPageUrlPrefix,
            placeOrderUrl,
            updateCheckoutUrl
        }
    },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
        },

        serviceType: {
            default: select('Service Type', ['collection', 'delivery', 'invalid-url'], 'delivery')
        },

        locale: {
            default: select('Locale', [ENGLISH_LOCALE])
        }
    },
    computed: {
        getCheckoutUrl () {
            return `/checkout-${this.serviceType}.json`;
        },

        getBasketUrl () {
            return `/get-basket-${this.serviceType}.json`;
        },
        paymentPageUrlPrefix: {
            default: text('Payment Page Url Prefix', paymentPageUrlPrefix)
        },
        getGeoLocationUrl: {
            default: text('Get Geo Location Url', getGeoLocationUrl)
        authToken () {
            return this.isLoggedIn ? 'Auth Token' : '';
        }
    },
    store: new Vuex.Store({
        modules: {
            checkout: CheckoutModule,
            analytics: AnalyticsModule
        }
    }),
    template: '<vue-checkout ' +
        ':getCheckoutUrl="getCheckoutUrl" ' +
        ':updateCheckoutUrl="updateCheckoutUrl" ' +
        ':checkout-available-fulfilment-url="checkoutAvailableFulfilmentUrl" ' +
        ':create-guest-url="createGuestUrl" ' +
        ':get-basket-url="getBasketUrl" ' +
        ':authToken="authToken" ' +
        ':locale="locale" ' +
        ':loginUrl="loginUrl" ' +
        ':getAddressUrl="getAddressUrl" ' +
        ':placeOrderUrl="placeOrderUrl" ' +
        ':paymentPageUrlPrefix="paymentPageUrlPrefix" ' +
        ':getGeoLocationUrl="getGeoLocationUrl" ' +
        'applicationName="Storybook" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ':key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix},${getGeoLocationUrl}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
