import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import { VueI18n } from '@justeat/f-globalisation';
import { validations } from '@justeat/f-services';
import VueScrollTo from 'vue-scrollto';
import {
    ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE,
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_COLLECTION,
    CHECKOUT_METHOD_DINEIN,
    DOB_REQUIRED_ISSUE,
    ERROR_CODE_FULFILMENT_TIME_INVALID,
    ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE,
    TENANT_MAP,
    CHECKOUT_ERROR_FORM_TYPE,
    HEADER_LOW_VALUE_ORDER_EXPERIMENT
} from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';

import {
    defaultCheckoutState,
    defaultCheckoutActions,
    i18n,
    createStore,
    $logger,
    $cookies
} from './helpers/setup';
import exceptions from '../../exceptions/exceptions';
import addressService from '../../services/addressService';

const {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError,
    UpdateCheckoutAccessForbiddenError,
    GetCheckoutError,
    GetCheckoutAccessForbiddenError,
    AvailableFulfilmentGetError,
    GetBasketError
} = exceptions;

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

jest.mock('../../services/analytics', () => jest.fn().mockImplementation(() => ({
    trackFormInteraction: jest.fn(),
    trackInitialLoad: jest.fn(),
    trackFormErrors: jest.fn(),
    trackDialogEvent: jest.fn(),
    trackLowValueOrderExperiment: jest.fn()
})));

const $style = {
    'c-checkout-alert': 'c-checkout-alert'
};


const message = {
    code: ERROR_CODE_FULFILMENT_TIME_INVALID,
    shouldRedirectToMenu: true,
    shouldShowInDialog: true
};

const alertCode = 'Something went wrong, please try again later';

const alert = {
    name: 'alert',
    props: {
        type: 'danger',
        class: 'c-checkout-alert',
        heading: 'Error'
    },
    content: alertCode
};

