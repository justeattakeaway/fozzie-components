import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SelfExclusion from '../SelfExclusion.vue';
import {
    createStore,
    i18n,
    $log
} from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('SelfExclusion', () => {
    it('should be defined', () => {
        const propsData = {
            authToken: '',
            smartGatewayBaseUrl: ''
        };
        const wrapper = shallowMount(SelfExclusion, {
            store: createStore(),
            localVue,
            propsData,
            i18n,
            mocks: {
                $log
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});
