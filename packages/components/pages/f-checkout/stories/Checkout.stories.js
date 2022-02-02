import Vue from 'vue';
import Vuex from 'vuex';
import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import fCheckoutModule from '../src/store/checkout.module';
import fCheckoutAnalyticsModule from '../src/store/checkoutAnalytics.module';
import fCheckoutExperimentationModule from '../src/store/checkoutExperimentation.module';
import CheckoutMock from './demo/checkoutMock';
import mockedRequests from './demo/mockResponses';
import { TENANT_MAP } from '../src/constants';

export default {
    title: 'Components/Pages',
    decorators: [withA11y],
    parameters: {
        layout: 'fullscreen'
    }
};

Vue.use(Vuex);

const paymentPageUrlPrefix = '#/pay';

CheckoutMock();

const restraurantNotTakingOrders = 'Restaurant Not Taking Orders Issue (Response from server but order not fulfillable)';
const serviceTypeUnavailable = 'ServiceType is not available (Response from server but order not fulfillable)';
const additionalItemsRequired = 'Additional Items Required Issue (Response from server but order not fulfillable)';
const updateCheckoutAccessForbidden = 'Access Forbidden (Response from server is 403)';
const checkoutServerError = 'Checkout Error (Response from server is an error)';
const placeOrderError = 'Place Order Duplicate Error (Response from server is an error)';
const accessForbiddenError = 'Access Forbidden Get Checkout Error (Response from server is an error)';
const getCheckoutError = 'Any other Get Checkout Error (Response from server is an error)';
const invalidProductsError = 'Basket contains invalid products';
const offlineProductsError = 'Basket contains offline products';
const createGuestError = 'Create Guest Error';
const SERVER = 'SERVER';
const accessForbiddenErrorCode = '403';
const getCheckoutErrorCode = '500';
const noTimeAvailableError = 'No Time Available';
const noTimeAvailable = 'no-time-available';
const ageRestriction = 'Age restricted';
const ageRestrictionIssue = 'age-restriction';
const restraurantNotTakingOrdersIssue = 'restaurant-not-taking-orders';
const serviceTypeUnavailableIssue = 'service-type-unavailable';
const additionalItemsRequiredIssue = 'additional-items-required';
const timeNotAvailable = 'Selected time no longer available';
const timeNotAvailableIssue = 'time-unavailable';
const geolocationRequired = 'Geolocation required';
const geolocationRequiredIssue = 'geolocation-required';
const invalidProductsErrorCode = 'invalid-products';
const offlineProductsErrorCode = 'offline-products';
const createGuestErrorCode = 'error';
const serverTimeout = 'Server timeout';
const serverTimeoutIssue = 'timeout';
const duplicateIssue = 'duplicate';

const legacyNotes = 'Legacy notes';
const noteTypesDeliveryAndKitchen = 'Delivery and Kitchen notes';
const noteTypesCombined = 'Combined note';
const noteTypesCombinedValue = 'get-notes-config';

const noteTypeOptions = {
    [legacyNotes]: null,
    [noteTypesCombined]: noteTypesCombinedValue,
    [noteTypesDeliveryAndKitchen]: 'get-notes-config-split'
};

const patchCheckoutErrorOptions = {
    None: null,
    [restraurantNotTakingOrders]: restraurantNotTakingOrdersIssue,
    [serviceTypeUnavailable]: serviceTypeUnavailableIssue,
    [additionalItemsRequired]: additionalItemsRequiredIssue,
    [checkoutServerError]: SERVER,
    [updateCheckoutAccessForbidden]: accessForbiddenErrorCode,
    [timeNotAvailable]: timeNotAvailableIssue,
    [geolocationRequired]: geolocationRequiredIssue,
    [serverTimeout]: serverTimeoutIssue
};

const restrictionOptions = {
    None: null,
    [ageRestriction]: ageRestrictionIssue
};

const createGuestErrorOptions = {
    None: null,
    [createGuestError]: createGuestErrorCode
};

const getCheckoutErrorOptions = {
    None: null,
    [accessForbiddenError]: accessForbiddenErrorCode,
    [getCheckoutError]: getCheckoutErrorCode,
    [noTimeAvailableError]: noTimeAvailable,
    [serverTimeout]: serverTimeoutIssue
};

