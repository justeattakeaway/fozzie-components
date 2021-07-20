import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import Vuex from 'vuex';
import VLoyalty from '../Loyalty.vue';
import tenantConfigs from '../../tenants';
import { ACTION_INITIALISE_LOYALTY, VUEX_MODULE_NAMESPACE_LOYALTY } from '../../store/types';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const mockBrazeApiKey = '__MOCK_BRAZE_API_KEY__';

describe('Loyalty', () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            [ACTION_INITIALISE_LOYALTY]: jest.fn()
        };

        store = new Vuex.Store({
            modules: {
                [VUEX_MODULE_NAMESPACE_LOYALTY]: {
                    namespaced: true,
                    actions
                }
            }
        });
    });

    it('should be defined', () => {
        const propsData = {
            brazeApiKey: mockBrazeApiKey
        };
        const wrapper = shallowMount(VLoyalty, {
            propsData,
            localVue,
            i18n,
            store
        });
        expect(wrapper.exists()).toBe(true);
    });
});
