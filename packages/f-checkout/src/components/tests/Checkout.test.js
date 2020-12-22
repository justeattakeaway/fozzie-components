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

const defaultActions = {
    getCheckout: jest.fn(),
    postCheckout: jest.fn(),
    getAvailableFulfilment: jest.fn(),
    setAuthToken: jest.fn()
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
    const checkoutUrl = 'http://localhost/checkout';
    const checkoutAvailableFulfilmentUrl = 'http://localhost/checkout/fulfilment';

    it('should be defined', () => {
        const propsData = { checkoutUrl, checkoutAvailableFulfilmentUrl };

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
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
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
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
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
                    checkoutUrl,
                    checkoutAvailableFulfilmentUrl
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
                    checkoutUrl,
                    checkoutAvailableFulfilmentUrl
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

    describe('props ::', () => {
        describe('authToken ::', () => {
            it('should store auth token', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl,
                    checkoutAvailableFulfilmentUrl,
                    authToken: 'sampleToken'
                };

                const setAuthToken = jest.fn();

                // Act
                shallowMount(VueCheckout, {
                    store: createStore(defaultState, { ...defaultActions, setAuthToken }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(setAuthToken).toHaveBeenCalled();
            });
        });
    });

    describe('computed ::', () => {
        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl,
                    checkoutAvailableFulfilmentUrl
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
                    checkoutUrl,
                    checkoutAvailableFulfilmentUrl
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

    describe('mounted ::', () => {
        it('should call `setAuthToken`', () => {
            // Arrange & Act
            const setAuthTokenSpy = jest.spyOn(VueCheckout.methods, 'setAuthToken');

            const propsData = {
                checkoutUrl,
                checkoutAvailableFulfilmentUrl,
                authToken: 'mytoken'
            };

            shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            expect(setAuthTokenSpy).toHaveBeenCalledWith(propsData.authToken);
        });

        it('should call `loadCheckout`', () => {
            // Arrange & Act
            const loadCheckoutSpy = jest.spyOn(VueCheckout.methods, 'loadCheckout');

            const propsData = {
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
            };

            shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            expect(loadCheckoutSpy).toHaveBeenCalled();
        });

        it('should call `loadAvailableFulfilment`', () => {
            // Arrange & Act
            const loadAvailableFulfilmentSpy = jest.spyOn(VueCheckout.methods, 'loadAvailableFulfilment');

            const propsData = {
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
            };

            shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            expect(loadAvailableFulfilmentSpy).toHaveBeenCalled();
        });
    });

    describe('when form submitted', () => {
        describe('if serviceType set to `collection`', () => {
            const propsData = {
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultState,
                    serviceType: CHECKOUT_METHOD_COLLECTION,
                    customer: {
                        firstName: defaultState.customer.firstName
                    },
                    fulfilment: {
                        times: fulfilmentTimes,
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
                expect(wrapper.vm.$v.fulfilment).toBeUndefined();
            });
        });

        describe('if serviceType set to `delivery`', () => {
            const propsData = {
                checkoutUrl,
                checkoutAvailableFulfilmentUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultState,
                    serviceType: CHECKOUT_METHOD_DELIVERY,
                    customer: {
                        firstName: defaultState.customer.firstName
                    },
                    fulfilment: {
                        times: fulfilmentTimes,
                        address: {}
                    }
                };

                wrapper = mount(VueCheckout, {
                    store: createStore(state),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue(defaultState.customer.mobileNumber);
                wrapper.find('[data-test-id="formfield-address-line-1-input"]').setValue(defaultState.fulfilment.address.line1);
                wrapper.find('[data-test-id="formfield-address-city-input"]').setValue(defaultState.fulfilment.address.city);
                wrapper.find('[data-test-id="formfield-address-postcode-input"]').setValue(defaultState.fulfilment.address.postcode);

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
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.line1');
            });

            it('should emit failure event and display error message when city input field is empty', async () => {
                // Arrange && Act
                await wrapper.vm.onFormSubmit();
                const addressCityEmptyMessage = wrapper.find('[data-test-id="error-address-city-empty"]');

                // Assert
                expect(addressCityEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.city');
            });

            it('should emit failure event and display error message when postcode input field is empty', async () => {
                // Arrange && Act
                await wrapper.vm.onFormSubmit();
                const addressPostcodeEmptyMessage = wrapper.find('[data-test-id="error-address-postcode-empty"]');

                // Assert
                expect(addressPostcodeEmptyMessage).toMatchSnapshot();
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.postcode');
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
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.postcode');
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
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.postcode');
            });

            it('should create validations for address', () => {
                // Assert
                expect(wrapper.vm.$v.fulfilment.address.line1).toBeDefined();
                expect(wrapper.vm.$v.fulfilment.address.city).toBeDefined();
                expect(wrapper.vm.$v.fulfilment.address.postcode).toBeDefined();
            });
        });
    });

    describe('methods ::', () => {
        const propsData = {
            checkoutUrl,
            checkoutAvailableFulfilmentUrl
        };

        describe('loadCheckout ::', () => {
            describe('when `getCheckout` request fails', () => {
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
                    expect(wrapper.emitted(EventNames.CheckoutGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutGetFailure).length).toBe(1);
                });
            });

            describe('when `getCheckout` request succeeds', () => {
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
            });
        });

        describe('loadAvailableFulfilment ::', () => {
            describe('when `getAvailableFulfilment` request fails', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getAvailableFulfilment: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should emit failure event', async () => {
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure).length).toBe(1);
                });
            });

            describe('when `getAvailableFulfilment` request succeeds', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getAvailableFulfilment: jest.fn(async () => Promise.resolve()) }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should emit success event', async () => {
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure)).toBeUndefined();
                });
            });
        });
    });
});
