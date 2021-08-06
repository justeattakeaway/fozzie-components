import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import fCheckoutExperimentationModule from '../src/store/checkoutExperimentation.module';
import CheckoutMock from '../src/demo/checkoutMock';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

Vue.use(Vuex);

const paymentPageUrlPrefix = '#/pay';

const urls = {
    getCheckoutDeliveryUrl: '/checkout-delivery.json',
    getCheckoutDeliveryAsapUrl: '/checkout-delivery-user-selected-asap.json',
    getCheckoutDeliveryLaterUrl: '/checkout-delivery-user-selected-later.json',
    getCheckoutDeliveryUnavailableUrl: '/checkout-delivery-user-selected-unavailable-time.json',
    getCheckoutCollectionUrl: '/checkout-collection.json',
    getCheckoutCollectionAsapUrl: '/checkout-collection-user-selected-asap.json',
    getCheckoutCollectionLaterUrl: '/checkout-collection-user-selected-later.json',
    getCheckoutDineInUrl: '/checkout-dinein.json',
    getCheckoutTimeoutUrl: '/checkout-timeout-get-error.json',
    getCheckoutAccessForbiddenUrl: '/checkout-403-get-error.json',
    getCheckoutErrorUrl: '/checkout-500-get-error.json',
    checkoutAvailableFulfilmentUrl: '/checkout-available-fulfilment.json',
    checkoutAvailableFulfilmentNoTimeAvailableUrl: '/checkout-available-fulfilment-no-time-available.json',
    checkoutAvailableFulfilmentPreorderUrl: '/checkout-available-fulfilment-preorder.json',
    createGuestUrl: '/create-guest.json',
    getBasketDeliveryUrl: '/get-basket-delivery.json',
    getBasketCollectionUrl: '/get-basket-collection.json',
    getBasketDineInUrl: '/get-basket-dinein.json',
    getBasketTimeoutUrl: '/get-basket-timeout.json',
    updateCheckoutUrl: '/update-checkout.json',
    updateCheckoutRestaurantNotTakingOrdersUrl: '/update-checkout-restaurant-not-taking-orders.json',
    updateCheckoutAdditionalItemsRequiredUrl: '/update-checkout-additional-items-required.json',
    updateCheckoutAccessForbiddenUrl: '/update-checkout-403.json',
    updateCheckoutUnavailableTimeUrl: '/update-checkout-time-unavailable.json',
    updateCheckoutTimeoutUrl: '/update-checkout-timeout.json',
    getAddressUrl: '/get-address.json',
    placeOrderUrl: '/place-order.json',
    placeOrderDuplicateUrl: '/place-order-duplicate.json',
    placeOrderTimeout: '/place-order-timeout.json',
    getGeoLocationUrl: '/get-geo-location.json',
    getCustomerUrl: '/get-customer.json'
};

