import Vuex from 'vuex';
import { CHECKOUT_METHOD_DELIVERY } from '../../../constants';
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

const defaultState = {
    id: '',
    serviceType: CHECKOUT_METHOD_DELIVERY,
    restaurantId: '',
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
    time: {
        from: '',
        to: ''
    },
    address: {
        line1: '1 Bristol Road',
        line2: 'Flat 1',
        city: 'Bristol',
        postcode: 'BS1 1AA'
    },
    availableFulfilment: {
        times: fulfilmentTimes,
        isAsapAvailable: true
    },
    isFulfillable: true,
    notices: [],
    messages: [],
    authToken: '',
    isLoggedIn: false,
    userNote: '',
    autofill: [],
    changes: []
};

const defaultAnalyticsState = {
    serviceType: CHECKOUT_METHOD_DELIVERY,
    restaurantId: '',
    basket: {
        id: '',
        total: 0
    },
    autofill: [],
    changes: []
};

const defaultActions = {
    getCheckout: jest.fn(),
    updateCheckout: jest.fn(),
    getAvailableFulfilment: jest.fn(),
    setAuthToken: jest.fn(),
    createGuestUser: jest.fn(),
    updateAddressDetails: jest.fn(),
    updateCustomerDetails: jest.fn(),
    updateFulfilmentTime: jest.fn(),
    getBasket: jest.fn(),
    getAddress: jest.fn()
};

const defaultAnalyticsActions = {
    updateState: jest.fn(),
    updateFieldChanges: jest.fn(),
    trackInitialLoad: jest.fn(),
    trackFormInteraction: jest.fn()
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
    state = defaultState,
    actions = defaultActions,
    analyticsState = defaultAnalyticsState,
    analyticsActions = defaultAnalyticsActions
) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state,
            actions
        },
        analytics: {
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

export {
    fulfilmentTimes,
    defaultState,
    defaultActions,
    i18n,
    createStore,
    $logger
};
