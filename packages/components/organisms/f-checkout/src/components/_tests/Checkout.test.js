import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import { VueI18n } from '@justeat/f-globalisation';
import { validations } from '@justeat/f-services';
import { CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_COLLECTION, TENANT_MAP } from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';

import {
    defaultState, defaultActions, i18n, createStore
} from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const $v = {
    customer: {
        mobileNumber: {
            $dirty: false,
            isValidPhoneNumber: false
        },
        firstName: {
            $dirty: false
        },
        lastName: {
            $dirty: false
        },
        email: {
            $dirty: false,
            email: false
        }
    },
    address: {
        city: {
            $dirty: false,
            required: true
        },
        line1: {
            $dirty: false,
            required: false
        },
        postcode: {
            $dirty: false,
            required: true,
            isValidPostcode: false
        }
    },
    $touch: jest.fn()
};

describe('Checkout', () => {
    allure.feature('Checkout');
    const updateCheckoutUrl = 'http://localhost/updatecheckout';
    const getCheckoutUrl = 'http://localhost/checkout';
    const checkoutAvailableFulfilmentUrl = 'http://localhost/checkout/fulfilment';
    const loginUrl = 'http://localhost/login';
    const createGuestUrl = 'http://localhost/createguestuser';
    const getBasketUrl = 'http://localhost/getbasket';
    const getAddressUrl = 'http://localhost/getaddress';
    const propsData = {
        updateCheckoutUrl,
        getCheckoutUrl,
        loginUrl,
        checkoutAvailableFulfilmentUrl,
        createGuestUrl,
        getBasketUrl,
        getAddressUrl
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(VueCheckout, {
            i18n,
            store: createStore(),
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should have one form with method "post"', () => {
        // Arrange
        const wrapper = shallowMount(VueCheckout, {
            i18n,
            store: createStore(),
            localVue,
            propsData
        });

        // Act
        const forms = wrapper.findAll('form');

        // Assert
        expect(forms.length).toBe(1);
        expect(forms.wrappers[0].attributes('method')).toBe('post');
    });

    describe('created :: ', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should not register the `checkout` module if it already exists in the store', () => {
            // Arrange
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

        describe('hasCheckoutLoadedSuccessfully ::', () => {
            it('should render the checkout form and not the error page when set to `true`', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            hasCheckoutLoadedSuccessfully: true
                        };
                    }
                });

                const checkoutForm = wrapper.find('[data-test-id="checkout-component"]');
                const errorPage = wrapper.find('[data-test-id="checkout-error-page-component"]');

                // Assert
                expect(checkoutForm.exists()).toBe(true);
                expect(errorPage.exists()).toBe(false);
            });

            it('should render the error page and not the checkout form when set to `false`', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            hasCheckoutLoadedSuccessfully: false
                        };
                    }
                });

                const checkoutForm = wrapper.find('[data-test-id="checkout-component"]');
                const errorPage = wrapper.find('[data-test-id="checkout-error-page-component"]');

                // Assert
                expect(checkoutForm.exists()).toBe(false);
                expect(errorPage.exists()).toBe(true);
            });
        });
    });

    describe('props ::', () => {
        describe('authToken ::', () => {
            it('should store auth token', async () => {
                // Arrange
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
        describe('isMobileNumberValid ::', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });
            });

            it('should return `true` if mobileNumber field has not been touched', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = false;

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBeTruthy();
            });

            it('should return `false` if mobileNumber field has been touched but mobileNumber is not valid', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.$v.customer.mobileNumber.isValidPhoneNumber = false;

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBeFalsy();
            });

            it('should return `true` if mobileNumber field has been touched and mobileNumber is valid', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.$v.customer.mobileNumber.isValidPhoneNumber = true;

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBeTruthy();
            });
        });

        describe('isCheckoutMethodDelivery ::', () => {
            it('should return `true` if `serviceType` is set to Delivery', () => {
                // Arrange and Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isCheckoutMethodDelivery).toBeTruthy();
            });

            it('should return `false` if `serviceType` is set to Collection', () => {
                // Arrange and Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isCheckoutMethodDelivery).toBeFalsy();
            });
        });

        describe('tenant ::', () => {
            it.each([
                ['en-AU', 'au'],
                ['en-NZ', 'nz'],
                ['da-DK', 'dk'],
                ['es-ES', 'es'],
                ['en-IE', 'ie'],
                ['it-IT', 'it'],
                ['nb-NO', 'no'],
                ['en-GB', 'uk']
            ])('should return %s when i18n is set to %s', (locale, tenant) => {
                // Arrange
                i18n.locale = locale;

                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.tenant).toEqual(tenant);
            });
        });

        describe('shouldLoadAddress ::', () => {
            it('should return `true` for delivery order without address when user is logged in', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultState,
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_DELIVERY,
                        address: {}
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadAddress;

                // Assert
                expect(result).toBe(true);
            });

            it('should return `false` if `isLoggedIn` is `false`', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultState,
                        isLoggedIn: false,
                        serviceType: CHECKOUT_METHOD_DELIVERY,
                        address: {}
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadAddress;

                // Assert
                expect(result).toBe(false);
            });

            it('should return `false` if `serviceType` is `collection`', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultState,
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_COLLECTION,
                        address: {}
                    }),
                    i18n,
                    localVue,
                    propsData
                });
                const result = await wrapper.vm.shouldLoadAddress;

                // Assert
                expect(result).toBe(false);
            });

            it('should return `false` if address is set', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultState,
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_DELIVERY,
                        address: { line1: 'Fleet Place House', postcode: 'EC4M 7RF', city: 'London' }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadAddress;

                // Assert
                expect(result).toBe(false);
            });
        });
    });

    describe('mounted ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call `initialise`', () => {
            // Arrange
            const initialiseSpy = jest.spyOn(VueCheckout.methods, 'initialise');

            // Act
            shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            // Assert
            expect(initialiseSpy).toHaveBeenCalled();
        });
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('initialise ::', () => {
            it('should call `setAuthToken`', () => {
                // Arrange & Act
                const setAuthTokenSpy = jest.spyOn(VueCheckout.methods, 'setAuthToken');

                const propsDataWithAuthToken = {
                    ...propsData,
                    authToken: 'mytoken'
                };

                shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData: propsDataWithAuthToken
                });

                // Assert
                expect(setAuthTokenSpy).toHaveBeenCalledWith(propsDataWithAuthToken.authToken);
            });

            it('should call `loadBasket`', async () => {
                // Arrange & Act
                const loadBasketSpy = jest.spyOn(VueCheckout.methods, 'loadBasket');

                shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
                await flushPromises();

                // Assert
                expect(loadBasketSpy).toHaveBeenCalled();
            });

            it('should call `loadAvailableFulfilment`', async () => {
                // Arrange & Act
                const loadAvailableFulfilmentSpy = jest.spyOn(VueCheckout.methods, 'loadAvailableFulfilment');

                shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
                await flushPromises();

                // Assert
                expect(loadAvailableFulfilmentSpy).toHaveBeenCalled();
            });

            describe('if shouldLoadAddress returns `false`', () => {
                it('should not call `loadAddress`', async () => {
                    // Arrange & Act
                    const loadAddressSpy = jest.spyOn(VueCheckout.methods, 'loadAddress');
                    jest.spyOn(VueCheckout.computed, 'shouldLoadAddress').mockReturnValueOnce(false);

                    shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadAddressSpy).not.toHaveBeenCalled();
                });
            });

            describe('if shouldLoadAddress returns `true`', () => {
                it('should call `loadAddress`', async () => {
                    // Arrange & Act
                    const loadAddressSpy = jest.spyOn(VueCheckout.methods, 'loadAddress');
                    jest.spyOn(VueCheckout.computed, 'shouldLoadAddress').mockReturnValueOnce(true);

                    shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadAddressSpy).toHaveBeenCalled();
                });
            });

            describe('if isLoggedIn set to `false`', () => {
                it('should not call `loadCheckout`', async () => {
                    // Arrange & Act
                    const loadCheckoutSpy = jest.spyOn(VueCheckout.methods, 'loadCheckout');

                    shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadCheckoutSpy).not.toHaveBeenCalled();
                });
            });

            describe('if isLoggedIn set to `true`', () => {
                it('should call `loadCheckout`', async () => {
                    // Arrange & Act
                    const loadCheckoutSpy = jest.spyOn(VueCheckout.methods, 'loadCheckout');

                    shallowMount(VueCheckout, {
                        store: createStore({ ...defaultState, isLoggedIn: true }),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadCheckoutSpy).toHaveBeenCalled();
                });
            });
        });

        describe('submitCheckout ::', () => {
            describe('if serviceType set to `collection`', () => {
                let wrapper;

                describe('when all the fields are populated correctly', () => {
                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should emit success event', async () => {
                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                        expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
                    });

                    it('success event should include `serviceType` and user authentication status', async () => {
                        const payload = {
                            isLoggedIn: false,
                            serviceType: CHECKOUT_METHOD_COLLECTION
                        };

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(wrapper.emitted(EventNames.CheckoutSuccess)[0][0]).toEqual(payload);
                    });
                });

                it('should show error message and emit failure event when the mobile number field is not populated', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                mobileNumber: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                    // Assert
                    expect(mobileNumberEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.mobileNumber');
                });

                it('should show error message and emit failure event when the mobile number field is populated with a < 10 numbers', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                mobileNumber: '077777'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                    // Assert
                    expect(wrapper.vm.isMobileNumberValid).toBe(false);
                    expect(mobileNumberEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.mobileNumber');
                });

                it('should show error message and emit failure event when the mobile number field is populated with non numeric value', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                mobileNumber: 'hs;-j`$e&1l'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const mobileNumberEmptyMessage = wrapper.find('[data-test-id="error-mobile-number"]');

                    // Assert
                    expect(wrapper.vm.isMobileNumberValid).toBe(false);
                    expect(mobileNumberEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.mobileNumber');
                });

                it('should not create validations for address', () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.$v.fulfilment).toBeUndefined();
                });
            });

            describe('if serviceType set to `delivery`', () => {
                let wrapper;

                describe('when all the fields are populated correctly', () => {
                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                            i18n,
                            localVue,
                            propsData
                        });
                    });

                    it('should emit success event', async () => {
                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                        expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
                    });

                    it('success event should include `serviceType` and user authentication status', async () => {
                        const payload = {
                            isLoggedIn: false,
                            serviceType: CHECKOUT_METHOD_DELIVERY
                        };

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(wrapper.emitted(EventNames.CheckoutSuccess)[0][0]).toEqual(payload);
                    });
                });

                it('should emit failure event and display error message when address line1 input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultState.address,
                                line1: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const addressLine1EmptyMessage = wrapper.find('[data-test-id="error-address-line1-empty"]');

                    // Assert
                    expect(addressLine1EmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('address.line1');
                });

                it('should emit failure event and display error message when city input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultState.address,
                                city: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const addressCityEmptyMessage = wrapper.find('[data-test-id="error-address-city-empty"]');

                    // Assert
                    expect(addressCityEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('address.city');
                });

                it('should emit failure event and display error message when postcode input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultState.address,
                                postcode: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const addressPostcodeEmptyMessage = wrapper.find('[data-test-id="error-address-postcode-empty"]');

                    // Assert
                    expect(addressPostcodeEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('address.postcode');
                });

                it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultState.address,
                                postcode: '?!hdb-se'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const addressPostcodeTypeErrorMessage = wrapper.find('[data-test-id="error-address-postcode-type-error"]');

                    // Assert
                    expect(addressPostcodeTypeErrorMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('address.postcode');
                });


                it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultState.address,
                                postcode: 'EC4M 7R'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const addressPostcodeTypeErrorMessage = wrapper.find('[data-test-id="error-address-postcode-type-error"]');

                    // Assert
                    expect(addressPostcodeTypeErrorMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('address.postcode');
                });

                it('should create validations for address', () => {
                    // Assert
                    expect(wrapper.vm.$v.address.line1).toBeDefined();
                    expect(wrapper.vm.$v.address.city).toBeDefined();
                    expect(wrapper.vm.$v.address.postcode).toBeDefined();
                });
            });

            describe('if `isLoggedIn` set to `false`', () => {
                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `setupGuestUser`', async () => {
                    // Arrange
                    const setupGuestUserSpy = jest.spyOn(VueCheckout.methods, 'setupGuestUser');
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(setupGuestUserSpy).toHaveBeenCalled();
                });

                it('should emit success event when all the fields are populated correctly', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
                });

                it('should show error message and emit failure event when the first name field is not populated', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                firstName: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const firstNameEmptyMessage = wrapper.find('[data-test-id="error-first-name-empty"]');

                    // Assert
                    expect(firstNameEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.firstName');
                });

                it('should show error message and emit failure event when the last name field is not populated', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                lastName: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const lastNameEmptyMessage = wrapper.find('[data-test-id="error-last-name-empty"]');

                    // Assert
                    expect(lastNameEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.lastName');
                });

                it('should show error message and emit failure event when the email field is not populated', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                email: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const emailEmptyMessage = wrapper.find('[data-test-id="error-email-invalid"]');

                    // Assert
                    expect(emailEmptyMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.email');
                });

                it('should show error message and emit failure event when the email field is invalid', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultState.customer,
                                email: '£Gs7asd263('
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();
                    const emailInvalidMessage = wrapper.find('[data-test-id="error-email-invalid"]');

                    // Assert
                    expect(emailInvalidMessage).toMatchSnapshot();
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0].invalidFields).toContain('customer.email');
                });
            });

            describe('if `isLoggedIn` set to `true`', () => {
                it('should not call `setupGuestUser`', async () => {
                    // Arrange
                    const setupGuestUserSpy = jest.spyOn(VueCheckout.methods, 'setupGuestUser');
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            authToken: 'sampleToken',
                            isLoggedIn: true
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(setupGuestUserSpy).not.toHaveBeenCalled();
                });

                it('should not create validations for guest', () => {
                    // Arrange
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            authToken: 'sampleToken',
                            isLoggedIn: true
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.$v.customer.firstName).toBeUndefined();
                    expect(wrapper.vm.$v.customer.lastName).toBeUndefined();
                    expect(wrapper.vm.$v.customer.email).toBeUndefined();
                });
            });
        });

        describe('setupGuestUser ::', () => {
            it('should call `createGuestUser`', async () => {
                // Arrange
                const customer = {
                    firstName: 'Joe',
                    lastName: 'Bloggs',
                    email: 'joe@test.com',
                    mobileNumber: '+447111111111'
                };
                const expected = {
                    url: createGuestUrl,
                    tenant: TENANT_MAP[i18n.locale],
                    data: {
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        emailAddress: customer.email,
                        registrationSource: 'Guest'
                    },
                    timeout: 1000
                };
                const createGuestUserSpy = jest.spyOn(VueCheckout.methods, 'createGuestUser');
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultState,
                        customer
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                await wrapper.vm.setupGuestUser();

                // Assert
                expect(createGuestUserSpy).toHaveBeenCalledWith(expected);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `createGuestUser` request fails', () => {
                it('should emit `CheckoutSetupGuestFailure` event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, createGuestUser: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.setupGuestUser();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestFailure).length).toBe(1);
                });
            });

            describe('when `createGuestUser` request succeeds', () => {
                it('should emit `CheckoutSetupGuestSuccess` event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.setupGuestUser();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestFailure)).toBeUndefined();
                });
            });
        });

        describe('loadCheckout ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getCheckout` request fails', () => {
                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getCheckout: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadCheckout();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutGetFailure).length).toBe(1);
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });
            });

            describe('when `getCheckout` request succeeds', () => {
                it('should emit success event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadCheckout();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutGetFailure)).toBeUndefined();
                });
            });
        });

        describe('loadAvailableFulfilment ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getAvailableFulfilment` request fails', () => {
                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getAvailableFulfilment: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure).length).toBe(1);
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });
            });

            describe('when `getAvailableFulfilment` request succeeds', () => {
                it('should emit success event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure)).toBeUndefined();
                });
            });
        });

        describe('loadBasket ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getBasket` request fails', () => {
                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getBasket: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetSuccess)).toBeUndefined();
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });
            });

            describe('when `getBasket` request succeeds', () => {
                it('should emit success event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetFailure)).toBeUndefined();
                });
            });
        });

        describe('loadAddress ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getAddress` request fails', () => {
                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultState, { ...defaultActions, getAddress: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetSuccess)).toBeUndefined();
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });
            });

            describe('when `getAddress` request succeeds', () => {
                it('should emit success event', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetFailure)).toBeUndefined();
                });
            });
        });

        describe('handleErrorState ::', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
            });

            it('should emit failure event and update `genericErrorMessage` with first error message description', () => {
                // Arrange
                const errorDescription = 'Error Description';
                const error = {
                    response: {
                        data: {
                            errors: [
                                {
                                    description: errorDescription
                                }
                            ]
                        }
                    }
                };

                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.vm.genericErrorMessage).toEqual(errorDescription);
            });

            it('should emit failure event and use tenant `genericErrorMessage` if returned errors have no description', () => {
                // Arrange
                const error = {
                    response: {
                        data: {
                            errors: [{}]
                        }
                    }
                };

                const genericErrorMessage = 'Something went wrong, please try again later';

                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.vm.genericErrorMessage).toEqual(genericErrorMessage);
            });

            it('should emit failure event and update `genericErrorMessage` with error if single error', () => {
                // Arrange
                const error = 'Unknown Error';

                wrapper.vm.handleErrorState(error);

                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.vm.genericErrorMessage).toEqual(error);
            });

            it('should emit failure with `serviceType` user authentication status and error details', () => {
                // Arrange
                const error = 'Unknown Error';

                const payload = {
                    errors: error,
                    isLoggedIn: false,
                    serviceType: CHECKOUT_METHOD_DELIVERY
                };

                wrapper.vm.handleErrorState(error);

                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0]).toEqual(payload);
            });
        });

        describe('isFormValid ::', () => {
            let touchSpy;

            beforeEach(() => {
                touchSpy = jest.spyOn($v, '$touch');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `.touch()` ', () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });

                wrapper.vm.isFormValid();

                // Assert
                expect(touchSpy).toBeCalled();
            });

            it('should return `true` if `$v` is valid', () => {
                // Arrange
                $v.$invalid = false;

                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });

                // Assert
                expect(wrapper.vm.isFormValid()).toBeTruthy();
            });

            it('should return `false` if `$v` is invalid', () => {
                // Arrange
                $v.$invalid = true;

                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });

                // Assert
                expect(wrapper.vm.isFormValid()).toBeFalsy();
            });
        });

        describe('onFormSubmit ::', () => {
            let isFormValidSpy;
            let submitCheckoutSpy;

            beforeEach(() => {
                isFormValidSpy = jest.spyOn(VueCheckout.methods, 'isFormValid');
                submitCheckoutSpy = jest.spyOn(VueCheckout.methods, 'submitCheckout');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should emit `CheckoutValidationError` with validation state if form is invalid', async () => {
                // Arrange
                const mockValidationState = {
                    validFields: [
                        'customer.mobileNumber',
                        'address.line1',
                        'address.city',
                        'address.postcode'
                    ],
                    invalidFields: []
                };

                const getFormValidationStateSpy = jest.spyOn(validations, 'getFormValidationState');

                getFormValidationStateSpy.mockReturnValue(mockValidationState);
                isFormValidSpy.mockReturnValue(false);

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v
                    }
                });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutValidationError)[0][0]).toEqual(mockValidationState);
            });

            it('should try to call `submitCheckout` if form is Valid', async () => {
                // Arrange
                isFormValidSpy.mockReturnValue(true);

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v
                    }
                });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(submitCheckoutSpy).toHaveBeenCalled();
            });

            it('should call `handleErrorState` if `submitCheckout` returns an error', async () => {
                // Arrange
                const handleErrorStateSpy = jest.spyOn(VueCheckout.methods, 'handleErrorState');
                const error = new Error('errorMessage');

                submitCheckoutSpy.mockImplementation(() => { throw error; });
                isFormValidSpy.mockReturnValue(true);

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v
                    }
                });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(handleErrorStateSpy).toHaveBeenCalledWith(error);
            });
        });

        describe('isValidPhoneNumber ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPhoneNumber` from `f-services`', () => {
                // Arrange
                const isValidPhoneNumberSpy = jest.spyOn(validations, 'isValidPhoneNumber');

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.isValidPhoneNumber();

                // Assert
                expect(isValidPhoneNumberSpy).toHaveBeenCalledWith(defaultState.customer.mobileNumber, i18n.locale);
            });
        });

        describe('isValidPostcode ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPostcode` from `f-services`', () => {
                // Arrange
                const isValidPostcodeSpy = jest.spyOn(validations, 'isValidPostcode');

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.isValidPostcode();

                // Assert
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(defaultState.address.postcode, i18n.locale);
            });
        });

        describe('updateCustomerDetails', () => {
            it('should be called with new input value on user input', async () => {
                // Arrange
                const updateCustomerDetailsSpy = jest.spyOn(VueCheckout.methods, 'updateCustomerDetails');

                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
                const newNumber = '+447111111112';

                // Act
                await wrapper.find('[data-test-id="formfield-mobile-number-input"]').setValue(newNumber);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateCustomerDetailsSpy).toHaveBeenCalledWith({ mobileNumber: newNumber });
            });
        });
    });

    describe('watch ::', () => {
        describe('authToken ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `initialise`', async () => {
                // Arrange
                const initialiseSpy = jest.spyOn(VueCheckout.methods, 'initialise');

                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                jest.clearAllMocks(); // Reset the mock calls given the initialise function gets called upon mount.

                // Act
                await wrapper.vm.$options.watch.authToken[0].call(wrapper.vm);

                // Assert
                expect(initialiseSpy).toHaveBeenCalled();
            });
        });
    });
});
