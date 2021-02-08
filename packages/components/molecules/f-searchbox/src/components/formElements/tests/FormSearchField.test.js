import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormSearchField from '../FormSearchField.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    address: '',
    isBelowMid: false,
    inputTimeoutValue: null,
    isStreetNumberRequired: false,
    isGeoLocationAvailable: false,
    isAutocompleteEnabled: false,
    isFullAddressSearchEnabled: true,
    isLoadingResults: false,
    shouldInputFieldHaveFocus: false,
    shouldDisplaySuggestionsDropdown: false,
    shouldShowSuggestionsModal: false
};

const mockActions = {
    clearSuggestions: jest.fn(),
    setAddress: jest.fn(),
    setInputFocus: jest.fn(),
    setInputTimeoutValue: jest.fn(),
    setFocusOnInput: jest.fn(),
    setKeyboardSuggestion: jest.fn(),
    setShouldShowSuggestionModel: jest.fn()
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

describe('`FormSearchField`', () => {
    describe('`toggleEnterLeaveInput`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            expect(wrapper.vm.toggleEnterLeaveInput).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `isBelowMid` is `truthy`', () => {
                it('should make a call to `handleFullAddressModal` to handle when the display of the modal search component', () => {
                    // Arrange
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore({
                            isBelowMid: true
                        }),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, 'handleFullAddressModal');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput();

                    // Assert
                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('AND `isBelowMid` is `falsy`', () => {
                it('should NOT make a call to `handleFullAddressModal`', () => {
                    // Arrange
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, 'handleFullAddressModal');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput();

                    // Assert
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('AND the `value` passed is `truthy`', () => {
                it('should call `setInputFocus` so the input field can gain focus', () => {
                    // Arrange
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, 'setInputFocus');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput(true);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(true);
                });

                it('should `$emit` the `ADDRESS_SEARCH_FOCUS` so we can track the focus event', () => {
                    // Arrange
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput(true);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('address-search-focus');
                });
            });

            describe('AND the `value` passed is `falsy`', () => {
                it('should call `setTimeout` after the `ALLOWED_SELECTION_TIME` so keyboard / mouse selections can happen', () => {
                    // Arrange
                    jest.useFakeTimers();
                    const ALLOWED_SELECTION_TIME = 500;
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });

                    // Act
                    wrapper.vm.toggleEnterLeaveInput(false);

                    // Assert
                    expect(setTimeout).toHaveBeenCalledTimes(1);
                    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), ALLOWED_SELECTION_TIME);
                });

                it('should call `setInputFocus` with the falsy value after the `ALLOWED_SELECTION_TIME` passes', () => {
                    // Arrange
                    jest.useFakeTimers();
                    const ALLOWED_SELECTION_TIME = 500;
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, 'setInputFocus');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput(false);
                    jest.advanceTimersByTime(ALLOWED_SELECTION_TIME);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(false);
                });

                it('should call the `setInputTimeoutValue` action with the `inputTimeoutValue` so we can clear it later', () => {
                    // Arrange
                    jest.useFakeTimers();
                    const ALLOWED_SELECTION_TIME = 500;
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore(),
                        localVue
                    });
                    const spy = jest.spyOn(wrapper.vm, 'setInputTimeoutValue');

                    // Act
                    wrapper.vm.toggleEnterLeaveInput(false);
                    jest.advanceTimersByTime(ALLOWED_SELECTION_TIME);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(3);
                });
            });
        });
    });

    describe('`onCloseModal`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            expect(wrapper.vm.onCloseModal).toBeDefined();
        });

        describe('when invoked', () => {
            it('should set `isFullAddressModalClosed` to `true`', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });

                // Act
                wrapper.vm.onCloseModal();

                // Assert
                expect(wrapper.vm.isFullAddressModalClosed).toBe(true);
            });

            it('should make a call to `setShouldShowSuggestionModel` with the correct value passed', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });
                const spy = jest.spyOn(wrapper.vm, 'setShouldShowSuggestionModel');

                // Act
                wrapper.vm.onCloseModal(false);

                // Assert
                expect(spy).toHaveBeenCalledWith(false);
            });
        });
    });

    describe('`onOpenModal`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            expect(wrapper.vm.onOpenModal).toBeDefined();
        });

        describe('when invoked', () => {
            it('should set `isFullAddressModalClosed` to `false`', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });

                // Act
                wrapper.vm.onOpenModal();

                // Assert
                expect(wrapper.vm.isFullAddressModalClosed).toBe(false);
            });

            it('should make a call to `setShouldShowSuggestionModel` with the correct value passed', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });
                const spy = jest.spyOn(wrapper.vm, 'setShouldShowSuggestionModel');

                // Act
                wrapper.vm.onOpenModal(true);

                // Assert
                expect(spy).toHaveBeenCalledWith(true);
            });
        });
    });

    describe('`onUpdateAddress`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            expect(wrapper.vm.onUpdateAddress).toBeDefined();
        });

        describe('when invoked', () => {
            it('should `$emit` `input` & the event targets `value`', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });
                const event = {
                    target: {
                        value: 'AR5'
                    }
                };
                const spy = jest.spyOn(wrapper.vm, '$emit');

                // Act
                wrapper.vm.onUpdateAddress(event);

                // Assert
                expect(spy).toHaveBeenCalledWith('input', 'AR5');
            });

            describe('AND `isBelowMid` `isFullAddressSearchEnabled` both return truthy', () => {
                it('should call `onOpenModal` to close the address modal on smaller screens', () => {
                    // Arrange
                    const wrapper = shallowMount(FormSearchField, {
                        propsData: {
                            copy: {},
                            service: {}
                        },
                        store: createStore({
                            isBelowMid: true,
                            isFullAddressSearchEnabled: true
                        }),
                        localVue
                    });
                    const event = {
                        target: {
                            value: 'AR5'
                        }
                    };
                    const spy = jest.spyOn(wrapper.vm, 'onOpenModal');

                    // Act
                    wrapper.vm.onUpdateAddress(event);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(true);
                });
            });
        });
    });

    describe('`onClearAddress`', () => {
        it('should exist', () => {
            // Arrange
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            // Act & Assert
            expect(wrapper.vm.onClearAddress).toBeDefined();
        });

        describe('when invoked', () => {
            it('should `setAddress` to an empty string to clear the input field', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });
                const spy = jest.spyOn(wrapper.vm, 'setAddress');

                // Act
                wrapper.vm.onClearAddress();

                // Assert
                expect(spy).toHaveBeenCalledWith('');
            });

            it('should `clearTimeout` on the `inputTimeoutValue` so new searches can resume', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore({
                        inputTimeoutValue: 40
                    }),
                    localVue
                });
                const spy = jest.spyOn(window, 'clearTimeout');

                // Act
                wrapper.vm.onClearAddress();

                // Assert
                expect(spy).toHaveBeenCalledWith(40);
            });

            it('should call `clearSuggestions` to reset results', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {},
                        service: {}
                    },
                    store: createStore(),
                    localVue
                });
                const spy = jest.spyOn(wrapper.vm, 'clearSuggestions');

                // Act
                wrapper.vm.onClearAddress();

                // Assert
                expect(spy).toHaveBeenCalledWith([]);
            });
        });
    });

    describe('`shouldDisplayClearButton`', () => {
        it('should exist', () => {
            // Arrange
            const wrapper = shallowMount(FormSearchField, {
                propsData: {
                    copy: {},
                    service: {}
                },
                store: createStore(),
                localVue
            });

            // Act & Assert
            expect(wrapper.vm.shouldDisplayClearButton).toBeDefined();
        });

        describe('when `truthy`', () => {
            it('should display the clear button component', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {
                            fullAddressSearchSuggestions: {
                                clearSearchBtn: 'Clear search'
                            }
                        },
                        service: {}
                    },
                    store: createStore({
                        isFullAddressSearchEnabled: true,
                        isLoadingResults: false,
                        isBelowMid: false,
                        address: 'AR511AR'
                    }),
                    localVue
                });

                // Act & Assert
                expect(wrapper.find('[data-test-id="search-btn-clear"]').exists()).toBeTruthy();
            });
        });

        describe('when `falsy`', () => {
            it('should NOT display the clear button component', () => {
                // Arrange
                const wrapper = shallowMount(FormSearchField, {
                    propsData: {
                        copy: {
                            fullAddressSearchSuggestions: {
                                clearSearchBtn: 'Clear search'
                            }
                        },
                        service: {}
                    },
                    store: createStore({
                        isFullAddressSearchEnabled: true,
                        isLoadingResults: false,
                        isBelowMid: true,
                        address: 'AR511AR'
                    }),
                    localVue
                });

                // Act & Assert
                expect(wrapper.find('[data-test-id="search-btn-clear"]').exists()).toBeFalsy();
            });
        });
    });
});
