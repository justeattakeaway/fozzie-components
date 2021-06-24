import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import { CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_COLLECTION } from '../../constants';
import Selector from '../Selector.vue';
import {
    fulfilmentTimes, defaultCheckoutState, i18n, createStore
} from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Selector', () => {
    const propsData = {};

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(Selector, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        describe('orderMethod', () => {
            it('should show the delivery label when the `serviceType` is `delivery`', () => {
                // Arrange & Act
                const wrapper = mount(Selector, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                const selector = wrapper.find('[data-test-id="formfield-order-time-dropdown-select"]');

                // Assert
                expect(selector.html()).toMatchSnapshot();
            });

            it('should show the collection label when the `serviceType` is `collection`', () => {
                // Arrange & Act
                const wrapper = mount(Selector, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData
                });

                const selector = wrapper.find('[data-test-id="formfield-order-time-dropdown-select"]');

                // Assert
                expect(selector.html()).toMatchSnapshot();
            });
        });

        describe('fulfilmentTimes', () => {
            it('should create an array of formatted fulfilment times', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({ ...defaultCheckoutState }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = [
                    { text: 'As soon as possible', value: '2020-01-01T01:00:00.000Z' },
                    { text: 'Wednesday 01:15', value: '2020-01-01T01:15:00.000Z' }
                ];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });

            it('should create an array of formatted fulfilment times without `as soon as possible` if `isAsapAvailable` is `false`', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultCheckoutState,
                        availableFulfilment: {
                            times: fulfilmentTimes,
                            isAsapAvailable: false
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = [
                    { text: 'Wednesday 01:00', value: '2020-01-01T01:00:00.000Z' },
                    { text: 'Wednesday 01:15', value: '2020-01-01T01:15:00.000Z' }
                ];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });

            it('should create an empty array when there are no times available and `isAsapAvailable` is `false`', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultCheckoutState,
                        availableFulfilment: {
                            times: [],
                            isAsapAvailable: false
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = [];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });
        });

        describe('shouldShowPreOrderWarning', () => {
            let wrapper;

            describe('when asap is not available', () => {
                beforeEach(() => {
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            availableFulfilment: {
                                times: fulfilmentTimes,
                                isAsapAvailable: false
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return `true`', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowPreOrderWarning).toBeTruthy();
                });

                it('should render warning message', () => {
                    // Arrange
                    const preOrderWarning = wrapper.find('[data-test-id="warning-pre-order"]');

                    // Assert
                    expect(preOrderWarning.exists()).toBeTruthy();
                });
            });

            describe('when asap is available', () => {
                beforeEach(() => {
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            availableFulfilment: {
                                times: fulfilmentTimes,
                                isAsapAvailable: true
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return `false`', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowPreOrderWarning).toBeFalsy();
                });

                it('should not render warning message', () => {
                    // Arrange
                    const preOrderWarning = wrapper.find('[data-test-id="warning-pre-order"]');

                    // Assert
                    expect(preOrderWarning.exists()).toBeFalsy();
                });
            });
        });

        describe('shouldShowSelector', () => {
            let wrapper;
            describe('when the service type is `dinein` and there is only one fulfilment time', () => {
                beforeEach(() => {
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: 'dinein',
                            availableFulfilment: {
                                times: [{
                                    from: '2020-01-01T01:00:00.000Z',
                                    to: '2020-01-01T01:00:00.000Z'
                                }],
                                isAsapAvailable: true
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return `false`', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowSelector).toBe(false);
                });
            });

            describe('when the service type is `dinein` and there is more than one fulfilment time', () => {
                beforeEach(() => {
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: 'dinein',
                            availableFulfilment: {
                                times: fulfilmentTimes,
                                isAsapAvailable: true
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return `true`', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowSelector).toBe(true);
                });
            });

            describe('when the service type is not `dinein`', () => {
                beforeEach(() => {
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            availableFulfilment: {
                                times: fulfilmentTimes,
                                isAsapAvailable: true
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return `true`', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowSelector).toBe(true);
                });
            });
        });
    });

    describe('methods ::', () => {
        describe('selectionChanged', () => {
            const field = 'orderTime';
            const selectedTime = '2020-01-01T01:00:00.000Z';

            let wrapper;
            let updateChangedFieldSpy;
            let setAsapFlagSpy;

            beforeEach(() => {
                updateChangedFieldSpy = jest.spyOn(Selector.methods, 'updateChangedField');
                setAsapFlagSpy = jest.spyOn(Selector.methods, 'setAsapFlag');


                wrapper = shallowMount(Selector, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should call `updateChangedField` with `orderTime`', () => {
                // Act
                wrapper.vm.selectionChanged(selectedTime);

                // Assert
                expect(updateChangedFieldSpy).toHaveBeenCalledWith(field);
            });

            it('should call `setAsapFlag` with the `selectedFulfilmentTime`', () => {
                // Act
                wrapper.vm.selectionChanged(selectedTime);

                // Assert
                expect(setAsapFlagSpy).toHaveBeenCalledWith(selectedTime);
            });

            it('should update `selectedAvailableFulfilmentTime` with the value passed', () => {
                // Act
                wrapper.vm.selectionChanged(selectedTime);

                // Assert
                expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe(selectedTime);
            });
        });

        describe('`initFulfilmentTime`', () => {
            // Arrange
            let wrapper;
            let setAsapFlagSpy;
            let updateFulfilmentTimeSpy;

            beforeEach(() => {
                // Arrange
                setAsapFlagSpy = jest.spyOn(Selector.methods, 'setAsapFlag');
                updateFulfilmentTimeSpy = jest.spyOn(Selector.methods, 'updateFulfilmentTime');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('AND when there are fulfilment `times` but no pre-selected fulfilment time', () => {
                beforeEach(() => {
                    // Act
                    wrapper = shallowMount(Selector, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should make a call to `updateFulfilmentTime` only once', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toBeCalledTimes(1);
                });

                it('should make a call to `updateFulfilmentTime` with the first available fulfilment `to` and `from` time', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                        from: '2020-01-01T01:00:00.000Z',
                        to: '2020-01-01T01:00:00.000Z'
                    });
                });

                it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                    // Assert
                    expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe('2020-01-01T01:00:00.000Z');
                });

                it('should make a call to `setAsapFlag` with correct time', () => {
                    // Assert
                    expect(setAsapFlagSpy).toBeCalledWith('2020-01-01T01:00:00.000Z');
                });
            });

            describe('AND when there are fulfilment `times` available and a pre-selected fulfilment time', () => {
                describe('AND the pre-selected fulfilment time is still available', () => {
                    beforeEach(() => {
                        // Act
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                time: { from: '2020-01-01T01:15:00.000Z', to: '2020-01-01T01:15:00.000Z' }
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should make a call to `updateFulfilmentTime` only once', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toBeCalledTimes(1);
                    });

                    it('should make a call to `updateFulfilmentTime` with the first available fulfilment `to` and `from` time', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                            from: '2020-01-01T01:15:00.000Z',
                            to: '2020-01-01T01:15:00.000Z'
                        });
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the pre-selected fulfilment time', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe('2020-01-01T01:15:00.000Z');
                    });

                    it('should make a call to `setAsapFlag` with correct time', () => {
                        // Assert
                        expect(setAsapFlagSpy).toBeCalledWith('2020-01-01T01:15:00.000Z');
                    });
                });

                describe('AND when the pre-selected fulfilment time is not available', () => {
                    beforeEach(() => {
                        // Act
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                time: { from: '2020-01-01T00:45:00.000Z', to: '2020-01-01T00:45:00.000Z' }
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should make a call to `updateFulfilmentTime` only once', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toBeCalledTimes(1);
                    });

                    it('should make a call to `updateFulfilmentTime` with the first available fulfilment `to` and `from` time', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                            from: '2020-01-01T01:00:00.000Z',
                            to: '2020-01-01T01:00:00.000Z'
                        });
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe('2020-01-01T01:00:00.000Z');
                    });

                    it('should make a call to `setAsapFlag` with correct time', () => {
                        // Assert
                        expect(setAsapFlagSpy).toBeCalledWith('2020-01-01T01:00:00.000Z');
                    });
                });
            });

            describe('AND when there are no fulfilment `times` available and no pre-selected fulfilment time', () => {
                beforeEach(() => {
                    // Act
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            availableFulfilment: {
                                times: [],
                                isAsapAvailable: true
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should make a call to `updateFulfilmentTime` only once', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toBeCalledTimes(1);
                });

                it('should make a call to `updateFulfilmentTime` with the first available fulfilment `to` and `from` time', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                        from: '',
                        to: ''
                    });
                });

                it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                    // Assert
                    expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe('');
                });

                it('should not make a call to `setAsapFlag`', () => {
                    // Assert
                    expect(setAsapFlagSpy).not.toBeCalled();
                });
            });

            describe('AND when there are no fulfilment `times` available but a pre-selected fulfilment time', () => {
                beforeEach(() => {
                    // Act
                    wrapper = shallowMount(Selector, {
                        store: createStore({
                            ...defaultCheckoutState,
                            availableFulfilment: {
                                times: [],
                                isAsapAvailable: true
                            },
                            time: { from: '2020-01-01T01:00:00.000Z', to: '2020-01-01T01:00:00.000Z' }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should make a call to `updateFulfilmentTime` only once', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toBeCalledTimes(1);
                });

                it('should make a call to `updateFulfilmentTime` with the first available fulfilment `to` and `from` time', () => {
                    // Assert
                    expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                        from: '',
                        to: ''
                    });
                });

                it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                    // Assert
                    expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe('');
                });

                it('should not make a call to `setAsapFlag`', () => {
                    // Assert
                    expect(setAsapFlagSpy).not.toBeCalled();
                });
            });

            describe('when a future fulfilment time has been selected', () => {
                let selectedTime;
                let asapTime;
                let laterTime;

                beforeEach(() => {
                    // eslint-disable-next-line prefer-destructuring
                    selectedTime = fulfilmentTimes[1];
                    asapTime = fulfilmentTimes[0].from;
                    laterTime = fulfilmentTimes[1].from;
                });

                describe('AND `hasAsapSelected` is true', () => {
                    beforeEach(() => {
                        // Act
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                hasAsapSelected: true,
                                time: selectedTime
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe(asapTime);
                    });

                    it('should make a call to `setAsapFlag` with correct time', () => {
                        // Assert
                        expect(setAsapFlagSpy).toBeCalledWith(asapTime);
                    });
                });

                describe('AND `hasAsapSelected` is false', () => {
                    beforeEach(() => {
                        // Act
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                hasAsapSelected: false,
                                time: selectedTime
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment time', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe(laterTime);
                    });

                    it('should make a call to `setAsapFlag` with correct time', () => {
                        // Assert
                        expect(setAsapFlagSpy).toBeCalledWith(laterTime);
                    });
                });
            });
        });

        describe('`setAsapFlag`', () => {
            // Arrange
            let wrapper;
            let updateHasAsapSelectedSpy;
            const anyTime = '2020-01-01T01:00:00.000Z';

            beforeEach(() => {
                updateHasAsapSelectedSpy = jest.spyOn(Selector.methods, 'updateHasAsapSelected');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when invoked', () => {
                describe('AND `isAsapAvailable` is available & the `availableFulfilment` from matches the `selected` fulfilment time', () => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                availableFulfilment: {
                                    isAsapAvailable: true,
                                    times: fulfilmentTimes
                                }
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should make a call to `updateHasAsapSelected` with the param `true` passed', () => {
                        // Act
                        wrapper.vm.setAsapFlag(anyTime);

                        // Assert
                        expect(updateHasAsapSelectedSpy).toHaveBeenCalledWith(true);
                    });
                });

                describe('AND `isAsapAvailable` is not available', () => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(Selector, {
                            store: createStore({
                                ...defaultCheckoutState,
                                availableFulfilment: {
                                    isAsapAvailable: false,
                                    times: fulfilmentTimes
                                }
                            }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should make a call to `updateHasAsapSelected` with the param `false` passed', () => {
                        // Act
                        wrapper.vm.setAsapFlag(anyTime);

                        // Assert
                        expect(updateHasAsapSelectedSpy).toHaveBeenCalledWith(false);
                    });
                });
            });
        });
    });

    describe('watch ::', () => {
        describe('fulfilmentTimes ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should call `selectionChanged` with the first fulfilment time when there are fulfilment times', () => {
                // Arrange
                const expected = '2020-01-01T01:00:00.000Z';
                const selectionChangedSpy = jest.spyOn(Selector.methods, 'selectionChanged');

                const wrapper = shallowMount(Selector, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.$options.watch.fulfilmentTimes.call(wrapper.vm, [
                    {
                        text: 'Wednesday 01:00',
                        value: '2020-01-01T01:00:00.000Z'
                    }
                ]);

                // Assert
                expect(selectionChangedSpy).toHaveBeenCalledWith(expected);
            });

            it('should call `selectionChanged` with `undefined` when there are no fulfilment times', () => {
                // Arrange
                const selectionChangedSpy = jest.spyOn(Selector.methods, 'selectionChanged');

                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultCheckoutState,
                        availableFulfilment: {
                            isAsapAvailable: false,
                            times: []
                        },
                        serviceType: CHECKOUT_METHOD_DELIVERY
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.$options.watch.fulfilmentTimes.call(wrapper.vm, []);

                // Assert
                expect(selectionChangedSpy).toHaveBeenCalledWith(undefined);
            });
        });
    });

    describe('mounted ::', () => {
        it('should make a call to `initFulfilmentTime`', () => {
            // Arrange
            const initFulfilmentTimeSpy = jest.spyOn(Selector.methods, 'initFulfilmentTime');

            // Act
            shallowMount(Selector, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(initFulfilmentTimeSpy).toHaveBeenCalled();
        });
    });
});
