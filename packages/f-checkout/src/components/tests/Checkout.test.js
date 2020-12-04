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

const defaultCheckoutState = {
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

const defaultCheckoutActions = {
    getCheckout: jest.fn(),
    postCheckout: jest.fn()
};

const defaultRestaurantState = {
    name: 'Tony\'s Kebabs',
    allergenInformation: {
        phoneNumber: '+447000000000',
        url: 'https://tonyskebabstestrestaurant.com'
    }
};

const defaultRestaurantActions = {
    getRestaurant: jest.fn()
};

const defaultRestaurantGetters = {
    isMcDonalds: jest.fn()
};

const i18n = {
    locale: 'en-GB',
    messages: tenantConfigs['en-GB']
};

const createStore = (
    checkoutState = defaultCheckoutState,
    checkoutActions = defaultCheckoutActions,
    restaurantState = defaultRestaurantState,
    restaurantActions = defaultRestaurantActions,
    restaurantGetters = defaultRestaurantGetters
) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state: checkoutState,
            actions: checkoutActions
        },
        restaurant: {
            namespaced: true,
            state: restaurantState,
            actions: restaurantActions,
            getters: restaurantGetters
        }
    },
    hasModule: jest.fn(() => true)
});

describe('Checkout', () => {
    allure.feature('Checkout');
    const checkoutUrl = 'http://checkout';
    const restaurantUrl = 'http://restaurant';

    it('should be defined', () => {
        const propsData = { checkoutUrl, restaurantUrl };

        const wrapper = shallowMount(VueCheckout, {
            i18n,
            store: createStore(),
            localVue,
            propsData,
            mocks: {
                $cookies: {
                    get: jest.fn()
                }
            }
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
                restaurantUrl
            };

            const store = new Vuex.Store({});

            const registerModuleSpy = jest.spyOn(store, 'registerModule');

            // Act
            shallowMount(VueCheckout, {
                store,
                i18n,
                localVue,
                propsData,
                mocks: {
                    $cookies: {
                        get: jest.fn()
                    }
                }
            });

            // Assert
            expect(registerModuleSpy).toHaveBeenCalledWith('checkout', expect.any(Object));
        });

        it('should not register the `checkout` module if it already exists in the store', () => {
            // Arrange
            const propsData = {
                checkoutUrl,
                restaurantUrl
            };

            const store = createStore();

            const registerModuleSpy = jest.spyOn(store, 'registerModule');

            // Act
            shallowMount(VueCheckout, {
                store,
                i18n,
                localVue,
                propsData,
                mocks: {
                    $cookies: {
                        get: jest.fn()
                    }
                }
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
                    restaurantUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });

                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(true);
            });

            it('should not display the address block if set to `collection`', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl,
                    restaurantUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
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
                    checkoutUrl,
                    restaurantUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toContain(defaultCheckoutState.customer.firstName);
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Arrange
                const propsData = {
                    checkoutUrl,
                    restaurantUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toEqual(`${defaultCheckoutState.customer.firstName}, confirm your details`);
            });
        });
    });

    describe('when form submitted', () => {
        describe('if serviceType set to `collection`', () => {
            const propsData = {
                checkoutUrl,
                restaurantUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultCheckoutState,
                    serviceType: CHECKOUT_METHOD_COLLECTION,
                    customer: {
                        firstName: defaultCheckoutState.customer.firstName
                    },
                    fulfillment: {
                        times: fulfillmentTimes,
                        address: {}
                    }
                };

                wrapper = mount(VueCheckout, {
                    store: createStore(state, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.resolve()), postCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });
            });

            it('should emit success event when all the fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="input-mobile-number"]').setValue(defaultCheckoutState.customer.mobileNumber);

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
            });

            it('should show error message and emit failure event when the mobile number field is not populated', async () => {
                // Arrange
                wrapper.find('[data-test-id="input-mobile-number"]').setValue('');

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
                wrapper.find('[data-test-id="input-mobile-number"]').setValue('077777');

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
                wrapper.find('[data-test-id="input-mobile-number"]').setValue('hs;-j`$e&1l');

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
                checkoutUrl,
                restaurantUrl
            };

            let wrapper;

            beforeEach(() => {
                const state = {
                    ...defaultCheckoutState,
                    serviceType: CHECKOUT_METHOD_DELIVERY,
                    customer: {
                        firstName: defaultCheckoutState.customer.firstName
                    },
                    fulfillment: {
                        times: fulfillmentTimes,
                        address: {}
                    }
                };

                wrapper = mount(VueCheckout, {
                    store: createStore(state, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.resolve()), postCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });
            });

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                wrapper.find('[data-test-id="input-mobile-number"]').setValue(defaultCheckoutState.customer.mobileNumber);
                wrapper.find('[data-test-id="input-address-line-1"]').setValue(defaultCheckoutState.fulfillment.address.line1);
                wrapper.find('[data-test-id="input-address-city"]').setValue(defaultCheckoutState.fulfillment.address.city);
                wrapper.find('[data-test-id="input-address-postcode"]').setValue(defaultCheckoutState.fulfillment.address.postcode);

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
                wrapper.find('[data-test-id="input-address-postcode"]').setValue('?!hdb-se');

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
                wrapper.find('[data-test-id="input-address-postcode"]').setValue('EC4M 7R');

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
            checkoutUrl,
            restaurantUrl
        };

        describe('when request fails', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.reject()) }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
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
                    store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.resolve()) }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies: {
                            get: jest.fn()
                        }
                    }
                });
            });

            it('should emit success event', async () => {
                expect(wrapper.emitted(EventNames.CheckoutGetSuccess).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutGetFailure)).toBeUndefined();
            });

            it('should set mobile number', async () => {
                expect(wrapper.find('[data-test-id="input-mobile-number"]').element.value).toBe(defaultCheckoutState.customer.mobileNumber);
            });

            it('should set address fields', async () => {
                expect(wrapper.find('[data-test-id="input-address-line-1"]').element.value).toBe(defaultCheckoutState.fulfillment.address.line1);
                expect(wrapper.find('[data-test-id="input-address-line-2"]').element.value).toBe(defaultCheckoutState.fulfillment.address.line2);
                expect(wrapper.find('[data-test-id="input-address-city"]').element.value).toBe(defaultCheckoutState.fulfillment.address.city);
                expect(wrapper.find('[data-test-id="input-address-postcode"]').element.value).toBe(defaultCheckoutState.fulfillment.address.postcode);
            });
        });
    });
});
