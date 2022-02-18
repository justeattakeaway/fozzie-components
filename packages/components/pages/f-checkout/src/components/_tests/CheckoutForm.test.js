import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { validations } from '@justeat/f-services';
import CheckoutForm from '../CheckoutForm.vue';
import EventNames from '../../event-names';

import {
    defaultCheckoutState,
    i18n,
    createStore,
    $cookies
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
        administrativeArea: {
            $dirty: false,
            required: true
        },
        postcode: {
            $dirty: false,
            required: true,
            isValidPostcode: false
        }
    },
    dineIn: {
        tableIdentifier: {
            $dirty: false,
            required: true,
            maxLength: true
        }
    },
    $touch: jest.fn()
};

const alertCode = 'Something went wrong, please try again later';

describe('CheckoutForm', () => {
    const propsData = {
        tenant: 'uk',
        isCheckoutMethodDelivery: true,
        isCheckoutMethodDineIn: false,
        scrollToElement: jest.fn(),
        availableFulfilmentTimesKey: 0,
        isFormSubmitting: false
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(CheckoutForm, {
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
        const wrapper = shallowMount(CheckoutForm, {
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

    describe('computed ::', () => {
        describe('invalidFieldsSummary ::', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = shallowMount(CheckoutForm, {
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
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $cookies
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
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $cookies
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
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $cookies
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toMatchSnapshot();
            });

            it('should not render the error summary when there are no errors', () => {
                // Arrange & Act
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $cookies
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
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v,
                        $cookies
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
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('scrollToFirstInlineError ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `scrollToElement` with the first inline error and -100 offset', async () => {
                // Arrange
                const wrapper = mount(CheckoutForm, {
                    store: createStore({
                        ...defaultCheckoutState,
                        message: alertCode
                    }),
                    i18n,
                    localVue,
                    propsData
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
                const wrapper = mount(CheckoutForm, {
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
                const wrapper = mount(CheckoutForm, {
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
                const wrapper = mount(CheckoutForm, {
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
            let scrollToFirstInlineErrorSpy;
            let wrapper;

            beforeEach(() => {
                isFormValidSpy = jest.spyOn(CheckoutForm.methods, 'isFormValid');
                scrollToFirstInlineErrorSpy = jest.spyOn(CheckoutForm.methods, 'scrollToFirstInlineError');

                // Arrange
                wrapper = mount(CheckoutForm, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should emit with `FormSubmitting` event', () => {
                // Act
                wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted(EventNames.FormSubmitting).length).toBe(1);
            });

            describe('when `isFormValid` is true', () => {
                beforeEach(() => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(true);

                    wrapper = mount(CheckoutForm, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: { $v }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should emit `FormValid` event', () => {
                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.emitted(EventNames.FormValid).length).toBe(1);
                });
            });

            describe('when `isFormValid` is false', () => {
                beforeEach(() => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    wrapper = mount(CheckoutForm, {
                        store: createStore(),
                        i18n,
                        localVue,
                        propsData,
                        mocks: { $v }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `scrollToFirstInlineError` and emit `FormInvalid` event', () => {
                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(scrollToFirstInlineErrorSpy).toHaveBeenCalled();
                    expect(wrapper.emitted(EventNames.FormInvalid).length).toBe(1);
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

                const wrapper = mount(CheckoutForm, {
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

                const wrapper = mount(CheckoutForm, {
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
    });
});
