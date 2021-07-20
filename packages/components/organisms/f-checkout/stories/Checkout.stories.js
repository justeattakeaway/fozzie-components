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

const getCheckoutDeliveryUrl = '/checkout-delivery.json';
const getCheckoutDeliveryAsapUrl = '/checkout-delivery-user-selected-asap.json';
const getCheckoutDeliveryLaterUrl = '/checkout-delivery-user-selected-later.json';
const getCheckoutDeliveryUnavailableUrl = '/checkout-delivery-user-selected-unavailable-time.json';
const getCheckoutCollectionUrl = '/checkout-collection.json';
const getCheckoutCollectionAsapUrl = '/checkout-collection-user-selected-asap.json';
const getCheckoutCollectionLaterUrl = '/checkout-collection-user-selected-later.json';
const getCheckoutDineInUrl = '/checkout-dinein.json';
const getCheckoutWithDeliveryAndKitchenNoteTypesUrl = '/checkout-delivery-split-notes-delivery-kitchen.json';
const getCheckoutWithDeliveryNoteTypeUrl = '/checkout-delivery-split-notes-delivery.json';
const getCheckoutTimeoutUrl = '/checkout-timeout-get-error.json';
const getCheckoutAccessForbiddenUrl = '/checkout-403-get-error.json';
const getCheckoutErrorUrl = '/checkout-500-get-error.json';
const checkoutAvailableFulfilmentUrl = '/checkout-available-fulfilment.json';
const checkoutAvailableFulfilmentNoTimeAvailableUrl = '/checkout-available-fulfilment-no-time-available.json';
const checkoutAvailableFulfilmentPreorderUrl = '/checkout-available-fulfilment-preorder.json';
const createGuestUrl = '/create-guest.json';
const getBasketDeliveryUrl = '/get-basket-delivery.json';
const getBasketCollectionUrl = '/get-basket-collection.json';
const getBasketDineInUrl = '/get-basket-dinein.json';
const getBasketTimeoutUrl = '/get-basket-timeout.json';
const updateCheckoutUrl = '/update-checkout.json';
const updateCheckoutRestaurantNotTakingOrdersUrl = '/update-checkout-restaurant-not-taking-orders.json';
const updateCheckoutAdditionalItemsRequiredUrl = '/update-checkout-additional-items-required.json';
const updateCheckoutAccessForbiddenUrl = '/update-checkout-403.json';
const updateCheckoutUnavailableTimeUrl = '/update-checkout-time-unavailable.json';
const updateCheckoutTimeoutUrl = '/update-checkout-timeout.json';
const getAddressUrl = '/get-address.json';
const placeOrderUrl = '/place-order.json';
const placeOrderDuplicateUrl = '/place-order-duplicate.json';
const placeOrderTimeout = '/place-order-timeout.json';
const paymentPageUrlPrefix = '#/pay'; // Adding the "#" so we don't get redirect out of the component in Storybook
const getGeoLocationUrl = '/get-geo-location.json';
const getCustomerUrl = '/get-customer.json';

CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryAsapUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryLaterUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutDeliveryUnavailableUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionAsapUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutCollectionLaterUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutDineInUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutWithDeliveryAndKitchenNoteTypesUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutWithDeliveryNoteTypeUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutTimeoutUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentNoTimeAvailableUrl);
CheckoutMock.setupCheckoutMethod(checkoutAvailableFulfilmentPreorderUrl);
CheckoutMock.setupCheckoutMethod(createGuestUrl);
CheckoutMock.setupCheckoutMethod(getBasketDeliveryUrl);
CheckoutMock.setupCheckoutMethod(getBasketCollectionUrl);
CheckoutMock.setupCheckoutMethod(getBasketDineInUrl);
CheckoutMock.setupCheckoutMethod(getBasketTimeoutUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutRestaurantNotTakingOrdersUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutAdditionalItemsRequiredUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutAccessForbiddenUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutUnavailableTimeUrl);
CheckoutMock.setupCheckoutMethod(updateCheckoutTimeoutUrl);
CheckoutMock.setupCheckoutMethod(getAddressUrl);
CheckoutMock.setupCheckoutMethod(placeOrderUrl);
CheckoutMock.setupCheckoutMethod(placeOrderDuplicateUrl);
CheckoutMock.setupCheckoutMethod(placeOrderTimeout);
CheckoutMock.setupCheckoutMethod(getCheckoutAccessForbiddenUrl);
CheckoutMock.setupCheckoutMethod(getCheckoutErrorUrl);
CheckoutMock.setupCheckoutMethod(getGeoLocationUrl);
CheckoutMock.setupCheckoutMethod(getCustomerUrl);

