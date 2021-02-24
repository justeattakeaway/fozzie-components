import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FullAddressContinueWithSuggestion from '../FormFullAddressContinueWithSuggestion.vue';
import { VUEX_MODULE_NAMESPACE } from '../../../services/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    continueWithSuggestionDetails: { postcode: 'B58', street: 'S58, London - 4 Addresses' }
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

describe('`FullAddressSuggestions`', () => {
    function bootstrap (opts = {}) {
        const {
            copy = {}
        } = opts;

        const wrapper = shallowMount(FullAddressContinueWithSuggestion, {
            propsData: {
                copy
            },
            store: createStore(),
            localVue
        });

        return wrapper;
    }

    describe('`getFormattedSelectedAddress`', () => {
        it('should exist', () => {
            const wrapper = bootstrap();

            expect(wrapper.vm.getFormattedSelectedAddress).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND the `address` array length is larger than 2', () => {
                it('should return the `first` index of the array to include the city', () => {
                    // Arrange
                    const wrapper = bootstrap();

                    // Act
                    const result = wrapper.vm.getFormattedSelectedAddress;

                    // Assert
                    expect(result).toBe('\'B58, London\'');
                });

                it('should return the `zero` index of the array when the city is not available', () => {
                    // Arrange
                    const wrapper = shallowMount(FullAddressContinueWithSuggestion, {
                        propsData: {
                            copy: {}
                        },
                        store: createStore({
                            continueWithSuggestionDetails: {
                                street: 'S58, 4 Addresses',
                                postcode: 'B58'
                            }
                        }),
                        localVue
                    });

                    // Act
                    const result = wrapper.vm.getFormattedSelectedAddress;

                    // Assert
                    expect(result).toBe('\'B58, S58\'');
                });
            });
        });
    });
});
