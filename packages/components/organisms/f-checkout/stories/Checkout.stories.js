import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import CheckoutMock from '../src/demo/checkoutMock';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

Vue.use(Vuex);

const getCheckoutDeliveryUrl = '/checkout-delivery.json';
const getCheckoutCollectionUrl = '/checkout-collection.json';
const getCheckoutDineInUrl = '/checkout-dinein.json';
const checkoutAvailableFulfilmentUrl = '/checkout-available-fulfilment.json';
const checkoutAvailableFulfilmentPreorderUrl = '/checkout-available-fulfilment-preorder.json';
const createGuestUrl = '/create-guest.json';
const getBasketDeliveryUrl = '/get-basket-delivery.json';
const getBasketCollectionUrl = '/get-basket-collection.json';
const getBasketDineInUrl = '/get-basket-dinein.json';
const updateCheckoutUrl = '/update-checkout.json';
const updateCheckoutErrorsUrl = '/update-checkout-errors.json';
const updateCheckoutServerErrorUrl = '/update-checkout-server-error.json';
const getAddressUrl = '/get-address.json';
const placeOrderUrl = '/place-order.json';
const placeOrderDuplicateUrl = '/place-order-duplicate.json';
const paymentPageUrlPrefix = '#/pay'; // Adding the "#" so we don't get redirect out of the component in Storybook
const getGeoLocationUrl = '/get-geo-location.json';

CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutDineInUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentPreorderUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.setupCheckoutMethod(getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getBasketCollectionUrl);
CheckoutMock.setupCheckoutMethod(getBasketDineInUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutErrorsUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutServerErrorUrl);
CheckoutMock.setupCheckoutMethod(getAddressUrl);
CheckoutMock.setupCheckoutMethod(placeOrderUrl);
CheckoutMock.setupCheckoutMethod(placeOrderDuplicateUrl);
CheckoutMock.setupCheckoutMethod(getGeoLocationUrl);
CheckoutMock.passThroughAny();

const checkoutIssues = 'Checkout Issues (Response from server but order not fulfillable)';
const checkoutServerError = 'Checkout Error (Response from server is an error)';
const placeOrderError = 'Place Order Duplicate Error (Response from server is an error)';
const ISSUES = 'ISSUES';
const SERVER = 'SERVER';

const checkoutErrorOptions = {
    None: null,
    [checkoutIssues]: ISSUES,
    [checkoutServerError]: SERVER
};

const placeOrderErrorOptions = {
    None: null,
    [placeOrderError]: SERVER
};

// eslint-disable-next-line
const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
    + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
    + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
    + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
    + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            createGuestUrl,
            getAddressUrl,
            loginUrl: '/login',
            paymentPageUrlPrefix,
            getGeoLocationUrl
        };
    },
    props: {
        isLoggedIn: {
            default: boolean('Is User Logged In', false)
        },

        serviceType: {
            default: select('Service Type', ['collection', 'delivery', 'dinein', 'invalid-url'], 'delivery')
        },

        locale: {
            default: select('Locale', [locales.gb])
        },

        isAsapAvailable: {
            default: boolean('Is ASAP available', true)
        },

        checkoutError: {
            default: select('Checkout Errors', checkoutErrorOptions)
        },

        placeOrderError: {
            default: select('Place Order Errors', placeOrderErrorOptions)
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
        },

        updateCheckoutUrl () {
            if (this.checkoutError) {
                return this.checkoutError === SERVER ? updateCheckoutServerErrorUrl : updateCheckoutErrorsUrl;
            }

            return updateCheckoutUrl;
        },

        placeOrderUrl () {
            return this.placeOrderError === SERVER ? placeOrderDuplicateUrl : placeOrderUrl;
        },

        checkoutAvailableFulfilmentUrl () {
            return this.isAsapAvailable ? checkoutAvailableFulfilmentUrl : checkoutAvailableFulfilmentPreorderUrl;
        }
    },

    methods: {
        otacToAuthExchanger () {
            return mockAuthToken;
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
        ':otacToAuthExchanger="otacToAuthExchanger"' +
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
