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
    ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
    TENANT_MAP
} from '../../constants';
import CheckoutIssues from '../../checkout-issues';
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
        locality: {
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

        describe('nonFulfillableError', () => {
            describe('when `nonFulfillableError.openInDialog` is `true`', () => {
                it('should show a mega modal displaying the error title and description', () => {
                    // Arrange
                    const fulfilmentTimeIssue = CheckoutIssues[ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE];

                    // Act
                    const wrapper = shallowMount(VueCheckout, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData,
                        data () {
                            return {
                                nonFulfillableError: fulfilmentTimeIssue
                            };
                        }
                    });

                    const errorModal = wrapper.find('[data-test-id="checkout-issue-modal"]');
                    const errorTitle = wrapper.find('[data-test-id="checkout-issue-modal-title"]');
                    const errorMessage = wrapper.find('[data-test-id="checkout-issue-modal-message"]');

                    // Assert
                    expect(errorModal.exists()).toBe(true);
                    expect(errorTitle.exists()).toBe(true);
                    expect(errorMessage.exists()).toBe(true);
                });
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
                        address: { line1: 'Fleet Place House', postcode: 'EC4M 7RF', locality: 'London' }
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

        describe('shouldLoadCustomerNameFromClaims ::', () => {
            it('should return `true` if `isLoggedIn` is `true` and the customer name doesn\'t exist', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true,
                        customer: {
                            firstName: '',
                            lastName: ''
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadCustomerNameFromClaims;

                // Assert
                expect(result).toBe(true);
            });

            it('should return `false` if `isLoggedIn` is `true` and customer name exists', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: false
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadCustomerNameFromClaims;

                // Assert
                expect(result).toBe(false);
            });

            it('should return `false` if `isLoggedIn` is `false`', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: false
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadCustomerNameFromClaims;

                // Assert
                expect(result).toBe(false);
            });
        });

        describe('shouldShowErrorDialog ::', () => {
            it('should return `true` if `nonFulfillableError.shouldShowInDialog` is `true`', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true
                    }),
                    i18n,
                    localVue,
                    propsData,
                    data () {
                        return {
                            nonFulfillableError: {
                                code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
                                shouldShowInDialog: true
                            }
                        };
                    }
                });

                // Act
                const result = wrapper.vm.shouldShowErrorDialog;

                // Assert
                expect(result).toBe(true);
            });

            it('should return `false` if `nonFulfillableError.shouldShowInDialog` is `false`', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true
                    }),
                    i18n,
                    localVue,
                    propsData,
                    data () {
                        return {
                            nonFulfillableError: {
                                code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
                                shouldShowInDialog: false
                            }
                        };
                    }
                });

                // Act
                const result = wrapper.vm.shouldShowErrorDialog;

                // Assert
                expect(result).toBe(false);
            });

            it('should return `false` if there is no error', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldShowErrorDialog;

                // Assert
                expect(result).toBe(false);
            });
        });

        describe('restaurantMenuPageUrl ::', () => {
            it('should return the URL to redirect back to the restaurant menu', () => {
                // Arrange
                const restaurantSeoName = 'masala-zone-camden';
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true,
                        restaurant: {
                            seoName: restaurantSeoName
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.restaurantMenuPageUrl;

                // Assert
                expect(result).toBe(`restaurant-${restaurantSeoName}/menu`);
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

        describe('`submitCheckout` ::', () => {
            let wrapper;

            beforeEach(() => {
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
            });

            it('should exist', () => {
                expect(wrapper.vm.submitCheckout).toBeDefined();
            });

            describe('when invoked', () => {
                describe('AND `isLoggedIn` is falsey', () => {
                    it('should call `setupGuestUser`', () => {
                        // Arrange
                        const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(setupGuestUserSpy).toHaveBeenCalled();
                    });

                    it('should not call `lookupGeoLocation`', () => {
                        // Arrange
                        const lookupGeoLocationSpy = jest.spyOn(wrapper.vm, 'lookupGeoLocation');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(lookupGeoLocationSpy).not.toHaveBeenCalled();
                    });

                    it('should not call `handleUpdateCheckout`', () => {
                        // Arrange
                        const handleUpdateCheckoutSpy = jest.spyOn(wrapper.vm, 'handleUpdateCheckout');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(handleUpdateCheckoutSpy).not.toHaveBeenCalled();
                    });

                    it('should not call `handleFulfillableContext`', () => {
                        // Arrange
                        const handleFulfillableContextSpy = jest.spyOn(wrapper.vm, 'handleFulfillableContext');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(handleFulfillableContextSpy).not.toHaveBeenCalled();
                    });
                });

                describe('AND `isLoggedIn` is truthy', () => {
                    it('should not call `setupGuestUser`', () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            store: createStore({
                                ...defaultCheckoutState,
                                serviceType: CHECKOUT_METHOD_COLLECTION,
                                isLoggedIn: true
                            }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
                        });
                        const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(setupGuestUserSpy).not.toHaveBeenCalled();
                    });
                });

                describe('AND there is an error caught', () => {
                    let eventData;

                    beforeEach(() => {
                        jest.spyOn(wrapper.vm, 'setupGuestUser').mockImplementation(() => {
                            throw new Error('Error');
                        });

                        eventData = {
                            isLoggedIn: false,
                            serviceType: CHECKOUT_METHOD_COLLECTION,
                            errors: Error('Error')
                        };
                    });

                    it('should `$emit` with a `message` & `eventData`', async () => {
                        // Arrange
                        const $emitSpy = jest.spyOn(wrapper.vm, '$emit');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect($emitSpy).toHaveBeenCalledWith('checkout-payment-failure', eventData);
                    });

                    it('should `logInvoker` with a `message` & `eventData`', async () => {
                        // Arrange
                        const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                        // Act
                        wrapper.vm.submitCheckout();

                        // Assert
                        expect(logInvokerSpy).toHaveBeenCalledWith('Consumer Checkout Failure', eventData, $logger.logError);
                    });
                });
            });
        });

        describe('`logInvoker` ::', () => {
            let wrapper;
            const store = createStore({
                ...defaultCheckoutState,
                isLoggedIn: true,
                serviceType: CHECKOUT_METHOD_DELIVERY
            });

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store,
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });
            });

            it('should exist', () => {
                expect(wrapper.vm.logInvoker).toBeDefined();
            });

            describe('when invoked', () => {
                it('should call `$logger` with the correct callback assigned', () => {
                    // Arrange
                    const eventData = {
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_DELIVERY
                    };

                    // Act
                    wrapper.vm.logInvoker('Logger says hi', eventData, $logger.logInfo);

                    // Assert
                    expect($logger.logInfo).toHaveBeenCalled();
                });
            });
        });

        describe('`processOrderIsFulfillable` ::', () => {
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

            it('should exist', () => {
                expect(wrapper.vm.processOrderIsFulfillable).toBeDefined();
            });

            describe('when invoked', () => {
                it('should submit the order via `submitOrder`', () => {
                    // Arrange
                    const submitOrderSpy = jest.spyOn(wrapper.vm, 'submitOrder');

                    // Act
                    wrapper.vm.processOrderIsFulfillable();

                    // Assert
                    expect(submitOrderSpy).toHaveBeenCalled();
                });

                it('should `$emit` a checkout success with `eventData` passed', async () => {
                    // Arrange
                    const $emitSpy = jest.spyOn(wrapper.vm, '$emit');
                    const eventData = {
                        isLoggedIn: false,
                        serviceType: 'delivery'
                    };

                    // Act
                    await wrapper.vm.processOrderIsFulfillable(eventData);

                    // Assert
                    expect($emitSpy).toHaveBeenCalledWith('checkout-payment-success', eventData);
                });

                it('should `logInvoker` with a `message` & `eventData` passed', async () => {
                    // Arrange
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');
                    const eventData = {
                        isLoggedIn: false,
                        serviceType: 'delivery'
                    };

                    // Act
                    await wrapper.vm.processOrderIsFulfillable(eventData);

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith('Consumer Checkout Successful', eventData, $logger.logInfo);
                });

                it('should redirect to payments', async () => {
                    // Arrange
                    const redirectToPaymentSpy = jest.spyOn(wrapper.vm, 'redirectToPayment');

                    // Act
                    await wrapper.vm.processOrderIsFulfillable();

                    // Assert
                    expect(redirectToPaymentSpy).toHaveBeenCalled();
                });
            });
        });

        describe('`processOrderNotFulfillable` ::', () => {
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

            it('should exist', () => {
                expect(wrapper.vm.processOrderNotFulfillable).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `logInvoker` with a `message` and `eventData`', () => {
                    // Arrange
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');
                    const eventData = {
                        isLoggedIn: false,
                        serviceType: 'delivery'
                    };

                    // Act
                    wrapper.vm.processOrderNotFulfillable(eventData);

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith(
                        'Consumer Checkout Not Fulfillable',
                        eventData,
                        $logger.logWarn
                    );
                });
            });
        });

        describe('`handleFulfillableContext` ::', () => {
            let wrapper;
            let eventData = {};
            const store = createStore({ ...defaultCheckoutState, isFulfillable: true });

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store,
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                eventData = {
                    isLoggedIn: false,
                    serviceType: 'delivery'
                };
            });

            it('should exist', () => {
                expect(wrapper.vm.handleFulfillableContext).toBeDefined();
            });

            describe('when invoked', () => {
                describe('AND `isFulfillable` is truthy', () => {
                    it('should process the order is fulfillable call', () => {
                        // Arrange
                        const processOrderIsFulfillableSpy = jest.spyOn(wrapper.vm, 'processOrderIsFulfillable');

                        // Act
                        wrapper.vm.handleFulfillableContext(eventData);

                        // Assert
                        expect(processOrderIsFulfillableSpy).toHaveBeenCalledWith(eventData);
                    });

                    it('should not call `processOrderNotFulfillable`', () => {
                        // Arrange
                        const processOrderNotFulfillableSpy = jest.spyOn(wrapper.vm, 'processOrderNotFulfillable');

                        // Act
                        wrapper.vm.handleFulfillableContext();

                        // Assert
                        expect(processOrderNotFulfillableSpy).not.toHaveBeenCalled();
                    });
                });

                describe('AND `isFulfillable` is falsey', () => {
                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({ ...defaultCheckoutState, isFulfillable: false }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger
                            }
                        });
                    });

                    it('should process the order is not fulfillable call', () => {
                        // Arrange
                        const processOrderNotFulfillable = jest.spyOn(wrapper.vm, 'processOrderNotFulfillable');

                        // Act
                        wrapper.vm.handleFulfillableContext(eventData);

                        // Assert
                        expect(processOrderNotFulfillable).toHaveBeenCalledWith(eventData);
                    });

                    it('should not call `processOrderIsFulfillable`', () => {
                        // Arrange
                        const processOrderIsFulfillable = jest.spyOn(wrapper.vm, 'processOrderIsFulfillable');

                        // Act
                        wrapper.vm.handleFulfillableContext();

                        // Assert
                        expect(processOrderIsFulfillable).not.toHaveBeenCalled();
                    });
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
                                'address.locality',
                                'address.postcode'
                            ],
                            invalidFields: []
                        };

                        jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);

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
                                'address.locality',
                                'address.postcode'
                            ],
                            invalidFields: []
                        };

                        jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);

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
                        'address.locality',
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

        describe('handleErrorDialogClick ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            const restaurantSeoName = 'checkout-kofte-farringdon';

            it('should redirect to the restaurant menu if `shouldRedirectToMenu` is true', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, restaurant: { seoName: restaurantSeoName, id: '22222' } }),
                    i18n,
                    localVue,
                    propsData,
                    data () {
                        return {
                            nonFulfillableError: {
                                shouldRedirectToMenu: true
                            }
                        };
                    }
                });

                // Act
                wrapper.vm.handleErrorDialogClick();

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith(`restaurant-${restaurantSeoName}/menu`);
                expect(wrapper.vm.nonFulfillableError).toBeNull();
            });

            it('should not redirect to the restaurant menu if `shouldRedirectToMenu` is false', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, restaurant: { seoName: restaurantSeoName, id: '22222' } }),
                    i18n,
                    localVue,
                    propsData,
                    data () {
                        return {
                            nonFulfillableError: {
                                shouldRedirectToMenu: false
                            }
                        };
                    }
                });

                // Act
                wrapper.vm.handleErrorDialogClick();

                // Assert
                expect(windowLocationSpy).not.toHaveBeenCalled();
                expect(wrapper.vm.nonFulfillableError).toBeNull();
            });
        });

        describe('submitOrder ::', () => {
            it('should be called with new input value on user input', async () => {
                // Arrange
                const placeOrderSpy = jest.spyOn(VueCheckout.methods, 'placeOrder');
                const basketId = 'myBasketId-v1';

                const expected = {
                    url: placeOrderUrl,
                    data: {
                        basketId,
                        customerNotes: {
                            noteForRestaurant: defaultCheckoutState.userNote
                        },
                        referralState: 'ReferredByWeb'
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
