import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Form from '../Form.vue';
import * as processLocationCookie from '../../services/general.services';
import * as searchService from '../../services/search.services';
import { getLastLocation } from '../../utils/helpers';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    errors: [],
    isValid: true
};

const mockActions = {
    setErrors: jest.fn(),
    setIsValid: jest.fn(),
    setIsDirty: jest.fn(),
    setGeoLocationAvailability: jest.fn()
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

describe('`Form`', () => {
    let event;

    beforeEach(() => {
        event = { preventDefault: jest.fn() };
    });

    it('should be defined', () => {
        // Arrange
        const propsData = {
            config: {
                address: 'something',
                locationFormat: () => jest.fn()
            },
            service: {
                isValid: jest.fn(() => [])
            }
        };

        const wrapper = shallowMount(Form, {
            propsData,
            store: createStore(),
            localVue
        });

        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('methods', () => {
        describe('`submit` handler', () => {
            it('should exist', () => {
                // Arrange
                const propsData = {
                    config: {
                        address: 'something',
                        locationFormat: () => jest.fn()
                    },
                    service: {
                        isValid: jest.fn(() => [])
                    }
                };

                const wrapper = shallowMount(Form, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                // Act & Assert
                expect(wrapper.vm.submit).toBeDefined();
            });

            describe('when invoked', () => {
                it('should call isValid `service` with `address`', () => {
                    // Arrange
                    const propsData = {
                        config: {
                            address: 'something',
                            locationFormat: () => jest.fn()
                        },
                        service: {
                            isValid: jest.fn(() => [])
                        }
                    };
                    const wrapper = shallowMount(Form, {
                        propsData,
                        store: createStore(),
                        localVue
                    });
                    const address = 'Eridanus';
                    wrapper.setData({ address });

                    // Act
                    wrapper.vm.submit(event);

                    // Assert
                    expect(wrapper.vm.service.isValid).toHaveBeenCalledWith(address);
                });

                describe('when `hasLastSavedAddress` is `truthy`', () => {
                    it('should make a call to `searchPreviouslySavedAddress` with `event`', () => {
                        // Arrange
                        const address = 'AR511AR';

                        const propsData = {
                            config: {
                                address,
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true)
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });

                        const spy = jest.spyOn(wrapper.vm, 'searchPreviouslySavedAddress');
                        wrapper.setData({ address, lastAddress: address });

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(spy).toHaveBeenCalledWith(event);
                    });
                });

                it('should dispatch the action `setIsValid` with a boolean `true` when the address is valid', () => {
                    // Arrange
                    const propsData = {
                        config: {
                            address: 'AR511AR',
                            locationFormat: () => jest.fn()
                        },
                        service: {
                            isValid: jest.fn(() => true)
                        }
                    };
                    const wrapper = shallowMount(Form, {
                        propsData,
                        store: createStore(),
                        localVue
                    });
                    const address = 'AR511AR';
                    const spy = jest.spyOn(wrapper.vm, 'setIsValid');

                    wrapper.setData({ address });

                    // Act
                    wrapper.vm.submit(event);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(true);
                });

                it('should dispatch the action `setIsValid` with [] when the address is not valid', () => {
                    // Arrange
                    const propsData = {
                        config: {
                            address: 'something',
                            locationFormat: () => jest.fn()
                        },
                        service: {
                            isValid: jest.fn(() => [])
                        }
                    };
                    const wrapper = shallowMount(Form, {
                        propsData,
                        store: createStore(),
                        localVue
                    });
                    const address = 'Eridanus';
                    wrapper.setData({ address });
                    const spy = jest.spyOn(wrapper.vm, 'setIsValid');

                    // Act
                    wrapper.vm.submit(event);

                    // Assert
                    expect(spy).toHaveBeenCalledWith([]);
                });

                describe('when `address` `isValid` is truthy', () => {
                    it('should set `SET_ERRORS` to an empty array `[]`', () => {
                        // Arrange
                        const propsData = {
                            config: {
                                address: 'AR511AR',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true)
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(wrapper.vm.errors).toEqual([]);
                    });

                    it('should invoke `processLocationCookie` to set je location cookies manually if `shouldSetCookies` is enabled', () => {
                        // Arrange
                        const address = 'AR511AR';
                        const propsData = {
                            config: {
                                address,
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true)
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });

                        const spy = jest.spyOn(processLocationCookie, 'processLocationCookie');
                        wrapper.setData({ shouldSetCookies: false, address });

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(spy).toHaveBeenCalledWith(false, address);
                    });

                    it('should invoke `clearAddressValueOnSubmit` attempt to clear address value when', () => {
                        // Arrange
                        const address = 'AR511AR';
                        const propsData = {
                            config: {
                                address,
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true)
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });

                        wrapper.setData({ shouldClearAddressOnValidSubmit: true });

                        const spy = jest.spyOn(wrapper.vm, 'clearAddressValue');

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(spy).toHaveBeenCalledWith(true);
                    });
                });

                describe('when `address` `isValid` is falsy', () => {
                    it('should prevent default to stop the form from submitting an invalid search', () => {
                        // Arrange
                        mockState.isValid = ['Error'];
                        const propsData = {
                            config: {
                                address: 'Cassiopeia',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => [])
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(event.preventDefault).toHaveBeenCalled();
                    });

                    it('should dispatch the action `setErrors` to set the correct errors', () => {
                        // Arrange
                        mockState.isValid = ['Error'];
                        const propsData = {
                            config: {
                                address: 'Cassiopeia',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => [])
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });
                        const spy = jest.spyOn(wrapper.vm, 'setErrors');

                        // Act
                        wrapper.vm.submit(event);

                        // Assert
                        expect(spy).toHaveBeenCalledWith(['Error']);
                    });
                });
            });
        });

        describe('`clearAddressValue`', () => {
            it('should exist', () => {
                // Arrange
                const propsData = {
                    config: {
                        address: 'something',
                        locationFormat: () => jest.fn()
                    },
                    service: {
                        isValid: jest.fn(() => [])
                    }
                };
                const wrapper = shallowMount(Form, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                // Act & Assert
                expect(wrapper.vm.clearAddressValue).toBeDefined();
            });

            describe('when invoked', () => {
                describe('AND `shouldClearAddressOnValidSubmit` is truthy', () => {
                    it('should set the `address` to ``', () => {
                        // Arrange
                        const propsData = {
                            config: {
                                address: 'something',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => [])
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData,
                            store: createStore(),
                            localVue
                        });
                        wrapper.setData({ shouldClearAddressOnValidSubmit: true });

                        // Act
                        wrapper.vm.clearAddressValue(wrapper.vm.shouldClearAddressOnValidSubmit);

                        // Assert
                        expect(wrapper.vm.address).toBe('');
                    });
                });
            });
        });

        describe('`searchPreviouslySavedAddress`', () => {
            it('should exist', () => {
                // Arrange
                const propsData = {
                    config: {
                        address: 'something',
                        locationFormat: () => jest.fn()
                    },
                    service: {
                        isValid: jest.fn(() => [])
                    }
                };
                const wrapper = shallowMount(Form, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                // Act & Assert
                expect(wrapper.vm.searchPreviouslySavedAddress).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `search` service with a given payload', () => {
                    // Arrange
                    const propsData = {
                        config: {
                            address: 'something',
                            locationFormat: () => jest.fn()
                        },
                        service: {
                            isValid: jest.fn(() => [])
                        }
                    };
                    const wrapper = shallowMount(Form, {
                        propsData,
                        store: createStore(),
                        localVue
                    });
                    wrapper.setData({ formUrl: 'search/Andromeda', onSubmit: false });
                    wrapper.vm.$refs.form = '<form></form>';
                    wrapper.vm.locationForm = '';
                    const spy = jest.spyOn(searchService, 'search').mockImplementation(() => '');

                    const searchPayload = {
                        onSubmit: false,
                        formUrl: 'search/Andromeda',
                        form: '<form></form>',
                        callback: getLastLocation,
                        event
                    };

                    // Act
                    wrapper.vm.searchPreviouslySavedAddress(event);

                    // Assert
                    expect(spy).toHaveBeenCalledWith(searchPayload);
                });
            });
        });
    });
});
