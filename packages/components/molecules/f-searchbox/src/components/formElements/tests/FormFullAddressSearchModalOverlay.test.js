import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormFullAddressSearchModalOverlay from '../FormFullAddressSearchModalOverlay.vue';
import { VUEX_MODULE_NAMESPACE } from '../../../services/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    isBelowMid: false,
    isFullAddressSearchEnabled: true,
    suggestions: ['NG+', 'NG++'],
    hasInputElevation: false
};

const mockActions = {
    setAddress: jest.fn(),
    getMatchedAreaAddressResults: jest.fn()
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

describe('`FormFullAddressSearchModalOverlay`', () => {
    describe('`shouldDisplayModalOverlay`', () => {
        it('should exist', () => {
            // Arrange
            const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                propsData: {
                    copy: {}
                },
                store: createStore(),
                localVue
            });

            // Assert
            expect(wrapper.vm.shouldDisplayModalOverlay).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND the param `value` passed in is `falsy`', () => {
                it('should `$emit` `ON_FULL_ADDRESS_MODAL_CLOSED` with `false` to indicate that the modal should close', () => {
                    // Arrange
                    const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                        propsData: {
                            copy: {}
                        },
                        store: createStore(),
                        localVue
                    });

                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    wrapper.vm.$options.watch.shouldDisplayModalOverlay.call(wrapper.vm, false);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('on-full-address-modal-closed', false);
                });
            });

            describe('AND the param `value` passed in is `truthy`', () => {
                it('should NOT `$emit` `ON_FULL_ADDRESS_MODAL_CLOSED`', () => {
                    // Arrange
                    const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                        propsData: {
                            copy: {}
                        },
                        store: createStore(),
                        localVue
                    });

                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    wrapper.vm.$options.watch.shouldDisplayModalOverlay.call(wrapper.vm, true);

                    // Assert
                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('`address`', () => {
        it('should exist', () => {
            // Arrange
            const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                propsData: {
                    copy: {}
                },
                store: createStore(),
                localVue
            });

            // Act
            expect(wrapper.vm.address).toBeDefined();
        });

        describe('when invoked', () => {
            it('should call `setAddress` so we can determine if the correct character criteria is met before invoking an API call', () => {
                // Arrange
                const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                    propsData: {
                        copy: {}
                    },
                    store: createStore(),
                    localVue
                });

                const spy = jest.spyOn(wrapper.vm, 'setAddress');

                // Act
                wrapper.vm.$options.watch.address.call(wrapper.vm, 'AR511AR');

                // Assert
                expect(spy).toHaveBeenCalledWith('AR511AR');
            });

            it('should call `getMatchedAreaAddressResults` so we can return suggestions', () => {
                // Arrange
                const wrapper = shallowMount(FormFullAddressSearchModalOverlay, {
                    propsData: {
                        copy: {}
                    },
                    store: createStore(),
                    localVue
                });

                const spy = jest.spyOn(wrapper.vm, 'getMatchedAreaAddressResults');

                // Act
                wrapper.vm.$options.watch.address.call(wrapper.vm, 'AR511AR');

                // Assert
                expect(spy).toHaveBeenCalledWith({
                    address: 'AR511AR'
                });
            });
        });
    });
});
