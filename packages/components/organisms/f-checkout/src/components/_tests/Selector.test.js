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
            let wrapper;
            let updateFulfilmentTimeSpy;

            beforeEach(() => {
                wrapper = shallowMount(Selector, {
                    store: createStore({
                        availableFulfilment: {
                            isAsapAvailable: false,
                            times: []
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                updateFulfilmentTimeSpy = jest.spyOn(Selector.methods, 'updateFulfilmentTime');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should exist', () => {
                expect(wrapper.vm.initFulfilmentTime).toBeDefined();
            });

            describe('when invoked', () => {
                let times;
                beforeEach(() => {
                    // Arrange
                    times = [{
                        text: 'Wednesday 01:00',
                        value: '2020-01-01T01:00:00.000Z'
                    }, {
                        text: 'Wednesday 01:15',
                        value: '2020-01-01T01:15:00.000Z'
                    }, {
                        text: 'Wednesday 01:30',
                        value: '2020-01-01T01:30:00.000Z'
                    }];
                });

                describe('AND fulfilment `times` are supplied, a selected Fulfilment Time is supplied and this time is still available in the fulfilment `times`', () => {
                    // Arrange
                    let selectedFulfilmentTime;

                    beforeEach(() => {
                        // Pre-selected/set fulfilment time
                        selectedFulfilmentTime = {
                            from: '2020-01-01T01:15:00.000Z',
                            to: '2020-01-01T01:15:00.000Z'
                        };

                        // Act
                        wrapper.vm.initFulfilmentTime(times, selectedFulfilmentTime);
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the state Time value', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toEqual(selectedFulfilmentTime.from);
                    });

                    it('should NOT make a call to `updateFulfilmentTime`', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).not.toHaveBeenCalled();
                    });
                });

                describe('AND fulfilment `times` are supplied, a selected Fulfilment Time is supplied but this time is now not available in the fulfilment `times`', () => {
                    // Arrange
                    beforeEach(() => {
                        // Arrange
                        const selectedFulfilmentTime = {
                            from: '2020-01-01T00:45:00.000Z',
                            to: '2020-01-01T00:45:00.000Z'
                        };

                        // Act
                        wrapper.vm.initFulfilmentTime(times, selectedFulfilmentTime);
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the first available time value from the fulfilment `times`', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toEqual(times[0].value);
                    });

                    it('should make a call to `updateFulfilmentTime` with the first available `from` & `to` values', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                            from: '2020-01-01T01:00:00.000Z',
                            to: '2020-01-01T01:00:00.000Z'
                        });
                    });
                });

                describe('AND no fulfilment `times` are supplied but a selected Fulfilment Time is supplied', () => {
                    beforeEach(() => {
                        const selectedFulfilmentTime = {
                            from: '2020-01-01T01:15:00.000Z',
                            to: '2020-01-01T01:15:00.000Z'
                        };

                        // Act
                        wrapper.vm.initFulfilmentTime([], selectedFulfilmentTime);
                    });

                    it('should NOT make a call to `updateFulfilmentTime`', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).not.toHaveBeenCalled();
                    });

                    it('should not update `selectedAvailableFulfilmentTime`', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toEqual('');
                    });
                });

                describe('AND no fulfilment `times` are supplied and no selected Fulfilment Time is supplied', () => {
                    beforeEach(() => {
                        // Act
                        wrapper.vm.initFulfilmentTime([]);
                    });
                    it('should NOT make a call to `updateFulfilmentTime`', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).not.toHaveBeenCalled();
                    });

                    it('should not update `selectedAvailableFulfilmentTime`', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toEqual('');
                    });
                });

                describe('AND fulfilment `times` are supplied but no selected Fulfilment Time is supplied', () => {
                    beforeEach(() => {
                        // Act
                        wrapper.vm.initFulfilmentTime(times);
                    });

                    it('should make a call to `updateFulfilmentTime` with the `from` & `to` values', () => {
                        // Assert
                        expect(updateFulfilmentTimeSpy).toHaveBeenCalledWith({
                            from: '2020-01-01T01:00:00.000Z',
                            to: '2020-01-01T01:00:00.000Z'
                        });
                    });

                    it('should update `selectedAvailableFulfilmentTime` with the first available fulfilment Time value', () => {
                        // Assert
                        expect(wrapper.vm.selectedAvailableFulfilmentTime).toEqual(times[0].value);
                    });
                });
            });
        });

        describe('`setAsapFlag`', () => {
            let wrapper;
            let updateHasAsapSelectedSpy;

            beforeEach(() => {
                wrapper = shallowMount(Selector, {
                    store: createStore({
                        availableFulfilment: {
                            isAsapAvailable: true,
                            times: fulfilmentTimes
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                updateHasAsapSelectedSpy = jest.spyOn(Selector.methods, 'updateHasAsapSelected');
            });

            it('should exist', () => {
                expect(wrapper.vm.setAsapFlag).toBeDefined();
            });

            describe('when invoked', () => {
                describe('AND `isAsapAvailable` is available & the `availableFulfilment` from matches the `selected` fulfilment time', () => {
                    it('should make a call to `updateHasAsapSelected` with the param `true` passed', () => {
                        // Act
                        wrapper.vm.setAsapFlag();

                        // Assert
                        expect(updateHasAsapSelectedSpy).toHaveBeenCalledWith(true);
                    });
                });

                describe('AND `isAsapAvailable` is not available', () => {
                    it('should make a call to `updateHasAsapSelected` with the param `false` passed', () => {
                        // Act
                        wrapper.vm.setAsapFlag();

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
        describe('Initial Page Visit ::', () => {
            it('should make a call to `initFulfilmentTime` with the available `fulfilmentTimes` and no preset `fulfilmentTime`', () => {
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
                expect(initFulfilmentTimeSpy).toHaveBeenCalledWith(
                    [
                        {
                            text: 'As soon as possible',
                            value: '2020-01-01T01:00:00.000Z'
                        },
                        {
                            text: 'Wednesday 01:15',
                            value: '2020-01-01T01:15:00.000Z'
                        }
                    ],
                    {
                        from: '',
                        to: ''
                    }
                );
            });
        });

        describe('Page Re-visit ::', () => {
            it('should make a call to `initFulfilmentTime` with the available `fulfilmentTimes` and any preset `fulfilmentTime`', () => {
                const preselectedTime = {
                    from: '2020-01-01T01:15:00.000Z',
                    to: '2020-01-01T01:15:00.000Z'
                };
                defaultCheckoutState.time = preselectedTime;

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
                expect(initFulfilmentTimeSpy).toHaveBeenCalledWith(
                    [
                        {
                            text: 'As soon as possible',
                            value: '2020-01-01T01:00:00.000Z'
                        },
                        {
                            text: 'Wednesday 01:15',
                            value: '2020-01-01T01:15:00.000Z'
                        }
                    ],
                    preselectedTime
                );
            });
        });
    });
});
