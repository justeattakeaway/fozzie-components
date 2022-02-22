import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation/src';
import Vuex from 'vuex';
import tenantConfigs from '../../tenants';
import VOffers from '../Offers.vue';
import {
    ACTION_HANDLE_CUSTOMER_DATA,
    ACTION_INITIALISE_OFFERS,
    VUEX_MODULE_NAMESPACE_OFFERS
} from '../../store/types';

const localVue = createLocalVue();

const mockLogger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
};

localVue.use(VueI18n);
localVue.use(Vuex);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const mockBrazeApiKey = '__MOCK_BRAZE_API_KEY__';

describe('Offers', () => {
    let actions;
    let store;

    beforeEach(() => {
        const getters = {
            isAuthenticated: () => false,
            friendlyName: () => null
        };

        actions = {
            [ACTION_HANDLE_CUSTOMER_DATA]: jest.fn(),
            [ACTION_INITIALISE_OFFERS]: jest.fn()
        };

        store = new Vuex.Store({
            modules: {
                [VUEX_MODULE_NAMESPACE_OFFERS]: {
                    namespaced: true,
                    actions,
                    getters
                }
            }
        });
    });

    it('should be defined', () => {
        const propsData = {
            brazeApiKey: mockBrazeApiKey
        };
        const wrapper = shallowMount(VOffers, {
            propsData,
            localVue,
            i18n,
            store,
            mocks: {
                $log: mockLogger
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});