CheckoutMock.setupCheckoutMethod(urls.getCheckoutDeliveryUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutDeliveryAsapUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutDeliveryLaterUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutDeliveryUnavailableUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutCollectionUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutCollectionAsapUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutCollectionLaterUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutDineInUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutTimeoutUrl);
CheckoutMock.setupCheckoutMethod(urls.checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(urls.checkoutAvailableFulfilmentNoTimeAvailableUrl);
CheckoutMock.setupCheckoutMethod(urls.checkoutAvailableFulfilmentPreorderUrl);
CheckoutMock.setupCheckoutMethod(urls.createGuestUrl);
CheckoutMock.setupCheckoutMethod(urls.getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(urls.getBasketCollectionUrl);
CheckoutMock.setupCheckoutMethod(urls.getBasketDineInUrl);
CheckoutMock.setupCheckoutMethod(urls.getBasketTimeoutUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutRestaurantNotTakingOrdersUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutAdditionalItemsRequiredUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutAccessForbiddenUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutUnavailableTimeUrl);
CheckoutMock.setupCheckoutMethod(urls.updateCheckoutTimeoutUrl);
CheckoutMock.setupCheckoutMethod(urls.getAddressUrl);
CheckoutMock.setupCheckoutMethod(urls.placeOrderUrl);
CheckoutMock.setupCheckoutMethod(urls.placeOrderDuplicateUrl);
CheckoutMock.setupCheckoutMethod(urls.placeOrderTimeout);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutAccessForbiddenUrl);
CheckoutMock.setupCheckoutMethod(urls.getCheckoutErrorUrl);
CheckoutMock.setupCheckoutMethod(urls.getGeoLocationUrl);
CheckoutMock.setupCheckoutMethod(urls.getCustomerUrl);

CheckoutMock.passThroughAny();

const restraurantNotTakingOrders = 'Restaurant Not Taking Orders Issue (Response from server but order not fulfillable)';
const additionalItemsRequired = 'Additional Items Required Issue (Response from server but order not fulfillable)';
const updateCheckoutAccessForbidden = 'Access Forbidden (Response from server is 403)';
const checkoutServerError = 'Checkout Error (Response from server is an error)';
const placeOrderError = 'Place Order Duplicate Error (Response from server is an error)';
const accessForbiddenError = 'Access Forbidden Get Checkout Error (Response from server is an error)';
const getCheckoutError = 'Any other Get Checkout Error (Response from server is an error)';
const SERVER = 'SERVER';
const accessForbiddenErrorCode = '403';
const getCheckoutErrorCode = '500';
const noTimeAvailableError = 'No Time Available';
const noTimeAvailable = 'no-time-available';
const ageRestriction = 'Age restricted';
const ageRestrictionIssue = 'age-restriction';
const restraurantNotTakingOrdersIssue = 'restaurant-not-taking-orders';
const additionalItemsRequiredIssue = 'additional-items-required';
const timeNotAvailable = 'Selected time no longer available';
const timeNotAvailableIssue = 'time-unavailable';
const serverTimeout = 'Server timeout';
const serverTimeoutIssue = 'timeout';
const duplicateIssue = 'duplicate';

const patchCheckoutErrorOptions = {
    None: null,
    [restraurantNotTakingOrders]: restraurantNotTakingOrdersIssue,
    [additionalItemsRequired]: additionalItemsRequiredIssue,
    [checkoutServerError]: SERVER,
    [updateCheckoutAccessForbidden]: accessForbiddenErrorCode,
    [timeNotAvailable]: timeNotAvailableIssue,
    [serverTimeout]: serverTimeoutIssue
};

const restrictionOptions = {
    None: null,
    [ageRestriction]: ageRestrictionIssue
};

const getCheckoutErrorOptions = {
    None: null,
    [accessForbiddenError]: accessForbiddenErrorCode,
    [getCheckoutError]: getCheckoutErrorCode,
    [noTimeAvailableError]: noTimeAvailable,
    [serverTimeout]: serverTimeoutIssue
};

const placeOrderErrorOptions = {
    None: null,
    [placeOrderError]: duplicateIssue,
    [serverTimeout]: serverTimeoutIssue
};

const fulfilmentTimeOptions = {
    none: null,
    'Selected Asap Time': 'user-selected-asap',
    'Selected Later Time': 'user-selected-later',
    'Selected Unavailable Time': 'user-selected-unavailable-time'
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
            createGuestUrl: urls.createGuestUrl,
            getAddressUrl: urls.getAddressUrl,
            loginUrl: '/login',
            paymentPageUrlPrefix,
            getGeoLocationUrl: urls.getGeoLocationUrl,
            getCustomerUrl: urls.getCustomerUrl
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

        patchCheckoutError: {
            default: select('Patch Checkout Errors', patchCheckoutErrorOptions)
        },

        getCheckoutError: {
            default: select('Get Checkout Errors', getCheckoutErrorOptions, null)
        },

        placeOrderError: {
            default: select('Place Order Errors', placeOrderErrorOptions)
        },

        fulfilmentTimeSelection: {
            default: select('Fulfilment Time Options', fulfilmentTimeOptions)
        },

        restriction: {
            default: select('Restrictions', restrictionOptions)
        }
    },

    computed: {
        getCheckoutUrl () {
            if (this.fulfilmentTimeSelection) {
                return `/checkout-${this.serviceType}-${this.fulfilmentTimeSelection}.json`;
            }

            return this.getCheckoutError && this.getCheckoutError !== noTimeAvailable ?
                `/checkout-${this.getCheckoutError}-get-error.json` : `/checkout-${this.serviceType}.json`;
        },

        getBasketUrl () {
            if (this.getCheckoutError) {
                if (this.getCheckoutError !== noTimeAvailable) {
                    return `/checkout-${this.getCheckoutError}-get-error.json`;
                }
            }
            return this.restriction ? `/get-basket-delivery-${this.restriction}.json` : `/get-basket-${this.serviceType}.json`;
        },

        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
        },

        updateCheckoutUrl () {
            if (this.patchCheckoutError) {
                return `/update-checkout-${this.patchCheckoutError}.json`;
            }

            return urls.updateCheckoutUrl;
        },

        placeOrderUrl () {
            return this.placeOrderError ? `/place-order-${this.placeOrderError}.json` : urls.placeOrderUrl;
        },

        checkoutAvailableFulfilmentUrl () {
            if (this.getCheckoutError === noTimeAvailable) {
                return checkoutAvailableFulfilmentNoTimeAvailableUrl;
            }
            return this.isAsapAvailable ? urls.checkoutAvailableFulfilmentUrl : urls.checkoutAvailableFulfilmentPreorderUrl;
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
            fCheckoutAnalyticsModule,
            fCheckoutExperimentationModule
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
        ':getCustomerUrl="getCustomerUrl" ' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix},${getGeoLocationUrl}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