describe('Checkout', () => {
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
    const getCustomerUrl = 'http://localhost/getcustomer';
    const otacToAuthExchanger = () => '';
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
        getCustomerUrl,
        applicationName,
        otacToAuthExchanger
    };

    const restaurant = {
        seoName: 'checkout-kofte-farringdon',
        id: '22222'
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
        describe('errorFormType ::', () => {
            it('should render the checkout form when its value is null', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            errorFormType: null
                        };
                    }
                });

                const checkoutForm = wrapper.find('[data-test-id="checkout-component"]');
                const errorPage = wrapper.find('[data-test-id="checkout-error-page-component"]');

                // Assert
                expect(checkoutForm.exists()).toBe(true);
                expect(errorPage.exists()).toBe(false);
            });


            it('should render the error page when its value is not null', () => {
                // Arrange & Act
                const wrapper = mount(VueCheckout, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    },
                    data () {
                        return {
                            errorFormType: CHECKOUT_ERROR_FORM_TYPE.default
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

    describe('computed ::', () => {
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

            it('should return `false` if `serviceType` is set to Dine In', () => {
                // Arrange and Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DINEIN }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isCheckoutMethodDelivery).toBeFalsy();
            });
        });

        describe('isCheckoutMethodDineIn ::', () => {
            it('should return `true` if `serviceType` is set to DineIn', () => {
                // Arrange and Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DINEIN }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isCheckoutMethodDineIn).toBeTruthy();
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
                expect(wrapper.vm.isCheckoutMethodDineIn).toBeFalsy();
            });

            it('should return `false` if `serviceType` is set to Delivery', () => {
                // Arrange and Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.isCheckoutMethodDineIn).toBeFalsy();
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
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
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

            it('should return `false` if `serviceType` is `dine in`', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_DINEIN,
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

        describe('shouldLoadCustomer ::', () => {
            it('should return `true` if customer is logged in and does not have phone number set', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true,
                        customer: {
                            mobileNumber: ''
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadCustomer;

                // Assert
                expect(result).toBe(true);
            });

            it('should return `false` if customer is not logged in', () => {
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
                const result = wrapper.vm.shouldLoadCustomer;

                // Assert
                expect(result).toBe(false);
            });

            it('should return `false` if customer has phone number set', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        isLoggedIn: true,
                        customer: {
                            mobileNumber: '07111111111'
                        }
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.shouldLoadCustomer;

                // Assert
                expect(result).toBe(false);
            });
        });

        describe('eventData ::', () => {
            it('should return `isLoggedIn` and `serviceType` in an object`', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.eventData;

                // Assert
                expect(result).toEqual({
                    isLoggedIn: defaultCheckoutState.isLoggedIn,
                    serviceType: defaultCheckoutState.serviceType
                });
            });
        });

        describe('messageType ::', () => {
            describe('when a message exists AND `shouldShowInDialog` is true', () => {
                let dialogMessageSpy;

                beforeEach(() => {
                    dialogMessageSpy = jest.spyOn(VueCheckout.computed, 'dialogMessage');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should return dialog', () => {
                    // Arrange
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            message,
                            restaurant
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    const dialog = {
                        name: 'error-dialog',
                        props: {
                            'redirect-url': wrapper.vm.redirectUrl
                        }
                    };

                    // Act
                    const { messageType } = wrapper.vm;

                    // Assert
                    expect(dialogMessageSpy).toHaveBeenCalled();
                    expect(messageType).toEqual(dialog);
                });
            });

            describe('when a message exists AND `shouldShowInDialog` is false', () => {
                let alertMessageSpy;

                beforeEach(() => {
                    alertMessageSpy = jest.spyOn(VueCheckout.computed, 'alertMessage');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should return alert', () => {
                    // Arrange
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            message: alertCode
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $style
                        }
                    });

                    // Act
                    const { messageType } = wrapper.vm;

                    // Assert
                    expect(alertMessageSpy).toHaveBeenCalled();
                    expect(messageType).toEqual(alert);
                });
            });
        });

        describe('redirectUrl ::', () => {
            describe('when service type is delivery or collection', () => {
                let wrapper;
                beforeEach(() => {
                    // Arrange && Act
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            restaurant
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });
                });

                describe('AND errorFormType is not `noTimeAvailable`', () => {
                    it('should return the URL with a "restaurants" prefix to redirect back to the restaurant menu', () => {
                        // Assert
                        expect(wrapper.vm.redirectUrl).toEqual(`restaurants-${restaurant.seoName}/menu`);
                    });

                    describe('when the `restaurant.seoName` is falsey', () => {
                        it('should return `/` so the user can be navigated back to the homepage', () => {
                            // Arrange && Act
                            wrapper = shallowMount(VueCheckout, {
                                store: createStore({
                                    ...defaultCheckoutState,
                                    restaurant: {
                                        seoName: ''
                                    }
                                }),
                                i18n,
                                localVue,
                                propsData
                            });

                            // Assert
                            expect(wrapper.vm.redirectUrl).toEqual('/');
                        });
                    });
                });

                describe('AND errorFormType is `noTimeAvailable`', () => {
                    describe('AND there is no location cookie available', () => {
                        beforeEach(() => {
                            // Act
                            wrapper.setData({ errorFormType: CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable });
                            wrapper.vm.$cookies.get.mockReturnValue(null);
                        });

                        it('should return `/` so the user can be navigated back to the homepage', () => {
                            // Assert
                            expect(wrapper.vm.redirectUrl).toEqual('/');
                        });
                    });

                    describe('AND there is location cookie available', () => {
                        // Arrange
                        const postCodeCookieValue = 'ar511ar';

                        beforeEach(() => {
                            // Act
                            wrapper.setData({ errorFormType: CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable });
                            wrapper.vm.$cookies.get.mockReturnValue(postCodeCookieValue);
                        });

                        it('should return the URL with an "area" prefix so the user can be navigated back to the search page', () => {
                            // Assert
                            expect(wrapper.vm.redirectUrl).toEqual(`area/${postCodeCookieValue}`);
                        });
                    });
                });
            });

            describe('when service type is dine in', () => {
                it('should return the URL with a "dine-in" prefix to redirect back to the restaurant menu', () => {
                    // Arrange && Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            restaurant,
                            serviceType: 'dinein'
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.redirectUrl).toEqual(`dine-in-${restaurant.seoName}/menu`);
                });
            });
        });

        describe('shouldShowAgeVerificationForm ::', () => {
            describe(`when the ${DOB_REQUIRED_ISSUE} issue exists in errors`, () => {
                let wrapper;
                beforeEach(() => {
                    // Arrange && Act
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            errors: [
                                {
                                    code: DOB_REQUIRED_ISSUE,
                                    shouldShowInDialog: false
                                }
                            ]
                        }),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return true', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowAgeVerificationForm).toBe(true);
                });
            });

            describe(`when the ${DOB_REQUIRED_ISSUE} issue does not exist in errors`, () => {
                let wrapper;
                beforeEach(() => {
                    // Arrange && Act
                    wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                });

                it('should return false', () => {
                    // Assert
                    expect(wrapper.vm.shouldShowAgeVerificationForm).toBe(false);
                });
            });
        });
    });

    describe('mounted ::', () => {
        let initialiseSpy;
        let setAuthTokenSpy;
        let wrapper;

        beforeEach(() => {
            initialiseSpy = jest.spyOn(VueCheckout.methods, 'initialise');
            setAuthTokenSpy = jest.spyOn(VueCheckout.methods, 'setAuthToken');

            wrapper = shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call `setAuthToken`', () => {
            // Assert
            expect(setAuthTokenSpy).toHaveBeenCalledWith(wrapper.vm.authToken);
        });

        it('should call `initialise`', () => {
            // Assert
            expect(initialiseSpy).toHaveBeenCalled();
        });

        it('should call `trackInitialLoad`', async () => {
            // Act
            await wrapper.vm.initialise();

            // Assert
            expect(wrapper.vm.checkoutAnalyticsService.trackInitialLoad).toHaveBeenCalled();
        });

        it('should emit `CheckoutMounted` event', async () => {
            // Act
            await wrapper.vm.initialise();

            // Assert
            expect(wrapper.emitted(EventNames.CheckoutMounted).length).toBe(1);
        });
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('initialise ::', () => {
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
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
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

                it('should call `loadAddressFromLocalStorage` so we can pre-populate the guest checkout address', async () => {
                    // Arrange & Act
                    const loadAddressFromLocalStorageSpy = jest.spyOn(VueCheckout.methods, 'loadAddressFromLocalStorage');

                    shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadAddressFromLocalStorageSpy).toHaveBeenCalled();
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

                it('should not call `loadAddressFromLocalStorage`', async () => {
                    // Arrange & Act
                    const loadAddressFromLocalStorageSpy = jest.spyOn(VueCheckout.methods, 'loadAddressFromLocalStorage');

                    shallowMount(VueCheckout, {
                        store: createStore({ ...defaultCheckoutState, isLoggedIn: true }),
                        i18n,
                        localVue,
                        propsData
                    });
                    await flushPromises();

                    // Assert
                    expect(loadAddressFromLocalStorageSpy).not.toHaveBeenCalled();
                });
            });
        });

        describe('loadAddressFromLocalStorage ::', () => {
            it('should make a call to `addressService.getAddressFromLocalStorage`', () => {
                // Arrange
                const addressServiceSpy = jest.spyOn(addressService, 'getAddressFromLocalStorage');

                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.loadAddressFromLocalStorage();

                // Assert
                expect(addressServiceSpy).toHaveBeenCalled();
            });
        });

        describe('handleEventLogging ::', () => {
            let wrapper;
            let logInvokerSpy;

            const eventData = {
                isLoggedIn: false,
                serviceType: 'delivery'
            };

            const error = {
                message: 'Error Message'
            };

            beforeEach(() => {
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

                logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');
            });

            describe('when `EventNames` contains event', () => {
                const eventWithoutEventData = 'CheckoutGetSuccess';
                const eventWithEventData = 'CheckoutFailure';

                it('should emit event', () => {
                    // Act
                    wrapper.vm.handleEventLogging(eventWithoutEventData);

                    // Assert
                    expect(wrapper.emitted(EventNames[eventWithoutEventData]).length).toBe(1);
                });

                describe('AND event `hasEventData`', () => {
                    it('should emit event with eventData', () => {
                        // Act
                        wrapper.vm.handleEventLogging(eventWithEventData);

                        const event = wrapper.emitted(EventNames[eventWithEventData]);

                        // Assert
                        expect(wrapper.emitted(EventNames[eventWithEventData]).length).toBe(1);
                        expect(event[0][0]).toEqual(eventData);
                    });

                    describe('AND event `hasEventData`', () => {
                        it('AND event `hasEventData` and an error, should emit event with eventData and error', () => {
                            // Act
                            wrapper.vm.handleEventLogging(eventWithEventData, error);

                            const event = wrapper.emitted(EventNames[eventWithEventData]);

                            // Assert
                            expect(wrapper.emitted(EventNames[eventWithEventData]).length).toBe(1);
                            expect(event[0][0]).toEqual({ error, ...eventData });
                        });
                    });
                });
            });

            describe('when `LogEvents` contains event', () => {
                const event = 'CheckoutSuccess';
                const eventLog = {
                    message: 'Consumer Checkout Successful',
                    data: eventData,
                    logMethod: $logger.logInfo
                };

                it('should log event', () => {
                    // Act
                    wrapper.vm.handleEventLogging(event);

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith(eventLog);
                });

                describe('AND event has error', () => {
                    beforeEach(() => {
                        // Arrange
                        eventLog.error = error;
                    });

                    it('should log event with error', () => {
                        // Act
                        wrapper.vm.handleEventLogging(event, error);

                        // Assert
                        expect(logInvokerSpy).toHaveBeenCalledWith(eventLog);
                    });

                    describe('AND event has additionalData', () => {
                        const additionalData = { postcode: 'EC1A 1BB' };

                        beforeEach(() => {
                            // Arrange
                            eventLog.data = { ...eventData, ...additionalData };
                        });

                        it('should log event with error', () => {
                            // Act
                            wrapper.vm.handleEventLogging(event, error, additionalData);

                            // Assert
                            expect(logInvokerSpy).toHaveBeenCalledWith(eventLog);
                        });
                    });
                });
            });
        });

        describe('`submitCheckout` ::', () => {
            let wrapper;

            beforeEach(() => {
                jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();

                wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        serviceType: CHECKOUT_METHOD_COLLECTION,
                        isLoggedIn: false,
                        isFulfillable: true
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should exist', () => {
                expect(wrapper.vm.submitCheckout).toBeDefined();
            });

            describe('when invoked', () => {
                describe('AND `isLoggedIn` is falsey', () => {
                    describe('AND `isGuestCreated` is falsey', () => {
                        it('should call `setupGuestUser`', async () => {
                            // Arrange
                            const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(setupGuestUserSpy).toHaveBeenCalled();
                        });
                    });

                    describe('AND `isGuestCreated` is truthy', () => {
                        it('should not call `setupGuestUser`', async () => {
                            // Arrange
                            wrapper = mount(VueCheckout, {
                                store: createStore({
                                    ...defaultCheckoutState,
                                    isGuestCreated: true
                                }),
                                i18n,
                                localVue,
                                propsData,
                                mocks: {
                                    $logger,
                                    $cookies
                                }
                            });
                            const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(setupGuestUserSpy).not.toHaveBeenCalled();
                        });
                    });
                });

                describe('AND `isLoggedIn` is truthy', () => {
                    describe('AND `isGuestCreated` is falsey', () => {
                        it('should not call `setupGuestUser`', async () => {
                            // Arrange
                            wrapper = mount(VueCheckout, {
                                store: createStore({
                                    ...defaultCheckoutState,
                                    serviceType: CHECKOUT_METHOD_COLLECTION,
                                    isLoggedIn: true,
                                    isGuestCreated: false
                                }),
                                i18n,
                                localVue,
                                propsData,
                                mocks: {
                                    $logger,
                                    $cookies
                                }
                            });

                            const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(setupGuestUserSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('AND `isGuestCreated` is truthy', () => {
                        it('should not call `setupGuestUser`', async () => {
                            // Arrange
                            wrapper = mount(VueCheckout, {
                                store: createStore({
                                    ...defaultCheckoutState,
                                    serviceType: CHECKOUT_METHOD_COLLECTION,
                                    isLoggedIn: true,
                                    isGuestCreated: true
                                }),
                                i18n,
                                localVue,
                                propsData,
                                mocks: {
                                    $logger,
                                    $cookies
                                }
                            });

                            const setupGuestUserSpy = jest.spyOn(wrapper.vm, 'setupGuestUser');

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(setupGuestUserSpy).not.toHaveBeenCalled();
                        });
                    });
                });

                it('should call `lookupGeoLocation`', async () => {
                    // Arrange
                    const lookupGeoLocationSpy = jest.spyOn(wrapper.vm, 'lookupGeoLocation');

                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect(lookupGeoLocationSpy).toHaveBeenCalled();
                });

                it('should call `handleUpdateCheckout`', async () => {
                    // Arrange
                    const handleUpdateCheckoutSpy = jest.spyOn(wrapper.vm, 'handleUpdateCheckout');

                    // Act
                    await wrapper.vm.submitCheckout();

                    // Assert
                    expect(handleUpdateCheckoutSpy).toHaveBeenCalled();
                });

                describe('AND `isFulfillable` is `true`', () => {
                    it('should call `submitOrder`', async () => {
                        // Arrange
                        const submitOrderSpy = jest.spyOn(wrapper.vm, 'submitOrder');

                        // Act
                        await wrapper.vm.submitCheckout();

                        // Assert
                        expect(submitOrderSpy).toHaveBeenCalled();
                    });

                    it('should call `redirectToPayment`', async () => {
                        // Arrange
                        const redirectToPaymentSpy = jest.spyOn(wrapper.vm, 'redirectToPayment');

                        // Act
                        await wrapper.vm.submitCheckout();

                        // Assert
                        expect(redirectToPaymentSpy).toHaveBeenCalled();
                    });
                });

                describe('AND `isFulfillable` is `false`', () => {
                    it('should call `handleNonFulfillableCheckout`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            store: createStore({
                                ...defaultCheckoutState,
                                serviceType: CHECKOUT_METHOD_COLLECTION,
                                isLoggedIn: false,
                                isFulfillable: false
                            }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        const handleNonFulfillableCheckoutSpy = jest.spyOn(wrapper.vm, 'handleNonFulfillableCheckout');

                        // Act
                        await wrapper.vm.submitCheckout();

                        // Assert
                        expect(handleNonFulfillableCheckoutSpy).toHaveBeenCalled();
                    });
                });

                describe('AND there is an error caught', () => {
                    let handleErrorStateSpy;

                    beforeEach(() => {
                        wrapper = mount(VueCheckout, {
                            store: createStore({
                                ...defaultCheckoutState,
                                serviceType: CHECKOUT_METHOD_COLLECTION,
                                isLoggedIn: false,
                                isFulfillable: true,
                                message: alertCode
                            }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        handleErrorStateSpy = jest.spyOn(wrapper.vm, 'handleErrorState');
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    describe('AND the error is of type `CreateGuestUserError`', () => {
                        it('should call `handleErrorState` with the guest user creation error info', async () => {
                            // Arrange
                            const error = new CreateGuestUserError('CreateGuestUserError exception!');

                            jest.spyOn(wrapper.vm, 'setupGuestUser').mockImplementation(() => {
                                throw error;
                            });

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(handleErrorStateSpy).toHaveBeenCalledWith(error);
                        });
                    });

                    describe('AND the error is of type `UpdateCheckoutError`', () => {
                        it('should call `handleErrorState` with the update checkout error info', async () => {
                            // Arrange
                            const error = new UpdateCheckoutError('UpdateCheckoutError exception!');

                            jest.spyOn(wrapper.vm, 'handleUpdateCheckout').mockImplementation(() => {
                                throw error;
                            });

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(handleErrorStateSpy).toHaveBeenCalledWith(error);
                        });
                    });

                    describe('AND the error is of type `PlaceOrderError`', () => {
                        it('should call `handleErrorState` with the place order error info', async () => {
                            // Arrange
                            const error = new PlaceOrderError('PlaceOrderError exception!', 'Error code');

                            jest.spyOn(wrapper.vm, 'submitOrder').mockImplementation(() => {
                                throw error;
                            });

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(handleErrorStateSpy).toHaveBeenCalledWith(error);
                        });
                    });

                    describe('AND the error is of another type', () => {
                        it('should call `handleErrorState` with the place order error info', async () => {
                            // Arrange
                            const error = new Error('An unknown error!');

                            jest.spyOn(wrapper.vm, 'handleUpdateCheckout').mockImplementation(() => {
                                throw error;
                            });

                            // Act
                            await wrapper.vm.submitCheckout();

                            // Assert
                            expect(handleErrorStateSpy).toHaveBeenCalledWith(error);
                        });
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
                        $logger,
                        $cookies
                    }
                });
            });

            it('should exist', () => {
                expect(wrapper.vm.logInvoker).toBeDefined();
            });

            describe('when invoked', () => {
                it('should call `$logger` with the correct callback assigned', () => {
                    // Arrange & Act
                    wrapper.vm.logInvoker({
                        message: 'Logger says hi',
                        data: wrapper.vm.eventData,
                        logMethod: $logger.logInfo
                    });

                    // Assert
                    expect($logger.logInfo).toHaveBeenCalled();
                });

                it('should call `$logger` with the correct arguments', () => {
                    // Arrange
                    const error = new Error();
                    error.name = 'Test name';
                    error.message = 'Test message';
                    error.stack = 'Test stack';
                    error.errorCode = 'Test error code';

                    const expectedError = {
                        exception: error.name,
                        exceptionMessage: error.message,
                        exceptionStackTrace: error.stack,
                        errorCode: error.errorCode
                    };
                    const logMessage = 'Logger says hi';

                    // Act
                    wrapper.vm.logInvoker({
                        message: logMessage,
                        data: wrapper.vm.eventData,
                        logMethod: $logger.logError,
                        error
                    });

                    // Assert
                    expect($logger.logError).toHaveBeenCalledWith(logMessage, store, { data: wrapper.vm.eventData, tags: 'checkout', ...expectedError });
                });
            });
        });

        describe('`handleNonFulfillableCheckout` ::', () => {
            let wrapper;
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();

                wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        errors: [message]
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $cookies
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });


            it('should exist', () => {
                expect(wrapper.vm.handleNonFulfillableCheckout).toBeDefined();
            });

            describe('when there are errors', () => {
                it('should call `handleEventLogging` with `CheckoutNonFulfillableError`', () => {
                    // Act
                    wrapper.vm.handleNonFulfillableCheckout();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutNonFulfillableError');
                });

                it('should make a call to `trackFormErrors`', () => {
                    // Act
                    wrapper.vm.handleNonFulfillableCheckout();

                    // Assert
                    expect(wrapper.vm.checkoutAnalyticsService.trackFormErrors).toHaveBeenCalled();
                });
            });
        });

        describe('handleUpdateCheckout ::', () => {
            let wrapper;
            let updateCheckoutSpy;
            let handleEventLoggingSpy;

            beforeEach(() => {
                updateCheckoutSpy = jest.spyOn(VueCheckout.methods, 'updateCheckout');
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should try to call `updateCheckout`', async () => {
                // Arrange
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });

                // Act
                await wrapper.vm.handleUpdateCheckout();

                // Assert
                expect(updateCheckoutSpy).toHaveBeenCalled();
            });

            describe('when `updateCheckout` request succeeds', () => {
                it('should call `handleEventLogging` with `CheckoutUpdateSuccess`', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.handleUpdateCheckout();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutUpdateSuccess');
                });

                describe('when `updateCheckout` returns `ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE`', () => {
                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should make a call to `reloadAvailableFulfilmentTimesIfOutdated`', async () => {
                        // Arrange
                        const reloadAvailableFulfilmentTimesIfOutdatedSpy = jest.spyOn(VueCheckout.methods, 'reloadAvailableFulfilmentTimesIfOutdated');

                        wrapper = mount(VueCheckout, {
                            store: createStore({
                                ...defaultCheckoutState,
                                message: {
                                    code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
                                }
                            }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        // Act
                        await wrapper.vm.handleUpdateCheckout();

                        // Assert
                        expect(reloadAvailableFulfilmentTimesIfOutdatedSpy).toHaveBeenCalled();
                    });
                });

                describe('when `updateCheckout` call returns headers', () => {
                    // Arrange
                    const checkoutResponseHeaders = {
                        [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: 'test'
                    };

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should call `trackLowValueOrderExperiment` with `checkoutResponseHeaders`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            store: createStore(defaultCheckoutState, {
                                ...defaultCheckoutActions,
                                updateCheckout: jest.fn(() => Promise.resolve(checkoutResponseHeaders))
                            }),
                            i18n,
                            localVue,
                            propsData
                        });

                        // Act
                        await wrapper.vm.handleUpdateCheckout();

                        // Assert
                        expect(wrapper.vm.checkoutAnalyticsService.trackLowValueOrderExperiment).toHaveBeenCalledWith(checkoutResponseHeaders);
                    });
                });
            });

            describe('when `updateCheckout` request fails', () => {
                describe('AND `statusCode` is `403`', () => {
                    it('should throw an `UpdateCheckoutAccessForbiddenError` error with the `message` of the error', async () => {
                        // Arrange
                        const errorMessage = 'An error - Access Forbidden';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    statusCode: 403
                                }
                            }
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toThrow(UpdateCheckoutAccessForbiddenError);
                        result.rejects.toThrow(errorMessage);
                    });
                });

                describe('AND `statusCode` is not `403`', () => {
                    it('should throw an `UpdateCheckoutError` error with the `message` of the error', async () => {
                        // Arrange
                        const errorMessage = 'An error';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    statusCode: 500
                                }
                            }
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toThrow(UpdateCheckoutError);
                        result.rejects.toThrow(errorMessage);
                    });

                    it('should throw an `UpdateCheckoutError` error with the `errorCode` of the error', async () => {
                        // Arrange
                        const errorMessage = 'An error';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    statusCode: 400,
                                    errors: [{
                                        description: 'From should be in ISO 8601 Zulu format.',
                                        errorCode: 'FULFILMENT_TIME_INVALID'
                                    }]
                                }
                            }
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toHaveProperty('errorCode', 'FULFILMENT_TIME_INVALID');
                    });

                    it('should throw an `UpdateCheckoutError` error with comma separated `errorCode` of the error for multiple errors', async () => {
                        // Arrange
                        const errorMessage = 'An error';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    statusCode: 400,
                                    errors: [
                                        {
                                            description: 'The tenant is invalid',
                                            errorCode: 'TENANT_INVALID'
                                        },
                                        {
                                            description: 'From should be in ISO 8601 Zulu format.',
                                            errorCode: 'FULFILMENT_TIME_INVALID'
                                        }]
                                }
                            }
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toHaveProperty('errorCode', 'TENANT_INVALID,FULFILMENT_TIME_INVALID');
                    });

                    it('should throw an `UpdateCheckoutError` error with empty `errorCode` if errors array is missing', async () => {
                        // Arrange
                        const errorMessage = 'An error';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    statusCode: 400
                                }
                            }
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toHaveProperty('errorCode', '');
                    });
                });

                describe('AND there is no response object (e.g. timeout)', () => {
                    it('should throw an `UpdateCheckoutError` error with the `message` of the error', async () => {
                        // Arrange
                        const errorMessage = 'Timeout exceeded 10s';
                        const error = {
                            message: errorMessage
                        };

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
                                $logger,
                                $cookies
                            }
                        });

                        // Act & Assert
                        const result = await expect(wrapper.vm.handleUpdateCheckout());

                        result.rejects.toThrow(UpdateCheckoutError);
                        result.rejects.toThrow(errorMessage);
                    });
                });
            });
        });

        describe('mapCheckoutUpdateRequest', () => {
            let wrapper;
            let getMappedDataForUpdateCheckoutSpy;

            beforeEach(() => {
                getMappedDataForUpdateCheckoutSpy = jest.spyOn(VueCheckout.methods, 'getMappedDataForUpdateCheckout');

                wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        customer: {
                            ...defaultCheckoutState.customer,
                            dateOfBirth: 'Thu Jul 05 1990 00:00:00 GMT+0100 (British Summer Time)'
                        }
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should map the request successfully', async () => {
                // Act
                const mappedRequest = await wrapper.vm.getMappedDataForUpdateCheckout();

                // Assert
                expect(getMappedDataForUpdateCheckoutSpy).toHaveBeenCalled();
                expect(mappedRequest[0].value).toMatchSnapshot();

                expect(mappedRequest[1].value).toMatchSnapshot();
            });

            it('should map the request for age verification only successfully', async () => {
                // Act
                const mappedRequest = await wrapper.vm.getMappedDataForUpdateCheckout({ ageVerificationOnly: true });

                // Assert
                expect(getMappedDataForUpdateCheckoutSpy).toHaveBeenCalled();
                expect(mappedRequest[0].value).toEqual({
                    dateOfBirth: 'Thu Jul 05 1990 00:00:00 GMT+0100 (British Summer Time)'
                });
                expect(mappedRequest[1].value).toBeNull();
            });
        });

        describe('setupGuestUser ::', () => {
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

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
                    otacToAuthExchanger,
                    timeout: 60000
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
                        $logger,
                        $cookies
                    }
                });

                // Act
                await wrapper.vm.setupGuestUser();

                // Assert
                expect(createGuestUserSpy).toHaveBeenCalledWith(expected);
            });

            describe('when `createGuestUser` request fails', () => {
                const errorMessage = 'An error';

                let wrapper;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, createGuestUser: jest.fn(async () => Promise.reject(new Error(errorMessage))) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should throw a `CreateGuestUserError` with the `message` of the error', async () => {
                    // Act & Assert
                    const result = await expect(wrapper.vm.setupGuestUser());

                    result.rejects.toThrow(CreateGuestUserError);
                    result.rejects.toThrow(errorMessage);
                });
            });

            describe('when `createGuestUser` request succeeds', () => {
                it('should call `handleEventLogging` with `CheckoutSetupGuestSuccess`', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.setupGuestUser();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutSetupGuestSuccess');
                });
            });
        });

        describe('loadCheckout ::', () => {
            describe('when `getCheckout` request fails', () => {
                let wrapper;
                let handleErrorStateSpy;

                const error = {
                    response: {
                        status: 400
                    }
                };

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();
                    jest.fn(async () => Promise.reject(error));

                    handleErrorStateSpy = jest.spyOn(VueCheckout.methods, 'handleErrorState');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                describe('AND the error code is `403', () => {
                    it('should call `handleErrorState` with `GetCheckoutAccessForbiddenError`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.reject({ response: { status: 403 } })) }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        // Act
                        await wrapper.vm.loadCheckout();

                        // Assert
                        expect(handleErrorStateSpy).toHaveBeenCalledWith(expect.any(GetCheckoutAccessForbiddenError));
                    });
                });

                describe('AND the error code is not `403', () => {
                    it('should call `handleErrorState` with `GetCheckoutError`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.reject({ response: { status: 400 } })) }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        // Act
                        await wrapper.vm.loadCheckout();

                        // Assert
                        expect(handleErrorStateSpy).toHaveBeenCalledWith(expect.any(GetCheckoutError));
                    });
                });

                describe('AND there is no response object (e.g. timeout)', () => {
                    it('should call `handleErrorState` with `GetCheckoutError`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getCheckout: jest.fn(async () => Promise.reject({ message: 'Timeout exceeded 10s' })) }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        // Act
                        await wrapper.vm.loadCheckout();

                        // Assert
                        expect(handleErrorStateSpy).toHaveBeenCalledWith(expect.any(GetCheckoutError));
                    });
                });
            });

            describe('when `getCheckout` request succeeds', () => {
                let handleEventLoggingSpy;

                beforeEach(() => {
                    handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `handleEventLogging` with `CheckoutGetSuccess`', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadCheckout();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutGetSuccess');
                });
            });
        });

        describe('loadAvailableFulfilment ::', () => {
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getAvailableFulfilment` request fails', () => {
                let wrapper;
                let handleErrorStateSpy;
                let error;
                let availableFulfilmentError;

                beforeEach(() => {
                    // Arrange
                    error = {
                        message: 'jazz sometimes happens',
                        response: {
                            status: 400
                        }
                    };

                    availableFulfilmentError = new AvailableFulfilmentGetError(error.message, error.response.status);

                    wrapper = mount(VueCheckout, {
                        store: createStore(
                            defaultCheckoutState,
                            {
                                ...defaultCheckoutActions,
                                getAvailableFulfilment: jest.fn(async () => Promise.reject(error))
                            }
                        ),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    handleErrorStateSpy = jest.spyOn(wrapper.vm, 'handleErrorState').mockImplementation();
                    jest.spyOn(wrapper.vm, 'initialise').mockImplementation();
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `handleErrorState` with `AvailableFulfilmentGetError`', async () => {
                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(handleErrorStateSpy).toHaveBeenCalledWith(availableFulfilmentError);
                });
            });

            describe('when `getAvailableFulfilment` request succeeds', () => {
                it('should call `handleEventLogging` with success event', async () => {
                    // Arrange
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadAvailableFulfilment();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutAvailableFulfilmentGetSuccess');
                });
            });
        });

        describe('lookupGeoLocation ::', () => {
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

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
                    timeout: 60000
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
                            $cookies
                        }
                    });

                    await flushPromises();
                });

                it('should call `getGeoLocation`', async () => {
                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(getGeoLocationSpy).toHaveBeenCalledWith(expected);
                });

                it('should not call `getGeoLocation` if the service type is not delivery', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(getGeoLocationSpy).toHaveBeenCalledTimes(0);
                });
            });

            describe('when `getGeoLocation` request fails', () => {
                it('should call `handleEventLogging` with failure event and error and error', async () => {
                    // Arrange
                    const error = 'jazz sometimes happens';

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, {
                            ...defaultCheckoutActions,
                            getGeoLocation: jest.fn(async () => Promise.reject(error))
                        }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutGeoLocationGetFailure', error);
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
                            $logger,
                            $cookies
                        }
                    });

                    await flushPromises();
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
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getBasket` request fails', () => {
                // Arrange
                let wrapper;
                let handleErrorStateSpy;

                beforeEach(() => {
                    jest.spyOn(VueCheckout.methods, 'initialise').mockImplementation();

                    handleErrorStateSpy = jest.spyOn(VueCheckout.methods, 'handleErrorState');

                    wrapper = mount(VueCheckout, {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getBasket: jest.fn(async () => Promise.reject({ response: { status: 400 } })) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `handleErrorState` with a new `GetBasketError`', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getBasket: jest.fn(async () => Promise.reject({ message: 'Error', response: { status: 400 } })) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(handleErrorStateSpy).toHaveBeenCalledWith(expect.any(GetBasketError));
                });

                describe('AND there is no response object (e.g. timeout)', () => {
                    it('should call `handleErrorState` with a new `GetBasketError`', async () => {
                        // Arrange
                        wrapper = mount(VueCheckout, {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getBasket: jest.fn(async () => Promise.reject({ message: 'Timeout exceeded 10s' })) }),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        // Act
                        await wrapper.vm.loadBasket();

                        // Assert
                        expect(handleErrorStateSpy).toHaveBeenCalledWith(expect.any(GetBasketError));
                    });
                });
            });

            describe('when `getBasket` request succeeds', () => {
                it('should call `handleEventLogging` with success event', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutBasketGetSuccess');
                });
            });
        });

        describe('loadAddress ::', () => {
            let handleEventLoggingSpy;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `getAddress` request fails', () => {
                it('should call `handleEventLogging` with failure event and error', async () => {
                    // Arrange
                    const error = new Error('Doh exception man!');

                    const wrapper = mount(VueCheckout, {
                        store: createStore(defaultCheckoutState, { ...defaultCheckoutActions, getAddress: jest.fn(async () => Promise.reject(error)) }),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutAddressGetFailure', error);
                });
            });

            describe('when `getAddress` request succeeds', () => {
                it('should call `handleEventLogging` with success event', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutAddressGetSuccess');
                });
            });
        });

        describe('handleErrorState ::', () => {
            let wrapper;
            let error;
            let scrollToElementSpy;
            let handleEventLoggingSpy;

            beforeEach(() => {
                // Arrange
                error = new Error('An error occurred');

                wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: alertCode
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                handleEventLoggingSpy = jest.spyOn(wrapper.vm, 'handleEventLogging').mockImplementation();
                scrollToElementSpy = jest.spyOn(wrapper.vm, 'scrollToElement');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `trackFormInteraction` with the error information including `errorCode` when it exists', () => {
                // Arrange
                error.errorCode = 'OrderError';

                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(wrapper.vm.checkoutAnalyticsService.trackFormInteraction).toHaveBeenCalledWith({ action: 'error', error: `error_${error.errorCode}-${error.message}` });
            });

            it('should call `trackFormInteraction` without an `errorCode` when it does not exist', () => {
                // Arrange
                error.errorCode = null;

                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(wrapper.vm.checkoutAnalyticsService.trackFormInteraction).toHaveBeenCalledWith({ action: 'error', error: `error_${error.message}` });
            });

            it('should call `scrollToElement` with the `errorMessage` element', async () => {
                // Act
                wrapper.vm.handleErrorState(error);

                await wrapper.vm.$nextTick();

                // Assert
                expect(scrollToElementSpy).toHaveBeenCalledWith(wrapper.vm.$refs.errorMessage.$el);
            });

            describe('If error has `eventMessage`', () => {
                it('should call `handleEventLogging` with the `eventMessage` and the error', () => {
                    // Act
                    const errorWithEventMessage = { eventMessage: 'Error Message' };
                    wrapper.vm.handleErrorState(errorWithEventMessage);

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('Error Message', errorWithEventMessage);
                });
            });

            describe('If error does not have an `eventMessage`', () => {
                it('should call `handleEventLogging` with the `CheckoutFailure` and the error', () => {
                    // Act
                    wrapper.vm.handleErrorState(error);

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutFailure', error);
                });
            });
        });

        describe('scrollToElement ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `scrollTo` with the default `options` when the element exists', () => {
                // Arrange
                const ref = 'errorMessage';
                const scrollToSpy = jest.spyOn(VueScrollTo, 'scrollTo');

                const wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: alertCode
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                const alertElement = wrapper.findComponent({ ref }).vm.$el;

                // Act
                wrapper.vm.scrollToElement(alertElement);

                // Assert
                expect(scrollToSpy).toHaveBeenCalledWith(alertElement, 650, { duration: 650, offset: -20 });
            });

            it('should not call `scrollTo` with the element when it does not exists', () => {
                // Arrange
                const scrollToSpy = jest.spyOn(VueScrollTo, 'scrollTo');

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
                wrapper.vm.scrollToElement(null);

                // Assert
                expect(scrollToSpy).not.toHaveBeenCalled();
            });

            it('should accept `options` as a parameter', () => {
                // Arrange
                const ref = 'errorMessage';
                const scrollToSpy = jest.spyOn(VueScrollTo, 'scrollTo');

                const wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: alertCode
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                const alertElement = wrapper.findComponent({ ref }).vm.$el;

                // Act
                wrapper.vm.scrollToElement(alertElement, { offset: -100 });

                // Assert
                expect(scrollToSpy).toHaveBeenCalledWith(alertElement, 650, { duration: 650, offset: -100 });
            });
        });

        describe('`onFormSubmit` ::', () => {
            let updateMessageSpy;

            beforeEach(() => {
                updateMessageSpy = jest.spyOn(VueCheckout.methods, 'updateMessage');
            });

            it('should exist', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });

                // Act & Assert
                expect(wrapper.vm.onFormSubmit).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `updateMessage`', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(updateMessageSpy).toHaveBeenCalled();
                });

                it('should make a call to `trackFormInteraction` so we can track the action type `submit`', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.vm.checkoutAnalyticsService.trackFormInteraction).toHaveBeenCalledWith({
                        action: 'submit'
                    });
                });
            });
        });

        describe('`onInvalidCheckoutForm` ::', () => {
            let validationState;
            let handleEventLoggingSpy;

            beforeEach(() => {
                validationState = {
                    validFields: [
                        'customer.mobileNumber',
                        'address.line1',
                        'address.locality',
                        'address.postcode'
                    ],
                    invalidFields: []
                };

                $cookies.get.mockReturnValue('ar511ar');

                jest.spyOn(validations, 'getFormValidationState').mockReturnValue(validationState);
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should exist', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act & Assert
                expect(wrapper.vm.onInvalidCheckoutForm).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `trackFormInteraction` with `inline_error` & `invalidFields`', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.onInvalidCheckoutForm(validationState);

                    // Assert
                    expect(wrapper.vm.checkoutAnalyticsService.trackFormInteraction).toHaveBeenCalledWith({
                        action: 'inline_error',
                        error: validationState.invalidFields.toString()
                    });
                });

                it(`should make a call to 'trackFormInteraction' with 'error' & '${ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE}`, async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.onInvalidCheckoutForm(validationState);

                    // Assert
                    expect(wrapper.vm.checkoutAnalyticsService.trackFormInteraction).toHaveBeenCalledWith({
                        action: 'error',
                        error: ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE
                    });
                });

                it('should make a call `handleEventLogging` with `CheckoutValidationError`, validationState and addressDetails', async () => {
                    // Arrange
                    const wrapper = mount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $cookies
                        }
                    });

                    // Act
                    await wrapper.vm.onInvalidCheckoutForm(validationState);

                    const expandedData = {
                        enteredPostcode: 'BS1 1AA',
                        location: 'ar511ar',
                        locationUk: 'ar511ar',
                        changedFields: [],
                        isPostcodeChanged: false
                    };

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutValidationError', validationState, { ...expandedData, validationState });
                });
            });
        });

        describe('redirectToPayment ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should redirect to the payment page', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.redirectToPayment();

                // Assert
                expect(windowLocationSpy).toHaveBeenCalledWith(`${paymentPageUrlPrefix}/${defaultCheckoutState.orderId}`);
            });
        });

        describe('submitOrder ::', () => {
            const basketId = 'myBasketId-v1';

            let handleEventLoggingSpy;
            let wrapper;

            beforeEach(() => {
                handleEventLoggingSpy = jest.spyOn(VueCheckout.methods, 'handleEventLogging').mockImplementation();
                wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        basket: {
                            id: basketId
                        }
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `getReferralState`', async () => {
                // Arrange
                const getReferralStateSpy = jest.spyOn(wrapper.vm, 'getReferralState');

                // Act
                await wrapper.vm.submitOrder();

                // Assert
                expect(getReferralStateSpy).toHaveBeenCalled();
            });

            it('should call `placeOrder`', async () => {
                // Arrange
                const placeOrderSpy = jest.spyOn(wrapper.vm, 'placeOrder');
                jest.spyOn(wrapper.vm, 'getReferralState').mockImplementation(() => 'MockReferralState');

                const expected = {
                    url: placeOrderUrl,
                    data: {
                        basketId,
                        customerNotes: {
                            NoteForRestaurant: defaultCheckoutState.userNote
                        },
                        referralState: 'MockReferralState'
                    },
                    timeout: 60000
                };

                // Act
                await wrapper.vm.submitOrder();

                // Assert
                expect(placeOrderSpy).toHaveBeenCalledWith(expected);
            });

            describe('when `placeOrder` is successful', () => {
                it('should `handleEventLogging` to have been called with `CheckoutPlaceOrderSuccess`', async () => {
                    // Act
                    await wrapper.vm.submitOrder();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutPlaceOrderSuccess');
                });

                it('should `handleEventLogging` to have been called with `CheckoutSuccess`', async () => {
                    // Act
                    await wrapper.vm.submitOrder();

                    // Assert
                    expect(handleEventLoggingSpy).toHaveBeenCalledWith('CheckoutSuccess');
                });
            });

            describe('when `placeOrder` is unsuccessful', () => {
                describe('AND `errorCode` is not `DuplicateOrder`', () => {
                    it('should throw a `PlaceOrderError` error', async () => {
                        // Arrange
                        const errorMessage = 'An error - Something happened on the server';
                        const errorCode = 500;
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    errorCode
                                }
                            }
                        };

                        wrapper = shallowMount(VueCheckout, {
                            store: createStore(
                                defaultCheckoutState,
                                {
                                    ...defaultCheckoutActions,
                                    placeOrder: jest.fn(async () => Promise.reject(error))
                                }
                            ),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        try {
                            // Act
                            await wrapper.vm.submitOrder();
                        } catch (e) {
                            // Assert
                            expect(e).toBeInstanceOf(PlaceOrderError);
                            expect(e.message).toEqual(errorMessage);
                            expect(e.errorCode).toEqual(errorCode);
                        }
                    });
                });

                describe('AND `errorCode` is `DuplicateOrder`', () => {
                    it('should throw a `PlaceOrderError` error', async () => {
                        // Arrange
                        const errorMessage = 'An error - Your order is a duplicate';
                        const errorCode = 'DuplicateOrder';
                        const error = {
                            message: errorMessage,
                            response: {
                                data: {
                                    errorCode
                                }
                            }
                        };

                        wrapper = shallowMount(VueCheckout, {
                            store: createStore(
                                defaultCheckoutState,
                                {
                                    ...defaultCheckoutActions,
                                    placeOrder: jest.fn(async () => Promise.reject(error))
                                }
                            ),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        try {
                            // Act
                            await wrapper.vm.submitOrder();
                        } catch (e) {
                            // Assert
                            expect(e).toBeInstanceOf(PlaceOrderError);
                            expect(e.message).toEqual(errorMessage);
                            expect(e.errorCode).toEqual(errorCode);
                        }
                    });
                });

                describe('AND there is no response object (e.g. timeout)', () => {
                    it('should throw a `PlaceOrderError` error with no `errorCode`', async () => {
                        // Arrange
                        const errorMessage = 'Timeout exceeded 10s';
                        const error = {
                            message: errorMessage
                        };

                        wrapper = shallowMount(VueCheckout, {
                            store: createStore(
                                defaultCheckoutState,
                                {
                                    ...defaultCheckoutActions,
                                    placeOrder: jest.fn(async () => Promise.reject(error))
                                }
                            ),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        try {
                            // Act
                            await wrapper.vm.submitOrder();
                        } catch (e) {
                            // Assert
                            expect(e).toBeInstanceOf(PlaceOrderError);
                            expect(e.message).toEqual(errorMessage);
                            expect(e.errorCode).toBe(undefined);
                        }
                    });
                });
            });
        });

        describe('getReferralState ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should retrieve the referral state from the cookie', () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, restaurant: { id: '99999' } }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });

                const getSpy = jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue({ menuReferralState: 1 });

                // Act
                wrapper.vm.getReferralState();

                // Assert
                expect(getSpy).toHaveBeenCalledWith('je-rw-menu-referral-state-99999');
            });

            describe('when the cookie exists', () => {
                describe('AND the `menuReferralState` is `1`', () => {
                    it('should return "ReferredByWeb"', () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue({ menuReferralState: 1 });

                        // Act
                        const result = wrapper.vm.getReferralState();

                        // Assert
                        expect(result).toBe('ReferredByWeb');
                    });
                });

                describe('AND the `menuReferralState` is not `1`', () => {
                    it('should return "None"', () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue({ menuReferralState: 0 });

                        // Act
                        const result = wrapper.vm.getReferralState();

                        // Assert
                        expect(result).toBe('None');
                    });
                });

                describe('AND the `menuReferralState` does not exist', () => {
                    it('should return "None"', () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData,
                            mocks: {
                                $logger,
                                $cookies
                            }
                        });

                        jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue({});

                        // Act
                        const result = wrapper.vm.getReferralState();

                        // Assert
                        expect(result).toBe('None');
                    });
                });
            });

            describe('when the cookie does not exist', () => {
                it('should return "None"', () => {
                    // Arrange
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger,
                            $cookies
                        }
                    });

                    jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue(null);

                    // Act
                    const result = wrapper.vm.getReferralState();

                    // Assert
                    expect(result).toBe('None');
                });
            });
        });

        describe('reloadAvailableFulfilmentTimesIfOutdated ::', () => {
            let wrapper;
            let loadAvailableFulfilmentSpy;

            beforeEach(() => {
                // Arrange
                loadAvailableFulfilmentSpy = jest.spyOn(VueCheckout.methods, 'loadAvailableFulfilment');

                wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: {
                            code: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
                        }
                    }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger,
                        $cookies
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should make a call to `loadAvailableFulfilment`', async () => {
                // Act
                await wrapper.vm.reloadAvailableFulfilmentTimesIfOutdated();

                // Assert
                expect(loadAvailableFulfilmentSpy).toHaveBeenCalled();
            });

            it('should increase `availableFulfilmentTimesKey` by 1', async () => {
                // Act
                await wrapper.vm.reloadAvailableFulfilmentTimesIfOutdated();

                // Assert
                expect(wrapper.vm.availableFulfilmentTimesKey).toEqual(1);
            });
        });

        describe('handleDialogCreation ::', () => {
            const event = {
                code: 'DuplicateOrder',
                isDuplicateOrderError: true
            };

            it('should call `trackDialogEvent` with passed event', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.handleDialogCreation(event);

                // Assert
                expect(wrapper.vm.checkoutAnalyticsService.trackDialogEvent).toHaveBeenCalledWith(event);
            });
        });
    });

    describe('watch ::', () => {
        describe('authToken ::', () => {
            describe('when invoked', () => {
                it('should make a call to `setAuthToken` to set the updated authToken', async () => {
                    // Arrange
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData
                    });
                    const setAuthTokenSpy = jest.spyOn(wrapper.vm, 'setAuthToken');

                    // Act
                    await wrapper.vm.$options.watch.authToken[0].call(wrapper.vm);

                    // Assert
                    expect(setAuthTokenSpy).toHaveBeenCalledWith(wrapper.vm.authToken);
                });

                describe('AND the token changes from falsey > truthy', () => {
                    it('should make a call to `initialise` so we can reload checkout when the authToken updates', async () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData
                        });
                        const initialiseSpy = jest.spyOn(wrapper.vm, 'initialise');

                        // Act
                        await wrapper.vm.$options.watch.authToken[0].call(wrapper.vm, '', 'NewToken');

                        // Assert
                        expect(initialiseSpy).toHaveBeenCalled();
                    });
                });

                describe('AND the token changes from truthy > falsey', () => {
                    it('should make a call to `initialise` so we can reload checkout when the authToken updates', async () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData
                        });

                        const initialiseSpy = jest.spyOn(wrapper.vm, 'initialise');

                        // Act
                        await wrapper.vm.$options.watch.authToken[0].call(wrapper.vm, 'NewToken', '');

                        // Assert
                        expect(initialiseSpy).toHaveBeenCalled();
                    });
                });

                describe('AND the token changes / refreshes from truthy > truthy', () => {
                    it('should NOT make a call to `initialise` to avoid a checkout refresh', async () => {
                        // Arrange
                        const wrapper = shallowMount(VueCheckout, {
                            store: createStore(),
                            i18n,
                            localVue,
                            propsData: {
                                ...propsData,
                                authToken: 'kevin'
                            }
                        });
                        const initialiseSpy = jest.spyOn(wrapper.vm, 'initialise');

                        // Act
                        await wrapper.vm.$options.watch.authToken[0].call(wrapper.vm, 'NewToken', 'OldToken');

                        // Assert
                        expect(initialiseSpy).not.toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
