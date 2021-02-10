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
    userNote: ''
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

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    },
    dateTimeFormats: {
        'en-GB': tenantConfigs['en-GB'].dateTimeFormats
    }
};

const createStore = (state = defaultState, actions = defaultActions) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state,
            actions
        },
        hasModule: jest.fn(() => true)
    }
});

export {
    fulfilmentTimes, defaultState, defaultActions, i18n, createStore
};
