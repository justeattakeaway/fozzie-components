import Vuex from 'vuex';
import { CHECKOUT_METHOD_DELIVERY, VUEX_CHECKOUT_MODULE, VUEX_CHECKOUT_ANALYTICS_MODULE } from '../../../constants';
import tenantConfigs from '../../../tenants';

const fulfilmentTimes = [
    {
        from: '2020-01-01T01:00:00.000Z',
        to: '2020-01-01T01:00:00.000Z'
    },
    {
        from: '2020-01-01T01:15:00.000Z',
        to: '2020-01-01T01:15:00.000Z'
    }
];

const defaultCheckoutState = {
    id: '',
    serviceType: CHECKOUT_METHOD_DELIVERY,
    restaurant: {
        id: '',
        seoName: ''
    },
    basket: {
        id: '',
        total: 0
    },
    customer: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@test.com',
        mobileNumber: '+447111111111'
    },
    orderId: 'ORDER111',
    time: {
        from: '',
        to: ''
    },
    address: {
        line1: '1 Bristol Road',
        line2: 'Flat 1',
        locality: 'Bristol',
        postcode: 'BS1 1AA'
    },
    availableFulfilment: {
        times: fulfilmentTimes,
        isAsapAvailable: true
    },
    isFulfillable: true,
    notices: [],
    message: null,
    messages: [],
    authToken: '',
    isLoggedIn: false,
    errors: [],
    userNote: 'No ketchup, please.',
    geolocation: null
};

const defaultAnalyticsState = {
    autofill: [],
    changedFields: []
};

const defaultCheckoutActions = {
    getCheckout: jest.fn(),
    updateCheckout: jest.fn(),
    updateMessage: jest.fn(),
    getAvailableFulfilment: jest.fn(),
    setAuthToken: jest.fn(),
    createGuestUser: jest.fn(),
    updateAddressDetails: jest.fn(),
    updateCustomerDetails: jest.fn(),
    updateTableIdentifier: jest.fn(),
    updateFulfilmentTime: jest.fn(),
    getGeoLocation: jest.fn(),
    getBasket: jest.fn(),
    getAddress: jest.fn(),
    placeOrder: jest.fn(),
    getCustomerName: jest.fn(),
    updateHasAsapSelected: jest.fn(),
    getUserNote: jest.fn(),
    saveUserNote: jest.fn()
};

const defaultAnalyticsActions = {
    trackDuplicateOrderWarnDialog: jest.fn(),
    trackFormErrors: jest.fn(),
    trackFormInteraction: jest.fn(),
    trackInitialLoad: jest.fn(),
    updateAutofill: jest.fn(),
    updateChangedField: jest.fn()
};

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    },
    dateTimeFormats: {
        'en-GB': tenantConfigs['en-GB'].dateTimeFormats
    }
};

const createStore = (
    checkoutState = defaultCheckoutState,
    checkoutActions = defaultCheckoutActions,
    analyticsState = defaultAnalyticsState,
    analyticsActions = defaultAnalyticsActions
) => new Vuex.Store({
    modules: {
        [VUEX_CHECKOUT_MODULE]: {
            namespaced: true,
            state: checkoutState,
            actions: checkoutActions
        },
        [VUEX_CHECKOUT_ANALYTICS_MODULE]: {
            namespaced: true,
            state: analyticsState,
            actions: analyticsActions
        },
        hasModule: jest.fn(() => true)
    }
});

const $logger = {
    logInfo: jest.fn(),
    logWarn: jest.fn(),
    logError: jest.fn()
};

// eslint-disable-next-line
const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsInBob25lX251bWJlciI6IjAxMjM0NTY3ODkiLCJtb2JpbGVfbnVtYmVyIjoiOTg3NjU0MzIxMCIsImlhdCI6MTYxNTQ2OTUxNn0.5NJxvUBHCpVAo7MMq02_yvVr4UKWcFtm2tjrLY0JzWw';
const mockAuthTokenNoNumbers = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.yLXN84pcRRn9O_mdPHkVj18TgrH2i9Q1_V9020B2h7s';
const mockAuthTokenNoMobileNumber = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsInBob25lX251bWJlciI6IjAxMjM0NTY3ODkiLCJpYXQiOjE2MTU0Njk1MTZ9.tZaClhRU8JHBoGU3LWwDPNiGKx0ecMQFtXxwqpPbDhQ';

const $cookies = {
    get: jest.fn(),
    remove: jest.fn()
};

export {
    fulfilmentTimes,
    defaultCheckoutState,
    defaultCheckoutActions,
    defaultAnalyticsState,
    i18n,
    createStore,
    $logger,
    $cookies,
    mockAuthToken,
    mockAuthTokenNoNumbers,
    mockAuthTokenNoMobileNumber
};

