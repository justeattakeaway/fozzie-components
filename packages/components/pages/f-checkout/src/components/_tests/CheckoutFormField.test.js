import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutFormField from '../CheckoutFormField.vue';
import { i18n, createStore } from './helpers/setup';
import { VALIDATIONS } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const $v = {
    [VALIDATIONS.customer]: {
        firstName: {
            $dirty: false
        },
        lastName: {
            $dirty: false
        },
        email: {
            $dirty: false,
            email: false,
            $touch: jest.fn()
        }
    }
};

describe('CheckoutFormField', () => {
    const propsData = {
        fieldName: 'firstName'
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(CheckoutFormField, {
            i18n,
            store: createStore(),
            localVue,
            propsData,
            provide: () => ({
                $v
            })
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        describe('translations ::', () => {
            it('should return translations from with id names', () => {
                // Arrange & Act
                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.translations).toMatchSnapshot();
            });
        });

        describe('errorType ::', () => {
            let hasErrorSpy;
            let hasRequiredErrorSpy;

            beforeEach(() => {
                hasErrorSpy = jest.spyOn(CheckoutFormField.computed, 'hasError');
                hasRequiredErrorSpy = jest.spyOn(CheckoutFormField.computed, 'hasRequiredError');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it.each([
                [false, true, null],
                [false, false, null],
                [true, false, 'invalid'],
                [true, true, 'required']
            ])('when `hasError` is %s and `hasRequiredError` is %s, should return %s', (hasError, hasRequiredError, expected) => {
                // Arrange
                hasErrorSpy.mockReturnValue(hasError);
                hasRequiredErrorSpy.mockReturnValue(hasRequiredError);

                // Act
                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.errorType).toEqual(expected);
            });
        });

        describe('hasInvalidError ::', () => {
            let hasInvalidErrorMessageSpy;
            let isEmptySpy;
            let validationsSpy;

            beforeEach(() => {
                hasInvalidErrorMessageSpy = jest.spyOn(CheckoutFormField.computed, 'hasInvalidErrorMessage');
                isEmptySpy = jest.spyOn(CheckoutFormField.computed, 'isEmpty');
                validationsSpy = jest.spyOn(CheckoutFormField.computed, 'validations');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when validations for field invalid error is true ::', () => {
                beforeEach(() => {
                    validationsSpy.mockReturnValue({
                        email: {
                            email: true
                        }
                    });
                });

                it.each([
                    [true, true, false],
                    [true, false, false],
                    [false, true, false],
                    [false, false, false]
                ])('when `hasInvalidErrorMessage` is %s and `isEmpty` is %s should return %s', (hasInvalidErrorMessage, isEmpty, expected) => {
                    // Arrange
                    hasInvalidErrorMessageSpy.mockReturnValue(hasInvalidErrorMessage);
                    isEmptySpy.mockReturnValue(isEmpty);

                    // Act
                    const wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData: {
                            fieldName: 'email'
                        },
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.hasInvalidError).toEqual(expected);
                });
            });

            describe('when validations for field invalid error is false ::', () => {
                beforeEach(() => {
                    validationsSpy.mockReturnValue({
                        email: {
                            email: false
                        }
                    });
                });

                it('should return false', () => {
                    // Act
                    const wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData: {
                            fieldName: 'email'
                        },
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.hasInvalidError).toEqual(false);
                });
            });
        });

        describe('hasError ::', () => {
            let hasValidationMessagesSpy;

            beforeEach(() => {
                hasValidationMessagesSpy = jest.spyOn(CheckoutFormField.computed, 'hasValidationMessages');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            describe('when `hasValidationMessages` is true', () => {
                let wrapper;

                beforeEach(() => {
                    hasValidationMessagesSpy.mockReturnValue(true);
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it.each([
                    [true, true, true],
                    [true, false, true],
                    [true, true, false],
                    [false, false, false]
                ])('should return %s when `hasRequiredError` is %s and `hasInvalidError` is %s', (expected, hasRequiredError, hasInvalidError) => {
                    // Arrange & Act
                    jest.spyOn(CheckoutFormField.computed, 'hasRequiredError').mockReturnValue(hasRequiredError);
                    jest.spyOn(CheckoutFormField.computed, 'hasInvalidError').mockReturnValue(hasInvalidError);

                    wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData,
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.hasError).toEqual(expected);
                });
            });

            describe('when `hasValidationMessages` is false', () => {
                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should return false', () => {
                    // Arrange & Act
                    hasValidationMessagesSpy.mockReturnValue(false);

                    const wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData,
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.hasError).toEqual(false);
                });
            });
        });

        describe('hasValidationMessages ::', () => {
            const translations = {};
            const validationMessages = {
                invalid: 'Invalid message'
            };

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should return false if `translations` do not have `validationMessages', () => {
                // Arrange & Act
                jest.spyOn(CheckoutFormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages).toEqual(false);
            });

            it('should return false if `translations` do not have `validationMessages', () => {
                // Arrange & Act
                translations.validationMessages = validationMessages;
                jest.spyOn(CheckoutFormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages).toEqual(true);
            });
        });

        describe('kebabCase ::', () => {
            it.each([
                ['firstName', 'first-name'],
                ['lastName', 'last-name'],
                ['email', 'email']
            ])('should convert `fieldName` value to kebab case', (fieldName, expected) => {
                // Arrange & Act
                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData: {
                        fieldName
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.kebabCase).toEqual(expected);
            });
        });
    });

    describe('methods ::', () => {
        describe('formFieldBlur ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `touch` for validation', () => {
                // Arrange
                const fieldName = 'email';
                const touchSpy = jest.spyOn($v[VALIDATIONS.customer].email, '$touch');

                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData: {
                        ...propsData,
                        fieldName,
                        shouldValidateOnBlur: true
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Act
                wrapper.vm.formFieldBlur(fieldName);

                // Assert
                expect(touchSpy).toHaveBeenCalled();
            });
        });
    });
});
