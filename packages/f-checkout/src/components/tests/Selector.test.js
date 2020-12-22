import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import { CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_COLLECTION } from '../../constants';
import Selector from '../Selector.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const fulfilmentTimes = [
    {
        from: '2020-01-01T01:00:00.000Z',
        to: '2020-01-01T01:00:00.000Z'
    },
    {
        from: '2020-01-01T01:15:00.000Z',
        to: '2020-01-01T01:15:00.000Z'
    }
];

const defaultState = {
    id: '',
    serviceType: CHECKOUT_METHOD_DELIVERY,
    customer: {
        firstName: 'John',
        mobileNumber: '+447111111111'
    },
    fulfilment: {
        time: {
            from: '',
            to: ''
        },
        address: {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        }
    },
    availableFulfilment: {
        times: fulfilmentTimes,
        isAsapAvailable: true
    },
    notes: [],
    isFulfillable: true,
    notices: [],
    messages: []
};

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    },
    dateTimeFormats: {
        'en-GB': tenantConfigs['en-GB'].dateTimeFormats
    }
};

const createStore = (state = defaultState) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state
        }
    }
});

describe('Selector', () => {
    allure.feature('Checkout-Selector');
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
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_DELIVERY }),
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
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
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
                // Arrange && Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({ ...defaultState }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = ['As soon as possible', 'Wednesday 01:00', 'Wednesday 01:15'];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });

            it('should create an array of formatted fulfilment times without `as soon as possible` if `isAsapAvailable` is `false`', () => {
                // Arrange && Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultState,
                        availableFulfilment: {
                            times: fulfilmentTimes,
                            isAsapAvailable: false
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = ['Wednesday 01:00', 'Wednesday 01:15'];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });

            it('should create an array of formatted fulfilment times with only `as soon as possible` when there are no other times available', () => {
                // Arrange && Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultState,
                        availableFulfilment: {
                            times: [],
                            isAsapAvailable: true
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = ['As soon as possible'];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });

            it('should create an empty array when there are no times available and `isAsapAvailable` is `false`', () => {
                // Arrange && Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultState,
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
    });

    describe('methods ::', () => {
        describe('selectionChanged', () => {
            it('should update `selectedAvailableFulfilmentTime` with the value passed', () => {
                // Arrange
                const wrapper = shallowMount(Selector, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const selectedTime = 'Wednesday 13:30';

                // Act
                wrapper.vm.selectionChanged(selectedTime);

                // Assert
                expect(wrapper.vm.selectedAvailableFulfilmentTime).toBe(selectedTime);
            });
        });
    });

    describe('watch ::', () => {
        describe('fulfilmentTimes ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should call `selectionChanged` with the first fulfilment time when there are fulfilment times', async () => {
                // Arrange
                const selectionChangedSpy = jest.spyOn(Selector.methods, 'selectionChanged');

                const wrapper = shallowMount(Selector, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.$options.watch.fulfilmentTimes.call(wrapper.vm);

                // Assert
                expect(selectionChangedSpy).toHaveBeenCalledWith('As soon as possible');
            });

            it('should not call `selectionChanged` when there are no fulfilment times', () => {
                // Arrange
                const selectionChangedSpy = jest.spyOn(Selector.methods, 'selectionChanged');

                const wrapper = shallowMount(Selector, {
                    store: createStore({
                        ...defaultState,
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
                wrapper.vm.$options.watch.fulfilmentTimes.call(wrapper.vm);

                // Assert
                expect(selectionChangedSpy).not.toHaveBeenCalled();
            });
        });
    });
});