const getBasketErrorOptions = {
    None: null,
    [invalidProductsError]: invalidProductsErrorCode,
    [offlineProductsError]: offlineProductsErrorCode
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

const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    data () {
        return {
            loginUrl: '/login',
            paymentPageUrlPrefix,
            getGeoLocationUrl: mockedRequests.getGeoLocation.url,
            getCustomerUrl: mockedRequests.getCustomer.url
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
            default: select('Locale', [locales.gb, locales.au, locales.nz], locales.gb)
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

        createGuestError: {
            default: select('Create Guest Errors', createGuestErrorOptions, null)
        },

        getBasketError: {
            default: select('Get Basket Errors', getBasketErrorOptions, null)
        },

        placeOrderError: {
            default: select('Place Order Errors', placeOrderErrorOptions)
        },

        fulfilmentTimeSelection: {
            default: select('Fulfilment Time Options', fulfilmentTimeOptions)
        },

        restriction: {
            default: select('Restrictions', restrictionOptions)
        },

        noteType: {
            default: select('Note types', noteTypeOptions, null)
        }
    },

    computed: {
        createGuestUrl () {
            return this.createGuestError ? mockedRequests.createGuestError.url : mockedRequests.createGuest.url;
        },

        getCheckoutUrl () {
            let url;
            if (this.fulfilmentTimeSelection) {
                url = `/checkout-${this.serviceType}-${this.fulfilmentTimeSelection}.json`;
            }

            if (this.getCheckoutError && this.getCheckoutError !== noTimeAvailable) {
                url = `/checkout-${this.getCheckoutError}-get-error.json`;
            } else {
                url = `/${TENANT_MAP[this.locale]}/checkout-${this.serviceType}.json`;
            }

            return url;
        },

        getBasketUrl () {
            if (this.getCheckoutError) {
                if (this.getCheckoutError !== noTimeAvailable) {
                    return `/checkout-${this.getCheckoutError}-get-error.json`;
                }
            }

            if (this.getBasketError) {
                return `/get-basket-${this.getBasketError}.json`;
            }

            return this.restriction ? `/get-basket-delivery-${this.restriction}.json` : `/get-basket-${this.serviceType}.json`;
        },

        getAddressUrl () {
            return `/${TENANT_MAP[this.locale]}/get-address.json`;
        },

        authToken () {
            return this.isLoggedIn ? mockAuthToken : '';
        },

        updateCheckoutUrl () {
            if (this.patchCheckoutError) {
                return `/update-checkout-${this.patchCheckoutError}.json`;
            }

            return mockedRequests.updateCheckout.url;
        },

        placeOrderUrl () {
            return this.placeOrderError ? `/place-order-${this.placeOrderError}.json` : mockedRequests.placeOrder.url;
        },

        checkoutAvailableFulfilmentUrl () {
            if (this.getCheckoutError === noTimeAvailable) {
                return mockedRequests.checkoutAvailableFulfilmentNoTimeAvailable.url;
            }
            return this.isAsapAvailable ? mockedRequests.checkoutAvailableFulfilment.url : mockedRequests.checkoutAvailableFulfilmentPreorder.url;
        },

        getNoteConfigUrl () {
            return this.noteType ? `/${this.noteType}` : '';
        },

        checkoutFeatures () {
            return {
                isSplitNotesEnabled: this.noteType !== null
            };
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
        ':getNoteConfigUrl="getNoteConfigUrl" ' +
        ':checkoutFeatures="checkoutFeatures"' +
        // eslint-disable-next-line no-template-curly-in-string
        ' :key="`${locale},${getCheckoutUrl},${updateCheckoutUrl},${checkoutAvailableFulfilmentUrl},${authToken},${createGuestUrl},${getBasketUrl},${getAddressUrl},${placeOrderUrl},${paymentPageUrlPrefix},${getGeoLocationUrl},${getNoteConfigUrl},${checkoutFeatures}`" />'
});

CheckoutComponent.storyName = 'f-checkout';
