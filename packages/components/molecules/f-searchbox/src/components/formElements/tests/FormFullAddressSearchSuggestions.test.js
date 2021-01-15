import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FullAddressSuggestions from '../FormFullAddressSearchSuggestions.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    suggestions: [
        {
            description: 'NASA',
            id: 'GB|RM|A|20388007',
            text: 'AR511AR'
        },
        {
            postcode: 'SpaceX'
        }
    ]
};

const mockActions = {
    getMatchedAreaAddressResults: jest.fn(),
    setContinueWithDetails: jest.fn()
};

const createStore = (state = mockState, actions = mockActions) => new Vuex.Store({
    modules: {
        searchbox: {
            namespaced: true,
            state,
            actions
        }
    },
    hasModule: jest.fn(() => true)
});

describe('`FullAddressSuggestions`', () => {
    function bootstrap (opts = {}) {
        const {
            noResultsSuggestion = '',
            params = {
                suggestionFormat: suggestion => suggestion
            },
            selected = 0
        } = opts;

        const event = { preventDefault: jest.fn() };

        const wrapper = shallowMount(FullAddressSuggestions, {
            propsData: {
                params,
                noResultsSuggestion,
                selected
            },
            localVue,
            store: createStore()
        });

        return {
            wrapper,
            event
        };
    }

    describe('`methods`', () => {
        describe('`getDescription`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();

                expect(wrapper.vm.getDescription).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return the whole `Description` correctly', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const address = {
                        description: ' Hill 400, Burgberg - 15 address '
                    };

                    // Act
                    const result = wrapper.vm.getDescription(address);

                    // Assert
                    expect(result).toEqual('Hill 400, Burgberg - 15 address');
                });
            });
        });

        describe('`getMatchedPostcodes`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();

                expect(wrapper.vm.getMatchedPostcodes).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return the matched `postcode`', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const address = {
                        text: 'Hill_900'
                    };

                    // Act
                    const result = wrapper.vm.getMatchedPostcodes(address);

                    // Assert
                    expect(result).toEqual('Hill_900');
                });
            });
        });

        describe('`getSelectedStreetAddress`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();

                expect(wrapper.vm.getSelectedStreetAddress).toBeDefined();
            });

            describe('when invoked', () => {
                it('should prevent the default button behaviour', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const event = { preventDefault: jest.fn() };
                    const index = 0;
                    const selected = 0;

                    // Act
                    wrapper.vm.getSelectedStreetAddress(event, index, selected);

                    // Assert
                    expect(event.preventDefault).toHaveBeenCalled();
                });

                it('should invoke `getMatchedAreaAddressResults` to display further results after the users initial selection', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const event = { preventDefault: jest.fn() };
                    const spy = jest.spyOn(wrapper.vm, 'getMatchedAreaAddressResults');
                    const index = 0;
                    const selected = 0;

                    // Act
                    wrapper.vm.getSelectedStreetAddress(event, index, selected);

                    // Assert
                    expect(spy).toHaveBeenCalledWith({
                        address: '',
                        streetLevelAddress: 'GB|RM|A|20388007'
                    });
                });

                it('should invoke `setContinueWithDetails` to allow a user to continue with a default generic address without having to select their actual address', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const event = { preventDefault: jest.fn() };
                    const spy = jest.spyOn(wrapper.vm, 'setContinueWithDetails');
                    const index = 0;
                    const selected = 0;

                    // Act
                    wrapper.vm.getSelectedStreetAddress(event, index, selected);

                    // Assert
                    expect(spy).toHaveBeenCalledWith({
                        postcode: 'AR511AR',
                        street: 'NASA'
                    });
                });
            });
        });
    });

    describe('`computed`', () => {
        describe('`getAddressItems`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();

                expect(wrapper.vm.getAddressItems).toBeDefined();
            });

            describe('when invoked', () => {
                it('should filter out items that include `postcode`', () => {
                    // Arrange
                    const { wrapper } = bootstrap();

                    // Act
                    const result = wrapper.vm.getAddressItems;

                    // Assert
                    expect(result).toEqual([
                        {
                            description: 'NASA',
                            id: 'GB|RM|A|20388007',
                            text: 'AR511AR'
                        }
                    ]);
                });
            });
        });
    });
});
