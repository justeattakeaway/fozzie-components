import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormSearchInnerFieldWrapper from '../FormSearchInnerFieldWrapper.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const mockState = {
    isStreetNumberRequired: false,
    isGeoLocationAvailable: false,
    streetNumber: ''
};

const mockActions = {
    setStreetNumber: jest.fn()
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

describe('`FormSearchInnerFieldWrapper`', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {
            service: {}
        };

        const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
            propsData,
            store: createStore(),
            localVue
        });

        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('`onStreetNumberEntered`', () => {
        it('should exist', () => {
            // Arrange
            const propsData = {
                service: {}
            };

            const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                propsData,
                store: createStore(),
                localVue
            });

            // Assert
            expect(wrapper.vm.onStreetNumberEntered).toBeDefined();
        });

        describe('when invoked', () => {
            it('should dispatch `setStreetNumber` with a payload that contains the street number value entered by the user', () => {
                // Arrange
                const propsData = {
                    service: {}
                };

                const streetNumber = '10';

                const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                const spy = jest.spyOn(wrapper.vm, 'setStreetNumber');
                wrapper.setData({ streetNumber });

                // Act
                wrapper.vm.onStreetNumberEntered();

                // Assert
                expect(spy).toHaveBeenCalledWith(streetNumber);
            });
        });
    });

    describe('`isStreetNumberRequired`: field component', () => {
        describe('when `isStreetNumberRequired` is `truthy`', () => {
            it('should display the street number component', () => {
                // Arrange
                const propsData = {
                    service: {}
                };

                const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                    propsData,
                    store: createStore({
                        isStreetNumberRequired: true
                    }),
                    localVue
                });

                // Act & Assert
                expect(wrapper.find('[data-test-id="streetNumberInput"]').exists()).toBe(true);
            });
        });

        describe('when `isStreetNumberRequired` is `falsy`', () => {
            it('should not display the street number component', () => {
                // Arrange
                const propsData = {
                    service: {}
                };

                const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                expect(wrapper.find('[data-test-id="streetNumberInput"]').exists()).toBe(false);
            });
        });
    });

    describe('`isGeoLocationAvailable`: field component', () => {
        describe('when `isGeoLocationAvailable` is `truthy`', () => {
            it('should display the geolocation component', () => {
                // Arrange
                const propsData = {
                    service: {}
                };

                const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                    propsData,
                    store: createStore({
                        isGeoLocationAvailable: true
                    }),
                    localVue
                });

                // Act & Assert
                expect(wrapper.find('[data-test-id="geolocationButton"]').exists()).toBe(true);
            });
        });

        describe('when `isStreetNumberRequired` is `falsy`', () => {
            it('should not display the street number component', () => {
                // Arrange
                const propsData = {
                    service: {}
                };

                const wrapper = shallowMount(FormSearchInnerFieldWrapper, {
                    propsData,
                    store: createStore(),
                    localVue
                });

                // Act & Assert
                expect(wrapper.find('[data-test-id="geolocationButton"]').exists()).toBe(false);
            });
        });
    });
});
