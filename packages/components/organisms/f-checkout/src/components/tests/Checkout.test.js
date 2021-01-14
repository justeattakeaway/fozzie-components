import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
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
        }
    },
    fulfilment: {
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
        }
    },
    $touch: jest.fn()
};

describe('Checkout', () => {
    allure.feature('Checkout');
    const checkoutUrl = 'http://localhost/checkout';
    const checkoutAvailableFulfilmentUrl = 'http://localhost/checkout/fulfilment';
    const loginUrl = 'http://localhost/login';
    const createGuestUrl = 'http://localhost/createguestuser';
    const propsData = {
        checkoutUrl,
        loginUrl,
        checkoutAvailableFulfilmentUrl,
        createGuestUrl
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

        it('should register the `checkout` module if it doesn\'t exist in the store', () => {
            // Arrange

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
    });

    describe('mounted ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

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

            expect(setAuthTokenSpy).toHaveBeenCalledWith(propsDataWithAuthToken.authToken);
        });

        it('should call `loadCheckout`', () => {
            // Arrange & Act
            const loadCheckoutSpy = jest.spyOn(VueCheckout.methods, 'loadCheckout');

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

            shallowMount(VueCheckout, {
                store: createStore(),
                i18n,
                localVue,
                propsData
            });

            expect(loadAvailableFulfilmentSpy).toHaveBeenCalled();
        });
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        describe('submitCheckout ::', () => {
            describe('if serviceType set to `collection`', () => {
                let wrapper;

                it('should emit success event when all the fields are populated correctly', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_COLLECTION }),
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('customer.mobileNumber');
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

                it('should emit success event when all fields are populated correctly', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({ ...defaultState, serviceType: CHECKOUT_METHOD_DELIVERY }),
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

                it('should emit failure event and display error message when address line1 input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            fulfilment: {
                                ...defaultState.fulfilment,
                                address: {
                                    ...defaultState.fulfilment.address,
                                    line1: ''
                                }
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.line1');
                });

                it('should emit failure event and display error message when city input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            fulfilment: {
                                ...defaultState.fulfilment,
                                address: {
                                    ...defaultState.fulfilment.address,
                                    city: ''
                                }
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.city');
                });

                it('should emit failure event and display error message when postcode input field is empty', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            fulfilment: {
                                ...defaultState.fulfilment,
                                address: {
                                    ...defaultState.fulfilment.address,
                                    postcode: ''
                                }
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.postcode');
                });

                it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            fulfilment: {
                                ...defaultState.fulfilment,
                                address: {
                                    ...defaultState.fulfilment.address,
                                    postcode: '?!hdb-se'
                                }
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
                    expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0].invalidFields).toContain('fulfilment.address.postcode');
                });


                it('should emit failure event and display error message when postcode contains incorrect characters', async () => {
                    // Arrange
                    wrapper = mount(VueCheckout, {
                        store: createStore({
                            ...defaultState,
                            serviceType: CHECKOUT_METHOD_DELIVERY,
                            fulfilment: {
                                ...defaultState.fulfilment,
                                address: {
                                    ...defaultState.fulfilment.address,
                                    postcode: 'EC4M 7R'
                                }
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
        });

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
                        store: createStore(),
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
                        store: createStore(),
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

        describe('handleErrorState ::', () => {
            it('should emit failure event and update `genericErrorMessage` with first error message description', () => {
                // Arrange
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

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
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

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
                const wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const error = 'Unknown Error';

                wrapper.vm.handleErrorState(error);

                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.vm.genericErrorMessage).toEqual(error);
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

            it('should emit `CheckoutFailure` with validation state if form is invalid', async () => {
                // Arrange
                const mockValidationState = {
                    validFields: [
                        'customer.mobileNumber',
                        'fulfilment.address.line1',
                        'fulfilment.address.city',
                        'fulfilment.address.postcode'
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
                expect(wrapper.emitted(EventNames.CheckoutFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.CheckoutFailure)[0][0]).toEqual(mockValidationState);
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
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(defaultState.fulfilment.address.postcode, i18n.locale);
            });
        });

        describe('updateMobileNumber', () => {
            it('should be called with new input value on user input', async () => {
                // Arrange
                const updateMobileNumberSpy = jest.spyOn(VueCheckout.methods, 'updateMobileNumber');

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
                expect(updateMobileNumberSpy).toHaveBeenCalledWith(newNumber);
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
                const setAuthTokenSpy = jest.spyOn(VueCheckout.methods, 'setAuthToken');

                const wrapper = shallowMount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData
                });

                const newAuthToken = 'new authToken';

                // Act
                wrapper.setProps({ authToken: newAuthToken });
                await wrapper.vm.$nextTick();

                // Assert
                expect(setAuthTokenSpy).toHaveBeenCalledWith('new authToken');
            });
        });
    });
});
