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
        from: '2020-01-01T00:00+00:00',
        label: {
            text: 'time 1'
        },
        selected: false,
        to: '2020-01-01T00:00+00:00'
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
        times: fulfilmentTimes,
        address: {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        }
    },
    notes: [],
    isFulfillable: true,
    notices: [],
    messages: []
};

const defaultActions = {
    getCheckout: jest.fn(),
    postCheckout: jest.fn()
};

const i18n = {
    locale: 'en-GB',
    messages: tenantConfigs['en-GB']
};

const createStore = (state = defaultState, actions = defaultActions) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state,
            actions
        }
    },
    hasModule: jest.fn(() => true)
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
            it('should create an array of labels from `fulfilment.times` state', () => {
                // Arrange && Act
                const wrapper = shallowMount(Selector, {
                    store: createStore({ ...defaultState }),
                    i18n,
                    localVue,
                    propsData
                });

                const expectedTimes = ['time 1'];

                // Assert
                expect(wrapper.vm.fulfilmentTimes).toEqual(expectedTimes);
            });
        });
    });

    describe('methods ::', () => {
        describe('selectionChanged', () => {
            it('should update `fulfilment.times` time to be selected', () => {
                // Arrange
                const wrapper = shallowMount(Selector, {
                    store: createStore({ ...defaultState }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.selectionChanged('time 1');

                // Assert
                expect(wrapper.vm.fulfilment.times[0].selected).toBe(true);
            });
        });
    });
});
