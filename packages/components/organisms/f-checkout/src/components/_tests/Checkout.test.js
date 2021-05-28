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
    ERROR_CODE_FULFILMENT_TIME_INVALID,
    TENANT_MAP
} from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';

import {
    defaultCheckoutState, defaultCheckoutActions, i18n, createStore, $logger
} from './helpers/setup';
import exceptions from '../../exceptions/exceptions';

const {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError
} = exceptions;
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
    tableIdentifier: {
        $dirty: false,
        required: true,
        maxLength: true
    },
    $touch: jest.fn()
};

const $style = {
    'c-checkout-alert': 'c-checkout-alert'
};


const message = {
    code: ERROR_CODE_FULFILMENT_TIME_INVALID,
    shouldRedirectToMenu: true,
    shouldShowInDialog: true
};

const dialog = {
    name: 'error-dialog'
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
    const spinnerTimeout = 100;
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
        applicationName,
        spinnerTimeout,
        otacToAuthExchanger
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
            const fulfilmentTimeDropdownSelector = '[data-test-id="formfield-order-time-dropdown-select"]';
            const tableIdentifierSelector = '[data-test-id="formfield-table-identifier-input"]';

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

            it('should not display the address block if set to `dinein`', async () => {
                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DINEIN }),
                    i18n,
                    localVue,
                    propsData
                });

                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(false);
            });

            it('should display the table identifier input if set to `dinein`', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DINEIN }),
                    i18n,
                    localVue,
                    propsData
                });

                const tableIdentifierInput = wrapper.find(tableIdentifierSelector);

                // Assert
                expect(tableIdentifierInput.exists()).toBe(true);
            });

            it('should not display the table identifier input if set to `collection`', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData
                });

                const tableIdentifierInput = wrapper.find(tableIdentifierSelector);

                // Assert
                expect(tableIdentifierInput.exists()).toBe(false);
            });

            it('should not display the table identifier input if set to `delivery`', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                const tableIdentifierInput = wrapper.find(tableIdentifierSelector);

                // Assert
                expect(tableIdentifierInput.exists()).toBe(false);
            });

            it('should display the fulfilment time dropdown if set to `delivery`', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DELIVERY }),
                    i18n,
                    localVue,
                    propsData
                });

                const fulfilmentTimeDropdown = wrapper.find(fulfilmentTimeDropdownSelector);

                // Assert
                expect(fulfilmentTimeDropdown.exists()).toBe(true);
            });

            it('should display the fulfilment time dropdown if set to `collection`', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_COLLECTION }),
                    i18n,
                    localVue,
                    propsData
                });

                const fulfilmentTimeDropdown = wrapper.find(fulfilmentTimeDropdownSelector);

                // Assert
                expect(fulfilmentTimeDropdown.exists()).toBe(true);
            });

            it('should display the fulfilment time dropdown if set to `dinein` and there is more than one fulfilment time available', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        serviceType: CHECKOUT_METHOD_DINEIN
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const fulfilmentTimeDropdown = wrapper.find(fulfilmentTimeDropdownSelector);

                // Assert
                expect(fulfilmentTimeDropdown.exists()).toBe(true);
            });

            it('should not display the fulfilment time dropdown if set to `dinein` and there is only one fulfilment time available', async () => {
                // Act
                const wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        availableFulfilment: {
                            times: [
                                {
                                    from: '2020-01-01T01:00:00.000Z',
                                    to: '2020-01-01T01:00:00.000Z'
                                }
                            ]
                        },
                        serviceType: CHECKOUT_METHOD_DINEIN
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                const fulfilmentTimeDropdown = wrapper.find(fulfilmentTimeDropdownSelector);

                // Assert
                expect(fulfilmentTimeDropdown.exists()).toBe(false);
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

    describe('computed ::', () => {
        describe('formattedMobileNumberForScreenReader ::', () => {
            it('should return the mobile number with spaces after every character', () => {
                const expectedMobileNumber = '+ 4 4 7 1 1 1 1 1 1 1 1 1';
                // Act
                const wrapper = shallowMount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState
                    }),
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.formattedMobileNumberForScreenReader).toEqual(expectedMobileNumber);
            });
        });

        describe('isMobileNumberEmpty ::', () => {
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

            it('should return `false` if mobileNumber field has not been touched', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = false;

                // Assert
                expect(wrapper.vm.isMobileNumberEmpty).toBeFalsy();
            });

            it('should return `true` if mobileNumber field has been touched but the field is empty', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.customer.mobileNumber = '';

                // Assert
                expect(wrapper.vm.isMobileNumberEmpty).toBeTruthy();
            });

            it('should return `false` if mobileNumber field has been touched and the field is not empty', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.customer.mobileNumber = '123';

                // Assert
                expect(wrapper.vm.isMobileNumberEmpty).toBeFalsy();
            });
        });

        describe('isMobileNumberInvalid ::', () => {
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

            it('should return `false` if mobileNumber field has not been touched', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = false;

                // Assert
                expect(wrapper.vm.isMobileNumberInvalid).toBeFalsy();
            });

            it('should return `false` if mobileNumber field has been touched and the field is empty', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.customer.mobileNumber = '';

                // Assert
                expect(wrapper.vm.isMobileNumberInvalid).toBeFalsy();
            });

            it('should return `true` if mobileNumber field has been touched, the field is not empty, but the phone number is invalid', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.customer.mobileNumber = '123';

                // Assert
                expect(wrapper.vm.isMobileNumberInvalid).toBeTruthy();
            });

            it('should return `false` if mobileNumber field has been touched, and the phone number is valid', () => {
                // Act
                wrapper.vm.$v.customer.mobileNumber.$dirty = true;
                wrapper.vm.customer.mobileNumber = '0711111111';

                // Assert
                expect(wrapper.vm.isMobileNumberInvalid).toBeTruthy();
            });
        });

        describe('invalidFieldsSummary ::', () => {
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

            it('should return `null` if no fields have been touched', () => {
                // Arrange & Act
                $v.$dirty = false;

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
            });

            it('should return `null` if all fields have been touched and are valid', () => {
                // Arrange
                const mockValidationState = {
                    invalidFields: []
                };

                jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);
                $v.dirty = true;

                // Act
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
            });

            it('should return the error summary with the number of invalid fields when there are more than one', () => {
                // Arrange
                const mockValidationState = {
                    invalidFields: [
                        'customer.mobileNumber',
                        'address.line1',
                        'address.locality',
                        'address.postcode'
                    ]
                };

                jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);
                $v.$dirty = true;

                // Act
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toMatchSnapshot();
            });

            it('should return the error summary with the number of invalid fields when there is only one', () => {
                // Arrange
                const mockValidationState = {
                    invalidFields: [
                        'customer.mobileNumber'
                    ]
                };

                jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);
                $v.$dirty = true;

                // Act
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toMatchSnapshot();
            });

            it('should not render the error summary when there are no errors', () => {
                // Arrange & Act
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    },
                    computed: {
                        invalidFieldsSummary () {
                            return null;
                        }
                    }
                });

                const errorSummaryContainer = wrapper.find('[data-test-id="error-summary-container"]');

                // Assert
                expect(errorSummaryContainer.exists()).toBe(false);
            });

            it('should render the hidden error summary when there are errors', () => {
                // Arrange & Act
                wrapper = mount(VueCheckout, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $logger
                    },
                    computed: {
                        invalidFieldsSummary () {
                            return 'There are 7 errors in the form';
                        }
                    }
                });

                const errorSummaryContainer = wrapper.find('[data-test-id="error-summary-container"]');

                // Assert
                expect(errorSummaryContainer.exists()).toBe(true);
                expect(errorSummaryContainer.classes('is-visuallyHidden')).toBe(true);
            });
        });

        describe('isTableIdentifierEmpty ::', () => {
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

            it('should return `false` if tableIdentifier field has not been touched', () => {
                // Act
                wrapper.vm.$v.tableIdentifier.$dirty = false;

                // Assert
                expect(wrapper.vm.isTableIdentifierEmpty).toBeFalsy();
            });

            it('should return `true` if tableIdentifier field has been touched but tableIdentifier is empty', () => {
                // Act
                wrapper.vm.$v.tableIdentifier.$dirty = true;
                wrapper.vm.$v.tableIdentifier.required = false;

                // Assert
                expect(wrapper.vm.isTableIdentifierEmpty).toBeTruthy();
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
                expect(result).toEqual({ isLoggedIn: defaultCheckoutState.isLoggedIn, serviceType: defaultCheckoutState.serviceType });
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
                            message
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

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

        describe('dialogMessage ::', () => {
            describe('when a message exists AND `shouldShowInDialog` is true', () => {
                it('should return dialog', () => {
                    // Act
                    const wrapper = shallowMount(VueCheckout, {
                        store: createStore({
                            ...defaultCheckoutState,
                            message
                        }),
                        i18n,
                        localVue,
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.dialogMessage).toEqual(dialog);
                });
            });
        });

        describe('alertMessage ::', () => {
            describe('when a message exists AND `shouldShowInDialog` is false', () => {
                it('should return alert', () => {
                    // Act
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

                    // Assert
                    expect(wrapper.vm.alertMessage).toEqual(alert);
                });
            });
        });
    });

    describe('mounted ::', () => {
        let initialiseSpy;
        let setAuthTokenSpy;
        let trackInitialLoadSpy;
        let wrapper;

        beforeEach(() => {
            initialiseSpy = jest.spyOn(VueCheckout.methods, 'initialise');
            setAuthTokenSpy = jest.spyOn(VueCheckout.methods, 'setAuthToken');
            trackInitialLoadSpy = jest.spyOn(VueCheckout.methods, 'trackInitialLoad');

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
            expect(trackInitialLoadSpy).toHaveBeenCalled();
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
                it('should not set `shouldShowSpinner` to `true` before `spinnerTimeout`', () => {
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
                    jest.advanceTimersByTime(spinnerTimeout - 1);

                    // Assert
                    expect(wrapper.vm.shouldShowSpinner).toBe(false);
                });

                it('should set `shouldShowSpinner` to `true` after `spinnerTimeout`', () => {
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
                    jest.advanceTimersByTime(spinnerTimeout + 1);

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
                        isLoggedIn: false,
                        isFulfillable: true
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
                                    $logger
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
                                    $logger
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
                                    $logger
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
                                $logger
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
                                $logger
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
                            const error = new PlaceOrderError('PlaceOrderError exception!');

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
                    wrapper.vm.logInvoker({
                        message: 'Logger says hi',
                        data: eventData,
                        logMethod: $logger.logInfo
                    });

                    // Assert
                    expect($logger.logInfo).toHaveBeenCalled();
                });

                it('should call `$logger` with the correct arguments', () => {
                    // Arrange
                    const eventData = {
                        isLoggedIn: true,
                        serviceType: CHECKOUT_METHOD_DELIVERY
                    };
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
                        data: eventData,
                        logMethod: $logger.logError,
                        error
                    });

                    // Assert
                    expect($logger.logError).toHaveBeenCalledWith(logMessage, store, { data: eventData, tags: 'checkout', ...expectedError });
                });
            });
        });

        describe('`handleNonFulfillableCheckout` ::', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = mount(VueCheckout, {
                    store: createStore({
                        ...defaultCheckoutState,
                        errors: [message]
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
                expect(wrapper.vm.handleNonFulfillableCheckout).toBeDefined();
            });

            describe('when there are errors', () => {
                it('should make a call to `logInvoker` with a `message` and `eventData`', () => {
                    // Arrange
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    wrapper.vm.handleNonFulfillableCheckout();

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith({
                        message: 'Consumer Checkout Not Fulfillable',
                        data: wrapper.vm.eventData,
                        logMethod: $logger.logWarn
                    });
                });

                it('should make a call to `trackFormErrors`', () => {
                    // Arrange
                    const trackFormErrorsSpy = jest.spyOn(wrapper.vm, 'trackFormErrors');

                    // Act
                    wrapper.vm.handleNonFulfillableCheckout();

                    // Assert
                    expect(trackFormErrorsSpy).toHaveBeenCalled();
                });

                it('should emit `CheckoutUpdateFailure` event', async () => {
                    // Arrange & Act
                    await wrapper.vm.handleNonFulfillableCheckout();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutUpdateFailure).length).toBe(1);
                });
            });
        });

        describe('handleUpdateCheckout ::', () => {
            let wrapper;
            let updateCheckoutSpy;

            beforeEach(() => {
                updateCheckoutSpy = jest.spyOn(VueCheckout.methods, 'updateCheckout');
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
                        $logger
                    }
                });

                // Act
                await wrapper.vm.handleUpdateCheckout();

                // Assert
                expect(updateCheckoutSpy).toHaveBeenCalled();
            });

            describe('when `updateCheckout` request succeeds', () => {
                it('should emit `CheckoutUpdateSuccess` event', async () => {
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
                    expect(wrapper.emitted(EventNames.CheckoutUpdateSuccess).length).toBe(1);
                });
            });

            describe('when `updateCheckout` request fails', () => {
                it('should throw an `UpdateCheckoutError` error with the `message` of the error', async () => {
                    // Arrange
                    const errorMessage = 'An error';

                    wrapper = mount(VueCheckout, {
                        store: createStore(
                            defaultCheckoutState,
                            {
                                ...defaultCheckoutActions,
                                updateCheckout: jest.fn(async () => Promise.reject(new Error(errorMessage)))
                            }
                        ),
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });

                    // Act & Assert
                    const result = await expect(wrapper.vm.handleUpdateCheckout());

                    result.rejects.toThrow(UpdateCheckoutError);
                    result.rejects.toThrow(errorMessage);
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
                    otacToAuthExchanger,
                    timeout: 10000
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
                            $logger
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
                    timeout: 10000
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

                    localStore = createStore(defaultCheckoutState, { ...defaultCheckoutActions, getGeoLocation: jest.fn(async () => Promise.reject(new Error(errorMsg))) });
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

                it('should call `logInvoker` with a warning', async () => {
                    // Arrange
                    const error = new Error(errorMsg);
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    await wrapper.vm.lookupGeoLocation();

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith({
                        message: 'Geo Location Lookup Failed',
                        data: wrapper.vm.eventData,
                        logMethod: $logger.logWarn,
                        error
                    });
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
                // Arrange
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
                    // Arrange
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    await wrapper.vm.loadBasket();

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalled();
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
                    // Arrange
                    const error = new Error('Doh exception man!');
                    const eventData = {
                        isLoggedIn: defaultCheckoutState.isLoggedIn,
                        serviceType: defaultCheckoutState.serviceType
                    };
                    const store = createStore(defaultCheckoutState, { ...defaultCheckoutActions, getAddress: jest.fn(async () => Promise.reject(error)) });
                    const wrapper = mount(VueCheckout, {
                        store,
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $logger
                        }
                    });
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    await wrapper.vm.loadAddress();

                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetFailure).length).toBe(1);
                    expect(wrapper.emitted(EventNames.CheckoutAddressGetSuccess)).toBeUndefined();
                    expect(logInvokerSpy).toHaveBeenCalledWith({
                        message: 'Get checkout address failure',
                        data: eventData,
                        logMethod: $logger.logWarn,
                        error
                    });

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
            let eventData;
            let error;
            let eventToEmit;
            let logInvokerSpy;
            let trackFormInteractionSpy;
            let scrollToElementSpy;

            beforeEach(() => {
                // Arrange
                error = new Error('An error occurred');
                eventToEmit = EventNames.CheckoutFailure;

                eventData = {
                    isLoggedIn: defaultCheckoutState.isLoggedIn,
                    serviceType: defaultCheckoutState.serviceType
                };

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

                logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');
                trackFormInteractionSpy = jest.spyOn(wrapper.vm, 'trackFormInteraction');
                scrollToElementSpy = jest.spyOn(wrapper.vm, 'scrollToElement');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should emit passed event with the event data and error', () => {
                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(wrapper.emitted(eventToEmit).length).toBe(1);
                expect(wrapper.emitted(eventToEmit)[0][0]).toEqual({ ...eventData, error });
            });

            it('should call `logInvoker` to log the error, passing the `eventData` and `error`', () => {
                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(logInvokerSpy).toHaveBeenCalledWith({
                    message: 'Consumer Checkout Failure',
                    data: eventData,
                    logMethod: $logger.logError,
                    error
                });
            });

            it('should call `trackFormInteraction` with the error information', () => {
                // Act
                wrapper.vm.handleErrorState(error);

                // Assert
                expect(trackFormInteractionSpy).toHaveBeenCalledWith({ action: 'error', error: `error_${error.message}` });
            });

            it('should call `scrollToElement` with the `errorMessage` element', async () => {
                // Act
                wrapper.vm.handleErrorState(error);

                await wrapper.vm.$nextTick();

                // Assert
                expect(scrollToElementSpy).toHaveBeenCalledWith(wrapper.vm.$refs.errorMessage.$el);
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

        describe('scrollToFirstInlineError ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `scrollToElement` with the first inline error and -100 offset', async () => {
                // Arrange
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

                const scrollToElementSpy = jest.spyOn(wrapper.vm, 'scrollToElement');

                const firstErrorElement = document.querySelector('[data-js-error-message]');

                // Act
                wrapper.vm.scrollToFirstInlineError(firstErrorElement);

                await wrapper.vm.$nextTick();

                // Assert
                expect(scrollToElementSpy).toHaveBeenCalledWith(firstErrorElement, { offset: -100 });
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
            let updateMessageSpy;

            beforeEach(() => {
                isFormValidSpy = jest.spyOn(VueCheckout.methods, 'isFormValid');
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
                        $v,
                        $logger
                    }
                });

                // Act & Assert
                expect(wrapper.vm.onFormSubmit).toBeDefined();
            });

            describe('when invoked', () => {
                it('should make a call to `updateMessage`', async () => {
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

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(updateMessageSpy).toHaveBeenCalled();
                });

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

                    const eventData = {
                        isLoggedIn: defaultCheckoutState.isLoggedIn,
                        serviceType: defaultCheckoutState.serviceType
                    };

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

                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    await wrapper.vm.onFormSubmit();

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith({
                        message: 'Checkout Validation Error',
                        data: {
                            ...eventData,
                            validationState: mockValidationState
                        },
                        logMethod: $logger.logWarn
                    });
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
                    store: createStore({
                        ...defaultCheckoutState,
                        message: alertCode
                    }),
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

        describe('updateTableIdentifier ::', () => {
            it('should be called with new input value on user input', async () => {
                // Arrange
                const updateTableIdentifierSpy = jest.spyOn(VueCheckout.methods, 'updateTableIdentifier');

                const wrapper = mount(VueCheckout, {
                    store: createStore({ ...defaultCheckoutState, serviceType: CHECKOUT_METHOD_DINEIN }),
                    i18n,
                    localVue,
                    propsData
                });
                const tableNumber = '10';

                // Act
                await wrapper.find('[data-test-id="formfield-table-identifier-input"]').setValue(tableNumber);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateTableIdentifierSpy).toHaveBeenCalledWith(tableNumber);
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

            let wrapper;

            beforeEach(() => {
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
                        $logger
                    }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `placeOrder`', async () => {
                // Arrange
                const placeOrderSpy = jest.spyOn(wrapper.vm, 'placeOrder');

                const expected = {
                    url: placeOrderUrl,
                    data: {
                        basketId,
                        customerNotes: {
                            noteForRestaurant: defaultCheckoutState.userNote
                        },
                        referralState: 'ReferredByWeb'
                    },
                    timeout: 10000
                };

                // Act
                await wrapper.vm.submitOrder();

                // Assert
                expect(placeOrderSpy).toHaveBeenCalledWith(expected);
            });

            describe('when `placeOrder` is successful', () => {
                it('should `$emit` a place order success with `eventData` passed', async () => {
                    // Arrange
                    const $emitSpy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    await wrapper.vm.submitOrder();

                    // Assert
                    expect($emitSpy).toHaveBeenCalledWith(EventNames.CheckoutPlaceOrderSuccess, wrapper.vm.eventData);
                });

                it('should `$emit` a checkout success with `eventData` passed', async () => {
                    // Arrange
                    const $emitSpy = jest.spyOn(wrapper.vm, '$emit');

                    // Act
                    await wrapper.vm.submitOrder();

                    // Assert
                    expect($emitSpy).toHaveBeenCalledWith(EventNames.CheckoutSuccess, wrapper.vm.eventData);
                });

                it('should `logInvoker` with a `message` & `eventData` passed', async () => {
                    // Arrange
                    const logInvokerSpy = jest.spyOn(wrapper.vm, 'logInvoker');

                    // Act
                    await wrapper.vm.submitOrder();

                    // Assert
                    expect(logInvokerSpy).toHaveBeenCalledWith({
                        message: 'Consumer Checkout Successful',
                        data: wrapper.vm.eventData,
                        logMethod: $logger.logInfo
                    });
                });
            });

            describe('when `placeOrder` is unsuccessful', () => {
                it('should throw a `PlaceOrderError` error with the `message` of the error', async () => {
                    // Arrange
                    const errorMessage = 'An error';
                    const error = {
                        message: errorMessage,
                        response: {
                            data: {
                                errorCode: errorMessage
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
                            $logger
                        }
                    });

                    // Act & Assert
                    const result = await expect(wrapper.vm.submitOrder());

                    result.rejects.toThrow(PlaceOrderError);
                    result.rejects.toThrow(errorMessage);
                });
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
