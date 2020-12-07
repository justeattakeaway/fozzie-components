import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_COLLECTION } from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const fulfillmentTimes = [
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
    fulfillment: {
        times: fulfillmentTimes,
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

describe('Checkout', () => {
    allure.feature('Checkout');
    const checkoutUrl = 'http://localhost/account/register';

    it('should be defined', () => {
        const propsData = { checkoutUrl };

        const wrapper = shallowMount(VueCheckout, {
            i18n,
            store: createStore(),
            localVue,
            propsData
        });

        expect(wrapper.exists()).toBe(true);
    });

    describe('created :: ', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should register the `checkout` module if it doesn\'t exist in the store', () => {
            // Arrange
            const propsData = {
                checkoutUrl
            };

            const store = new Vuex.Store({});

            const registerModuleSpy = jest.spyOn(store, 'registerModule');

            // Act
            shallowMount(VueCheckout, {
                store,
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(registerModuleSpy).toHaveBeenCalledWith('checkout', expect.any(Object));
        });

        it('should not register the `checkout` module if it already exists in the store', () => {
            // Arrange
            const propsData = {
                checkoutUrl
            };

            const store = createStore();

            const registerModuleSpy = jest.spyOn(store, 'registerModule');

            // Act
            shallowMount(VueCheckout, {
                store,
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(registerModuleSpy).not.toHaveBeenCalled();
        });
    });

    describe('data ::', () => {
        describe('serviceType ::', () => {
            it('should display the address block if set to `delivery`', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(true);
            });

            it('should not display the address block if set to `collection`', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData
                });

                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(false);
            });
        });
    });

    describe('computed ::', () => {
        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toContain(defaultState.customer.firstName);
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toEqual(`${defaultState.customer.firstName}, confirm your details`);
            });
        });
    });

    describe('when form submitted', () => {
        describe('if serviceType set to `collection`', () => {
            const propsData = {
                checkoutUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultState,
                    serviceType: CHECKOUT_METHOD_COLLECTION,
                    customer: {
                        firstName: defaultState.customer.firstName
                    },
                    fulfillment: {
                        times: fulfillmentTimes,
                        address: {}
                    }
                };

                wrapper = mount(VueCheckout, {
                    store: createStore(state, { ...defaultActions, getCheckout: jest.fn(async () => Promise.resolve()), postCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit success event when all the fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue(defaultState.customer.mobileNumber);

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
            });

            it('should show error message and emit failure event when the mobile number field is not populated', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue('');

                // Act
                await wrapper.vm.onFormSubmit();
                const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBe(false);
                expect(mobileNumberEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
            });

            it('should show error message and emit failure event when the mobile number field is populated with a < 10 numbers', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue('077777');

                // Act
                await wrapper.vm.onFormSubmit();
                const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBe(false);
                expect(mobileNumberEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
            });

            it('should show error message and emit failure event when the mobile number field is populated with non numeric value', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue('hs;-j`$e&1l');

                // Act
                await wrapper.vm.onFormSubmit();
                const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBe(false);
                expect(mobileNumberEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
            });

            it('should not create validations for address', () => {
                // Assert
                expect(wrapper.vm.$v.fulfillment).toBeUndefined();
            });
        });

        describe('if serviceType set to `delivery`', () => {
            const propsData = {
                checkoutUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultState,
                    serviceType: CHECKOUT_METHOD_DELIVERY,
                    customer: {
                        firstName: defaultState.customer.firstName
                    },
                    fulfillment: {
                        times: fulfillmentTimes,
                        address: {}
                    }
                };

                wrapper = mount(VueCheckout, {
                    store: createStore(state, { ...defaultActions, getCheckout: jest.fn(async () => Promise.resolve()), postCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue(defaultState.customer.mobileNumber);
                wrapper.find('[data-test-id="formfield-address-line-1-input"]').setValue(defaultState.fulfillment.address.line1);
                wrapper.find('[data-test-id="formfield-address-city-input"]').setValue(defaultState.fulfillment.address.city);
                wrapper.find('[data-test-id="formfield-address-postcode-input"]').setValue(defaultState.fulfillment.address.postcode);

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
            });

            it('should emit failure event and display error message when address line1 input field is empty', async () => {
                // Arrange && Act
                await wrapper.vm.onFormSubmit();
                const addressLine1EmptyMessage = wrapper.find('[data-test-id="error-address-line1-empty"]');

                // Assert
                expect(addressLine1EmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfillment.address.line1');
            });

            it('should emit failure event and display error message when city input field is empty', async () => {
                // Arrange && Act
                await wrapper.vm.onFormSubmit();
                const addressCityEmptyMessage = wrapper.find('[data-test-id="error-address-city-empty"]');

                // Assert
                expect(addressCityEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfillment.address.city');
            });

            it('should emit failure event and display error message when postcode input field is empty', async () => {
                // Arrange && Act
                await wrapper.vm.onFormSubmit();
                const addressPostcodeEmptyMessage = wrapper.find('[data-test-id="error-address-postcode-empty"]');

                // Assert
                expect(addressPostcodeEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfillment.address.postcode');
            });

            it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-address-postcode-input"]').setValue('?!hdb-se');

                // Act
                await wrapper.vm.onFormSubmit();
                const addressPostcodeTypeErrorMessage = wrapper.find('[data-test-id="error-address-postcode-type-error"]');

                // Assert
                expect(addressPostcodeTypeErrorMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfillment.address.postcode');
            });


            it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-address-postcode-input"]').setValue('EC4M 7R');

                // Act
                await wrapper.vm.onFormSubmit();
                const addressPostcodeTypeErrorMessage = wrapper.find('[data-test-id="error-address-postcode-type-error"]');

                // Assert
                expect(addressPostcodeTypeErrorMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfillment.address.postcode');
            });

            it('should create validations for address', () => {
                // Assert
                expect(wrapper.vm.$v.fulfillment.address.line1).toBeDefined();
                expect(wrapper.vm.$v.fulfillment.address.city).toBeDefined();
                expect(wrapper.vm.$v.fulfillment.address.postcode).toBeDefined();
            });
        });
    });

    describe('when form is loaded', () => {
        const propsData = {
            checkoutUrl
        };

        describe('when request fails', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store: createStore(defaultState, { ...defaultActions, getCheckout: jest.fn(async () => Promise.reject()) }),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit failure event', async () => {
                expect(wrapper.emitted(EventNames.CheckoutGetFailure).length).toBe(1);
            });
        });

        describe('when request succeeds', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store: createStore(defaultState, { ...defaultActions, getCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit success event', async () => {
                expect(wrapper.emitted(EventNames.CheckoutGetSuccess).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutGetFailure)).toBeUndefined();
            });

            it('should set mobile number', async () => {
                expect(wrapper.find('[data-test-id="formfield-mobile-number-input"]').element.value).toBe(defaultState.customer.mobileNumber);
            });

            it('should set address fields', async () => {
                expect(wrapper.find('[data-test-id="formfield-address-line-1-input"]').element.value).toBe(defaultState.fulfillment.address.line1);
                expect(wrapper.find('[data-test-id="formfield-address-line-2-input"]').element.value).toBe(defaultState.fulfillment.address.line2);
                expect(wrapper.find('[data-test-id="formfield-address-city-input"]').element.value).toBe(defaultState.fulfillment.address.city);
                expect(wrapper.find('[data-test-id="formfield-address-postcode-input"]').element.value).toBe(defaultState.fulfillment.address.postcode);
            });
        });
    });
});
