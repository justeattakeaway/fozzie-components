import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FullAddressSuggestions from '../FormFullAddressSearchSuggestions.vue';
import { VUEX_MODULE_NAMESPACE } from '../../../services/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    address: '',
    isBelowMid: false,
    inputTimeoutValue: 123,
    suggestions: [
        {
            description: 'NASA',
            id: 'GB|RM|A|20388007',
            text: 'AR511AR',
            type: 'Postcode'
        },
        {
            description: 'NASA',
            id: 'GB|RM|A|20388007',
            text: 'Somewhere',
            type: 'Address'
        },
        {
            postcode: 'SpaceX',
            street: 'Hawthorne'
        }
    ]
};

const mockActions = {
    clearSuggestions: jest.fn(),
    setFocusOnInput: jest.fn(),
    setAddress: jest.fn(),
    shouldShowSuggestionsDropdown: jest.fn(),
    getMatchedAreaAddressResults: jest.fn(),
    getFinalAddressSelectionDetails: jest.fn(),
    setContinueWithDetails: jest.fn(),
    setShouldShowSuggestionModel: jest.fn()
};

const createStore = (state = mockState, actions = mockActions) => new Vuex.Store({
    modules: {
        [VUEX_MODULE_NAMESPACE]: {
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

                it('should set the `continueWithDetails`', () => {
                    const { wrapper } = bootstrap();
                    const event = { preventDefault: jest.fn() };
                    const index = 0;
                    const selected = 0;
                    const spy = jest.spyOn(wrapper.vm, 'setContinueWithDetails');

                    wrapper.vm.getSelectedStreetAddress(event, index, selected);

                    expect(spy).toHaveBeenCalledWith({
                        postcode: 'AR511AR',
                        street: 'NASA'
                    });
                });

                describe('AND `selectedAddress` contains a `postcode` key', () => {
                    it('should invoke `setAddress` with the available postcode value', () => {
                        const { wrapper } = bootstrap();
                        const event = { preventDefault: jest.fn() };
                        const index = 0;
                        const selected = 2;
                        const spy = jest.spyOn(wrapper.vm, 'setAddress');

                        wrapper.vm.getSelectedStreetAddress(event, index, selected);

                        expect(spy).toHaveBeenCalledWith('SpaceX');
                    });
                });

                describe('When type of `Address` is selected', () => {
                    it('should invoke `getFinalAddressSelectionDetails` so we can `Retrieve` the final address selection step via Loqate', () => {
                        const { wrapper } = bootstrap();
                        const event = { preventDefault: jest.fn() };
                        const index = 0;
                        const selected = 1;
                        const spy = jest.spyOn(wrapper.vm, 'getFinalAddressSelectionDetails');

                        wrapper.vm.getSelectedStreetAddress(event, index, selected);

                        expect(spy).toHaveBeenCalledWith('GB|RM|A|20388007');
                    });

                    it('should invoke `resetSearch` so we can reset dropdown & modal states', async () => {
                        const { wrapper } = bootstrap();
                        const event = { preventDefault: jest.fn() };
                        const index = 0;
                        const selected = 1;
                        const spy = jest.spyOn(wrapper.vm, 'resetSearch');

                        await wrapper.vm.getSelectedStreetAddress(event, index, selected);

                        expect(spy).toHaveBeenCalled();
                    });
                });

                describe('When type of `Postcode` is selected', () => {
                    it('should invoke `getMatchedAreaAddressResults` so we can `Find` the street level address results via Loqate', () => {
                        const { wrapper } = bootstrap();
                        const event = { preventDefault: jest.fn() };
                        const index = 0;
                        const selected = 0;
                        const spy = jest.spyOn(wrapper.vm, 'getMatchedAreaAddressResults');

                        wrapper.vm.getSelectedStreetAddress(event, index, selected);

                        expect(spy).toHaveBeenCalledWith({
                            address: '',
                            streetLevelAddress: 'GB|RM|A|20388007'
                        });
                    });

                    it('should invoke `setFocusOnInput` so we can focus back on the input field after selection', () => {
                        // Arrange
                        const { wrapper } = bootstrap();
                        const event = { preventDefault: jest.fn() };
                        const index = 0;
                        const selected = 0;
                        const spy = jest.spyOn(wrapper.vm, 'setFocusOnInput');

                        // Act
                        wrapper.vm.getSelectedStreetAddress(event, index, selected);

                        // Assert
                        expect(spy).toHaveBeenCalledWith(true);
                    });

                    describe('AND a timeout value `inputTimeoutValue` already exists', () => {
                        it('should call `clearTimeout` with `inputTimeoutValue` to clear the timeout value', () => {
                            // Arrange
                            const { wrapper } = bootstrap();
                            const event = { preventDefault: jest.fn() };
                            const index = 0;
                            const selected = 0;
                            const spy = jest.spyOn(window, 'clearTimeout');

                            // Act
                            wrapper.vm.getSelectedStreetAddress(event, index, selected);

                            // Assert
                            expect(spy).toHaveBeenCalledWith(123);
                        });
                    });
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

        describe('`resetSearch`', () => {
            it('should exist', () => {
                const { wrapper } = bootstrap();

                expect(wrapper.vm.resetSearch).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `shouldShowSuggestionsDropdown` to hide the suggestions drop down', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const spy = jest.spyOn(wrapper.vm, 'shouldShowSuggestionsDropdown');

                    // Act
                    wrapper.vm.resetSearch();

                    // Assert
                    expect(spy).toHaveBeenCalledWith(false);
                });

                it('should make a call to `clearSuggestions` to clear the `suggestions` results from the API', () => {
                    // Arrange
                    const { wrapper } = bootstrap();
                    const spy = jest.spyOn(wrapper.vm, 'clearSuggestions');

                    // Act
                    wrapper.vm.resetSearch();

                    // Assert
                    expect(spy).toHaveBeenCalledWith([]);
                });

                describe('AND `isBelowMid` is `falsy`', () => {
                    it('should make a call to `setShouldShowSuggestionModel` to hide the modal overlay on small screens', () => {
                        // Arrange
                        const { wrapper } = bootstrap();
                        const spy = jest.spyOn(wrapper.vm, 'setShouldShowSuggestionModel');

                        // Act
                        wrapper.vm.resetSearch();

                        // Assert
                        expect(spy).not.toHaveBeenCalled();
                    });
                });

                describe('AND `isBelowMid` is `truthy`', () => {
                    it('should NOT make a call to `setShouldShowSuggestionModel`', () => {
                        // Arrange
                        const { wrapper } = bootstrap({
                            computed: {
                                isBelowMid: {
                                    get () {
                                        return true;
                                    },
                                    set () {
                                        jest.fn();
                                    }
                                }
                            }
                        });
                        const spy = jest.spyOn(wrapper.vm, 'setShouldShowSuggestionModel');

                        // Act
                        wrapper.vm.resetSearch();

                        // Assert
                        expect(spy).not.toHaveBeenCalledWith(false);
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
                            text: 'AR511AR',
                            type: 'Postcode'
                        },
                        {
                            description: 'NASA',
                            id: 'GB|RM|A|20388007',
                            text: 'Somewhere',
                            type: 'Address'
                        }
                    ]);
                });
            });
        });
    });
});
