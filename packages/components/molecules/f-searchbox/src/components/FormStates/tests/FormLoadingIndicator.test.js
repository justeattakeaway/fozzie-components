import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormLoadingIndicator from '../FormLoadingIndicator.vue';
import { VUEX_MODULE_NAMESPACE } from '../../../services/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    isFullAddressSearchEnabled: true,
    isLoadingResults: false
};

const createStore = (state = mockState) => new Vuex.Store({
    modules: {
        [VUEX_MODULE_NAMESPACE]: {
            namespaced: true,
            state
        }
    },
    hasModule: jest.fn(() => true)
});

describe('`FormLoadingIndicator`', () => {
    describe('`shouldDisplayLoadingIndicator`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(FormLoadingIndicator, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            expect(wrapper.vm.shouldDisplayLoadingIndicator).toBeDefined();
        });

        describe('when `truthy`', () => {
            it('should display the loading indicator', () => {
                const wrapper = shallowMount(FormLoadingIndicator, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore({
                        isFullAddressSearchEnabled: true,
                        isLoadingResults: true
                    }),
                    localVue
                });

                expect(wrapper.find('[data-test-id="loading-spinner-indicator"]').exists()).toBeTruthy();
            });
        });

        describe('when `falsy`', () => {
            it('should NOT display the loading indicator', () => {
                const wrapper = shallowMount(FormLoadingIndicator, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore({
                        isFullAddressSearchEnabled: true,
                        isLoadingResults: false
                    }),
                    localVue
                });

                expect(wrapper.find('[data-test-id="loading-spinner-indicator"]').exists()).toBeFalsy();
            });
        });
    });
});
