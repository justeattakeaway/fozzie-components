import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import { VueI18n } from '@justeat/f-globalisation';
import { validations } from '@justeat/f-services';
import {
    ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE,
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_COLLECTION,
    ERROR_CODE_FULFILMENT_TIME_INVALID,
    TENANT_MAP
} from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';

import {
    defaultCheckoutState, defaultCheckoutActions, i18n, createStore, $logger
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
    const placeOrderUrl = 'http://localhost/placeorder';
    const paymentPageUrlPrefix = 'http://localhost/paymentpage';
    const getGeoLocationUrl = 'http://localhost/geolocation';

    const applicationName = 'Jest';

    const propsData = {
        updateCheckoutUrl,
        getCheckoutUrl,
        loginUrl,
        checkoutAvailableFulfilmentUrl,
        createGuestUrl,
        getBasketUrl,
        getAddressUrl,
        placeOrderUrl,
        paymentPageUrlPrefix,
        getGeoLocationUrl,
        applicationName
    };

    let windowLocationSpy;

    beforeEach(() => {
        windowLocationSpy = jest.spyOn(window.location, 'assign').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

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
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
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
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
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


            it('should render the error page and not the checkout form and spinner when set to `false`', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            hasCheckoutLoadedSuccessfully: false,
                            isLoading: false
                        };
                    }
                });

                const checkoutForm = wrapper.find('[data-test-id="checkout-component"]');
                const errorPage = wrapper.find('[data-test-id="checkout-error-page-component"]');
                const spinner = wrapper.find('[data-test-id="checkout-loading-spinner"]');

                // Assert
                expect(checkoutForm.exists()).toBe(false);
                expect(spinner.exists()).toBe(false);
                expect(errorPage.exists()).toBe(true);
            });
        });

        describe('shouldShowSpinner ::', () => {
            it('should render the loading spinner and not the checkout form when shouldShowSpinner is set to `true`', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            hasCheckoutLoadedSuccessfully: true,
                            shouldShowSpinner: true
                        };
                    }
                });

                const checkoutForm = wrapper.find('[data-test-id="checkout-component"]');
                const spinner = wrapper.find('[data-test-id="checkout-loading-spinner"]');

                // Assert
                expect(checkoutForm.exists()).toBe(false);
                expect(spinner.exists()).toBe(true);
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
                    store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, setAuthToken }),
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
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
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
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
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
                        ...defaultCheckoutState,
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
                        ...defaultCheckoutState,
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
                        ...defaultCheckoutState,
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
                        ...defaultCheckoutState,
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
        let initialiseSpy;
        let trackInitialLoadSpy;

        beforeEach(() => {
            initialiseSpy = jest.spyOn(VueCheckout.methods, 'initialise');
            trackInitialLoadSpy = jest.spyOn(VueCheckout.methods, 'trackInitialLoad');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call `initialise`', () => {
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

        it('should call `trackInitialLoad`', async () => {
            // Act
            const wrapper = shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            await wrapper.vm.initialise();

            // Assert
            expect(trackInitialLoadSpy).toHaveBeenCalled();
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

            it('should call `startSpinnerCountdown`', async () => {
                // Arrange
                const startSpinnerCountdownSpy = jest.spyOn(VueCheckout.methods, 'startSpinnerCountdown');

                // Act
                shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
                await flushPromises();

                // Assert
                expect(startSpinnerCountdownSpy).toHaveBeenCalled();
            });

            it('should call `resetLoadingState`', async () => {
                // Arrange
                const resetLoadingStateSpy = jest.spyOn(VueCheckout.methods, 'resetLoadingState');

                // Act
                shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });
                await flushPromises();

                // Assert
                expect(resetLoadingStateSpy).toHaveBeenCalled();
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
                        store: createStore({ ...defaultCheckoutState, isLoggedIn: true }),
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

        describe('startSpinnerCountdown ::', () => {
            beforeEach(() => {
                jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.clearAllMocks();
                jest.clearAllTimers();
            });

            describe('when `isLoading` is `true`', () => {
                it('should not set `shouldShowSpinner` to `true` before one second', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        data () {
                            return {
                                isLoading: true
                            };
                        }
                    });

                    wrapper.vm.startSpinnerCountdown();
                    jest.advanceTimersByTime(999);

                    // Assert
                    expect(wrapper.vm.shouldShowSpinner).toBe(false);
                });

                it('should set `shouldShowSpinner` to `true` after one second', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        data () {
                            return {
                                isLoading: true
                            };
                        }
                    });

                    wrapper.vm.startSpinnerCountdown();
                    jest.advanceTimersByTime(1000);

                    // Assert
                    expect(wrapper.vm.shouldShowSpinner).toBe(true);
                });
            });

            describe('when `isLoading` is `false`', () => {
                it('should not set `shouldShowSpinner` to `true` after one second', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        data () {
                            return {
                                isLoading: false
                            };
                        }
                    });

                    wrapper.vm.startSpinnerCountdown();
                    jest.advanceTimersByTime(1000);

                    // Assert
                    expect(wrapper.vm.shouldShowSpinner).toBe(false);
                });

                it('should not set `shouldShowSpinner` to `true` before one second', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        data () {
                            return {
                                isLoading: false
                            };
                        }
                    });

                    wrapper.vm.startSpinnerCountdown();
                    jest.advanceTimersByTime(999);

                    // Assert
                    expect(wrapper.vm.shouldShowSpinner).toBe(false);
                });
            });
        });

        describe('submitCheckout ::', () => {
            let wrapper;
            let handleUpdateCheckoutSpy;
            let submitOrderSpy;
            let redirectToPaymentSpy;

            beforeEach(() => {
                handleUpdateCheckoutSpy = jest.spyOn(VueCheckout.methods, 'handleUpdateCheckout');
                submitOrderSpy = jest.spyOn(VueCheckout.methods, 'submitOrder');
                redirectToPaymentSpy = jest.spyOn(VueCheckout.methods, 'redirectToPayment');
            });

            it('should call `handleUpdateCheckout`', async () => {
                // Arrange
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act
                await wrapper.vm.submitCheckout();

                // Assert
                expect(handleUpdateCheckoutSpy).toHaveBeenCalled();
            });

            describe('if serviceType set to `collection`', () => {
                describe('when all the fields are populated correctly', () => {
                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
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

                    it('should call `logInfo`', async () => {
                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect($logger.logInfo).toHaveBeenCalled();
                    });
                });

                it('should show error message and emit failure event when the mobile number field is not populated', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                mobileNumber: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                mobileNumber: '077777'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                mobileNumber: 'hs;-j`$e&1l'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                        store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Assert
                    expect(wrapper.vm.$v.fulfilment).toBeUndefined();
                });

                it('should call `logWarn` if field is invalid', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            customer: {
                                ...defaultCheckoutState.customer,
                                mobileNumber: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect($logger.logWarn).toHaveBeenCalled();
                });
            });

            describe('if serviceType set to `delivery`', () => {
                describe('when all the fields are populated correctly', () => {
                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
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

                    it('should call `logInfo`', async () => {
                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect($logger.logInfo).toHaveBeenCalled();
                    });
                });

                it('should emit failure event and display error message when address line1 input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                line1: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                city: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                postcode: ''
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                postcode: '?!hdb-se'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                postcode: 'EC4M 7R'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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

                it('should call `logWarn` if field is invalid', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            address: {
                                ...defaultCheckoutState.address,
                                postcode: 'EC4M 7R'
                            }
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect($logger.logWarn).toHaveBeenCalled();
                });
            });

            describe('if `isLoggedIn` set to `false`', () => {
                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `setupGuestUser`', async () => {
                    // Arrange
                    const setupGuestUserSpy = jest.spyOn(VueCheckout.methods, 'setupGuestUser');
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(setupGuestUserSpy).toHaveBeenCalled();
                });

                it('should emit success event when all the fields are populated correctly', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)).toBeUndefined();
                });

                it('should show error message and emit failure event when the first name field is not populated', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                firstName: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                lastName: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                email: ''
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            customer: {
                                ...defaultCheckoutState.customer,
                                email: '£Gs7asd263('
                            },
                            isLoggedIn: false
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
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
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            authToken: 'sampleToken',
                            isLoggedIn: true
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(setupGuestUserSpy).not.toHaveBeenCalled();
                });

                it('should not create validations for guest', () => {
                    // Arrange
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            authToken: 'sampleToken',
                            isLoggedIn: true
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Assert
                    expect(wrapper.vm.$v.customer.firstName).toBeUndefined();
                    expect(wrapper.vm.$v.customer.lastName).toBeUndefined();
                    expect(wrapper.vm.$v.customer.email).toBeUndefined();
                });
            });

            describe('when `isFulfillable` is true', () => {
                const store = createStore({ ...defaultCheckoutState, isFulfillable: true });

                beforeEach(() => {
                    wrapper = shallowMount(VueCheckout, {
                        store,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should call `submitOrder`', async () => {
                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect(submitOrderSpy).toHaveBeenCalled();
                });

                it('should call `redirectToPayment`', async () => {
                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect(redirectToPaymentSpy).toHaveBeenCalled();
                });

                it('should not call `logInfo` with correct Warning', async () => {
                    // Arrange
                    const eventData = {
                        isLoggedIn: false,
                        serviceType: 'delivery'
                    };

                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect($logger.logInfo).toHaveBeenCalledWith('Consumer Checkout Successful', store, eventData);
                });
            });

            describe('when `isFulfillable` is false', () => {
                const store = createStore({ ...defaultCheckoutState, isFulfillable: false });

                beforeEach(() => {
                    wrapper = shallowMount(VueCheckout, {
                        store,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should not call `logWarn` with correct Warning', async () => {
                    // Arrange
                    const eventData = {
                        isLoggedIn: false,
                        serviceType: 'delivery'
                    };

                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect($logger.logWarn).toHaveBeenCalledWith('Consumer Checkout Not Fulfilable', store, eventData);
                });
            });
        });

        describe('handleUpdateCheckout ::', () => {
            let wrapper;
            let trackFormInteractionSpy;
            let updateCheckoutSpy;

            beforeEach(() => {
                updateCheckoutSpy = jest.spyOn(VueCheckout.methods, 'updateCheckout');
            });

            it('should try to call `handleUpdateCheckout', async () => {
                // Arrange
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act
                await wrapper.vm.handleUpdateCheckout();

                // Assert
                expect(updateCheckoutSpy).toHaveBeenCalled();
            });

            describe('when `updateCheckout` request succeeds', () => {
                let trackFormErrorsSpy;
                const errors = [{ code: 'error' }];

                beforeEach(() => {
                    trackFormErrorsSpy = jest.spyOn(VueCheckout.methods, 'trackFormErrors');

                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            errors
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `trackFormErrors` if response contains `errors`', async () => {
                    // Act
                    await wrapper.vm.handleUpdateCheckout();

                    // Assert
                    expect(trackFormErrorsSpy).toHaveBeenCalled();
                });
            });

            describe('when `updateCheckout` request fails', () => {
                describe(`when 'errors' include '${ERROR_CODE_FULFILMENT_TIME_INVALID}'`, () => {
                    const error = {
                        errors: [
                            {
                                errorCode: ERROR_CODE_FULFILMENT_TIME_INVALID
                            }
                        ]
                    };

                    beforeEach(() => {
                        trackFormInteractionSpy = jest.spyOn(VueCheckout.methods, 'trackFormInteraction');

                        wrapper = mount(VueCheckout, {
                            store: createStore(
                                defaultCheckoutState,
                                {
                                    ...defaultCheckoutActions,
                                    updateCheckout: jest.fn(async () => Promise.reject(error))
                                }
                            ),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
                        });
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should call `trackFormInteraction` with `invalidOrderTime`', async () => {
                        // Arrange
                        const payload = {
                            action: 'error',
                            error: ['invalidOrderTime']
                        };

                        // Act
                        await wrapper.vm.handleUpdateCheckout();

                        // Assert
                        expect(trackFormInteractionSpy).toHaveBeenCalledWith(payload);
                    });
                });

                describe(`when 'errors' does not include '${ERROR_CODE_FULFILMENT_TIME_INVALID}'`, () => {
                    const error = {
                        errors: [
                            {
                                errorCode: 'TENANT_INVALID'
                            }
                        ]
                    };

                    beforeEach(() => {
                        trackFormInteractionSpy = jest.spyOn(VueCheckout.methods, 'trackFormInteraction');

                        wrapper = mount(VueCheckout, {
                            store: createStore(
                                defaultCheckoutState,
                                {
                                    ...defaultCheckoutActions,
                                    updateCheckout: jest.fn(async () => Promise.reject(error))
                                }
                            ),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
                        });
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should call `trackFormInteraction` with `invalidOrderTime`', async () => {
                        // Arrange
                        const payload = {
                            action: 'error',
                            error: ['basketNotOrderable']
                        };

                        // Act
                        await wrapper.vm.handleUpdateCheckout();

                        // Assert
                        expect(trackFormInteractionSpy).toHaveBeenCalledWith(payload);
                    });
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
                        ...defaultCheckoutState,
                        customer
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
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
                let wrapper;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, createGuestUser: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should emit `CheckoutSetupGuestFailure` event', async () => {
                    // Act
                    await wrapper.vm.setupGuestUser();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutSetupGuestFailure).length).toBe(1);
                });

                it('should call `logError`', async () => {
                    // Act
                    await wrapper.vm.setupGuestUser();

                    // Assert
                    expect($logger.logError).toHaveBeenCalled();
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
                        propsData,
                        mocks: {
                            $logger
                        }
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
                let wrapper;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Act
                    await wrapper.vm.loadCheckout();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutGetFailure).length).toBe(1);
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });

                it('should call `logError`', async () => {
                    // Act
                    await wrapper.vm.loadCheckout();

                    // Assert
                    expect($logger.logError).toHaveBeenCalled();
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
                        propsData,
                        mocks: {
                            $logger
                        }
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
                let wrapper;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getAvailableFulfilment: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess)).toBeUndefined();
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure).length).toBe(1);
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });

                it('should call `logError`', async () => {
                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect($logger.logError).toHaveBeenCalled();
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
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetSuccess).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAvailableFulfilmentGetFailure)).toBeUndefined();
                });
            });
        });

        describe('lookupGeoLocation ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getGeoLocation` request succeeds', () => {
                // Arrange
                let wrapper;
                let getGeoLocationSpy;

                const expected = {
                    url: getGeoLocationUrl,
                    postData: {
                        addressLines: [
                            '1 Bristol Road',
                            'Flat 1',
                            'Bristol',
                            'BS1 1AA'
                        ]
                    },
                    timeout: 1000
                };

                beforeEach(async () => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    getGeoLocationSpy = jest.spyOn(VueCheckout.methods, 'getGeoLocation');

                    wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    await flushPromises();
                });

                it('should not call `logWarn`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect($logger.logWarn).not.toHaveBeenCalledWith();
                });

                it('should call `getGeoLocation`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(getGeoLocationSpy).toHaveBeenCalledWith(expected);
                });
            });

            describe('when `getGeoLocation` request fails', () => {
                // Arrange
                let wrapper;
                let localStore;
                const errorMsg = 'jazz sometimes happens';

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    localStore = createStore(defaultCheckoutState, { ...defaultCheckoutActions, getGeoLocation: jest.fn(async () => Promise.reject(errorMsg)) });
                    wrapper = mount(VueCheckout, {
                        store: localStore,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should call `logWarn`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect($logger.logWarn).toHaveBeenCalledWith(
                        'Geo location lookup failed',
                        localStore,
                        { error: errorMsg }
                    );
                });
            });

            describe('when adddress is empty', () => {
                // Arrange
                let wrapper;
                let getGeoLocationSpy;

                beforeEach(async () => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    getGeoLocationSpy = jest.spyOn(VueCheckout.methods, 'getGeoLocation');

                    wrapper = mount(VueCheckout, {
                        store: createStore({ ...defaultCheckoutState, address: {} }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    await flushPromises();
                });

                it('should not call `logWarn`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect($logger.logWarn).not.toHaveBeenCalledWith();
                });

                it('should not call `getGeoLocation`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(getGeoLocationSpy).not.toHaveBeenCalled();
                });
            });
        });

        describe('loadBasket ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getBasket` request fails', () => {
                let wrapper;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getBasket: jest.fn(async () => Promise.reject()) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                });

                it('should emit failure event and set `hasCheckoutLoadedSuccessfully` to `false`', async () => {
                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutBasketGetSuccess)).toBeUndefined();
                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(false);
                });

                it('should call `logError`', async () => {
                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect($logger.logError).toHaveBeenCalled();
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
                        propsData,
                        mocks: {
                            $logger
                        }
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
                it('should emit failure event and log a warning', async () => {
                    const store = createStore(defaultCheckoutState, { ...defaultCheckoutActions, getAddress: jest.fn(async () => Promise.reject()) });
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetSuccess)).toBeUndefined();
                    expect($logger.logWarn).toHaveBeenCalledWith('Get checkout address failure', store, {});

                    expect(wrapper.vm.hasCheckoutLoadedSuccessfully).toBe(true);
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
                    propsData,
                    mocks: {
                        $logger
                    }
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

                // Act
                wrapper.vm.handleErrorState(error);

                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.vm.genericErrorMessage).toEqual(error);
            });

            it('should emit failure with `serviceType` user authentication status and error details', () => {
                // Arrange
                const error = 'Unknown Error';

                const payload = {
                    error,
                    isLoggedIn: false,
                    serviceType: CHECKOUT_METHOD_DELIVERY
                };

                // Act
                wrapper.vm.handleErrorState(error);

                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0]).toEqual(payload);
            });

            it('should call `logError`', () => {
                // Act
                wrapper.vm.handleErrorState();

                // Assert
                expect($logger.logError).toHaveBeenCalled();
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

        describe('`onFormSubmit` ::', () => {
            let isFormValidSpy;

            beforeEach(() => {
                isFormValidSpy = jest.spyOn(VueCheckout.methods, 'isFormValid');
            });

            it('should exist', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    }
                });

                // Act & Assert
                expect(wrapper.vm.onFormSubmit).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `trackFormInteraction` so we can track the action type `submit`', async () => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(true);
                    const trackFormInteractionSpy = jest.spyOn(VueCheckout.methods, 'trackFormInteraction');
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v,
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(trackFormInteractionSpy).toHaveBeenCalledWith({
                        action: 'submit'
                    });
                });

                describe('AND the call to `isFormValid` is falsey', () => {
                    it('should call `onInvalidCheckoutForm` so we can emit, track and log error information', async () => {
                        // Arrange
                        isFormValidSpy.mockReturnValue(false);
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

                        const wrapper = mount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $v,
                                $logger
                            }
                        });

                        const onInvalidCheckoutFormSpy = jest.spyOn(wrapper.vm, 'onInvalidCheckoutForm');

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(onInvalidCheckoutFormSpy).toHaveBeenCalled();
                    });

                    it('should not call `submitCheckout`', async () => {
                        // Arrange
                        isFormValidSpy.mockReturnValue(false);
                        const wrapper = mount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $v,
                                $logger
                            }
                        });
                        const submitCheckoutSpy = jest.spyOn(wrapper.vm, 'submitCheckout');

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(submitCheckoutSpy).not.toHaveBeenCalled();
                    });
                });

                describe('AND the call to `isFormValid` is truthy', () => {
                    it('should not call `onInvalidCheckoutForm`', async () => {
                        // Arrange
                        isFormValidSpy.mockReturnValue(true);
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

                        const wrapper = mount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $v,
                                $logger
                            }
                        });

                        const onInvalidCheckoutFormSpy = jest.spyOn(wrapper.vm, 'onInvalidCheckoutForm');

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(onInvalidCheckoutFormSpy).not.toHaveBeenCalled();
                    });

                    it('should call `submitCheckout`', async () => {
                        // Arrange
                        isFormValidSpy.mockReturnValue(true);
                        const wrapper = mount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $v,
                                $logger
                            }
                        });
                        const submitCheckoutSpy = jest.spyOn(wrapper.vm, 'submitCheckout');

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(submitCheckoutSpy).toHaveBeenCalled();
                    });
                });
            });
        });

        describe('`onInvalidCheckoutForm` ::', () => {
            let isFormValidSpy;
            let mockValidationState;
            let getFormValidationStateSpy;
            let trackFormInteractionSpy;

            beforeEach(() => {
                mockValidationState = {
                    validFields: [
                        'customer.mobileNumber',
                        'address.line1',
                        'address.city',
                        'address.postcode'
                    ],
                    invalidFields: []
                };

                getFormValidationStateSpy = jest.spyOn(validations, 'getFormValidationState');
                getFormValidationStateSpy.mockReturnValue(mockValidationState);
                isFormValidSpy = jest.spyOn(VueCheckout.methods, 'isFormValid');
                trackFormInteractionSpy = jest.spyOn(VueCheckout.methods, 'trackFormInteraction');
            });

            it('should exist', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    }
                });

                // Act & Assert
                expect(wrapper.vm.onInvalidCheckoutForm).toBeDefined();
            });

            describe('when invoked', () => {
                it('should emit `CheckoutValidationError` with a validation payload', async () => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v,
                            $logger
                        }
                    });
                    const checkoutValidationErrorSpy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutValidationError).length).toBe(1);
                    expect(checkoutValidationErrorSpy).toHaveBeenCalledWith(
                        EventNames.CheckoutValidationError,
                        mockValidationState
                    );
                });

                it('should make a call to `trackFormInteraction` with `inline_error` & `invalidFields`', async () => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v,
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(trackFormInteractionSpy).toHaveBeenCalledWith({
                        action: 'inline_error',
                        error: mockValidationState.invalidFields.toString()
                    });
                });

                it(`should make a call to 'trackFormInteraction' with 'error' & '${ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE}`, async () => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v,
                            $logger
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(trackFormInteractionSpy).toHaveBeenCalledWith({
                        action: 'error',
                        error: ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE
                    });
                });

                it('should make a call to `$logger.logWarn` with the correct payload', async () => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);
                    const store = createStore();

                    const wrapper = mount(VueCheckout, {
                        store,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v,
                            $logger
                        }
                    });

                    const loggerWarnSpy = jest.spyOn(wrapper.vm.$logger, 'logWarn');

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(loggerWarnSpy).toHaveBeenCalledWith(
                        'Checkout Validation Error',
                        store,
                        mockValidationState
                    );
                });
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
                expect(isValidPhoneNumberSpy).toHaveBeenCalledWith(defaultCheckoutState.customer.mobileNumber, i18n.locale);
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
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(defaultCheckoutState.address.postcode, i18n.locale);
            });
        });

        describe('updateCustomerDetails ::', () => {
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

        describe('redirectToPayment ::', () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.clearAllMocks();
                jest.clearAllTimers();
            });

            it('should redirect to the payment page after 1 second', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.redirectToPayment();

                jest.advanceTimersByTime(1000);

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith(`${paymentPageUrlPrefix}/${defaultCheckoutState.orderId}`);
            });

            it('should not redirect to the payment page before 1 second', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.redirectToPayment();

                jest.advanceTimersByTime(999);

                // Assert
                expect(windowLocationSpy).not.toHaveBeenCalled();
            });
        });

        describe('submitOrder ::', () => {
            it('should be called with new input value on user input', async () => {
                // Arrange
                const placeOrderSpy = jest.spyOn(VueCheckout.methods, 'placeOrder');
                const userAgent = 'userAgent';
                const basketId = 'myBasketId-v1';

                Object.defineProperty(window, 'navigator', {
                    value: {
                        userAgent
                    },
                    writable: true
                });

                const expected = {
                    url: placeOrderUrl,
                    data: {
                        basketId,
                        applicationId: 7,
                        customerNotes: {
                            noteForRestaurant: defaultCheckoutState.userNote
                        },
                        applicationName,
                        applicationVersion: '1',
                        referralState: 'None',
                        deviceId: '127.0.0.1',
                        deviceName: userAgent
                    },
                    timeout: 1000
                };

                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        basket: {
                            id: basketId
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                await wrapper.vm.submitOrder();

                // Assert
                expect(placeOrderSpy).toHaveBeenCalledWith(expected);
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