CheckoutMock.passThroughAny();

const restraurantNotTakingOrders = 'Restaurant Not Taking Orders Issue (Response from server but order not fulfillable)';
const additionalItemsRequired = 'Additional Items Required Issue (Response from server but order not fulfillable)';
const updateCheckoutAccessForbidden = 'Access Forbidden (Response from server is 403)';
const checkoutServerError = 'Checkout Error (Response from server is an error)';
const placeOrderError = 'Place Order Duplicate Error (Response from server is an error)';
const accessForbiddenError = 'Access Forbidden Get Checkout Error (Response from server is an error)';
const getCheckoutError = 'Any other Get Checkout Error (Response from server is an error)';

// Note types
const noteTypesDeliveryAndKitchen = 'Delivery and Kitchen notes';
const noteTypesDelivery = 'Delivery notes only';

const splitNotesDeliveryKitchen = '-split-notes-delivery-kitchen';
const splitNotesDelivery = '-split-notes-delivery';

const noteTypeOptions = {
    None: null,
    [noteTypesDelivery]: splitNotesDelivery,
    [noteTypesDeliveryAndKitchen]: splitNotesDeliveryKitchen
};

const SERVER = 'SERVER';
const accessForbiddenErrorCode = '403';
const getCheckoutErrorCode = '500';
const noTimeAvailableError = 'No Time Available';
const noTimeAvailable = 'no-time-available';
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
            createGuestUrl,
            getAddressUrl,
            loginUrl: '/login',
            paymentPageUrlPrefix,
            getGeoLocationUrl,
            getCustomerUrl
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

        noteTypes: {
            default: select('Note types', noteTypeOptions)
        },

        fulfilmentTimeSelection: {
            default: select('Fulfilment Time Options', fulfilmentTimeOptions)
        }
    },

    computed: {
        getCheckoutUrl () {
            const noteType = this.noteTypes || '';

            if (this.fulfilmentTimeSelection) {
                return `/checkout-${this.serviceType}-${this.fulfilmentTimeSelection}.json`;
            }

            if (this.getCheckoutError && this.getCheckoutError !== noTimeAvailable) {
                return `/checkout-${this.getCheckoutError}-get-error.json`;
            }

            // TODO: Get this working alongside the fulfilment time selection
            return this.serviceType === 'delivery' ? `/checkout-${this.serviceType}${noteType}.json` : `/checkout-${this.serviceType}.json`;
        },

        getBasketUrl () {
            return this.getCheckoutError && this.getCheckoutError !== noTimeAvailable ?
                `/checkout-${this.getCheckoutError}-get-error.json` : `/get-basket-${this.serviceType}.json`;
        },

        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
        },

        updateCheckoutUrl () {
            if (this.patchCheckoutError) {
                return `/update-checkout-${this.patchCheckoutError}.json`;
            }

            return updateCheckoutUrl;
        },

        placeOrderUrl () {
            return this.placeOrderError ? `/place-order-${this.placeOrderError}.json` : placeOrderUrl;
        },

        checkoutAvailableFulfilmentUrl () {
            if (this.getCheckoutError === noTimeAvailable) {
                return checkoutAvailableFulfilmentNoTimeAvailableUrl;
            }
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
