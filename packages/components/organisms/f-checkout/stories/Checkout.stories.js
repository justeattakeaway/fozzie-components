import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import CheckoutMock from '../src/demo/checkoutMock';
import CheckoutIssues from '../src/checkout-issues.js';

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

// eslint-disable-next-line
const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
    + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
    + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
    + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
    + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

const checkoutErrors = () => {
    let errors = [];
    errors = Object.keys(CheckoutIssues);
    const test = errors.map(error => {
        const newError = error.replaceAll('_', ' ').toLowerCase();
        return newError.charAt(0).toUpperCase() + newError.slice(1);
    });
    test.unshift('None');
    return test;
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            checkoutAvailableFulfilmentUrl,
            checkoutState: this.$store._modules.root.state.fCheckoutModule,
            createGuestUrl,
            getAddressUrl,
            loginUrl: '/login',
            paymentPageUrlPrefix,
            placeOrderUrl,
            updateCheckoutUrl,
            getGeoLocationUrl
        };
    },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
        },

        serviceType: {
            default: select('Service Type', ['collection', 'delivery', 'invalid-url'], 'delivery')
        },

        locale: {
            default: select('Locale', [locales.gb])
        },

        isAsapAvailable: {
            default: boolean('Is ASAP available', true)
        },

        hasErrors: {
            default: select('Checkout Errors', checkoutErrors())
        }
    },

    computed: {
        getCheckoutUrl () {
            return `/checkout-${this.serviceType}.json`;
        },

        getBasketUrl () {
            return `/get-basket-${this.serviceType}.json`;
        },

        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
        }
    },

    watch: {
        isAsapAvailable () {
            this.checkoutState.availableFulfilment.isAsapAvailable = this.isASAPAvailable;
        }
    },

    store: new Vuex.Store({
        modules: {
            fCheckoutModule,
            fCheckoutAnalyticsModule
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
        'applicationName="Storybook" ' +
        ':getGeoLocationUrl="getGeoLocationUrl" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix},${getGeoLocationUrl}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
