import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutFormField from '../CheckoutFormField.vue';
import { i18n, createStore } from './helpers/setup';
import checkoutValidationsMixin from '../../mixins/validations.mixin';
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
    // [VALIDATIONS.address]: {
    //     line1: {
    //         $dirty: false
    //     },
    //     line2: {
    //         $dirty: false
    //     },
    //     email: {
    //         $dirty: false,
    //         email: false,
    //         $touch: jest.fn()
    //     },
    //     locality: {
    //         $dirty: false
    //     },
    //     postcode: {
    //         $dirty: false,
    //         postcode: false
    //     }
    // }
};

describe('CheckoutFormField', () => {
    const propsData = {
        fieldName: 'firstName',
        fieldType: 'customer'
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

        describe('isEmpty ::', () => {
            let isFieldEmptySpy;

            beforeEach(() => {
                // Arrange
                isFieldEmptySpy = jest.spyOn(checkoutValidationsMixin.methods, 'isFieldEmpty');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it.each([
                ['firstName'],
                ['lastName'],
                ['email']
            ])('should call `isFieldEmpty` with validation type and fieldName AND should be false by default', fieldName => {
                // Arrange
                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData: {
                        ...propsData,
                        fieldName
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Act
                const { isEmpty } = wrapper.vm;

                // Assert
                expect(isEmpty).toBeFalsy();
                expect(isFieldEmptySpy).toHaveBeenCalledWith(VALIDATIONS.customer, fieldName);
            });
        });

        describe('isValid ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `hasErrorType` returns false', () => {
                it('should return true', () => {
                    // Arrange
                    jest.spyOn(CheckoutFormField.methods, 'hasErrorType').mockReturnValue(false);

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
                    expect(wrapper.vm.isValid).toEqual(true);
                });
            });

            describe('when `hasErrorType` is true', () => {
                describe('AND `isEmpty` is true', () => {
                    it('should return false', () => {
                        // Arrange
                        jest.spyOn(CheckoutFormField.methods, 'hasErrorType').mockImplementation(() => true);

                        // Act
                        const wrapper = shallowMount(CheckoutFormField, {
                            i18n,
                            store: createStore(),
                            localVue,
                            propsData,
                            provide: () => ({
                                $v
                            }),
                            computed: {
                                isEmpty () {
                                    return true;
                                }
                            }
                        });

                        // Assert
                        expect(wrapper.vm.isValid).toEqual(false);
                    });
                });

                describe('AND `isEmpty` is false', () => {
                    describe.each([
                        [true, true, true],
                        [false, true, true],
                        [false, false, true],
                        [true, false, false]
                    ])('AND `$dirty` is %s, field validation is %s', ($dirty, isValid, expected) => {
                        let wrapper;

                        beforeEach(() => {
                            // Arrange & Act
                            $v[VALIDATIONS.customer].email = {
                                $touch: jest.fn(),
                                $dirty,
                                email: isValid
                            };

                            wrapper = shallowMount(CheckoutFormField, {
                                i18n,
                                store: createStore(),
                                localVue,
                                propsData: {
                                    ...propsData,
                                    fieldName: 'email'
                                },
                                provide: () => ({
                                    $v
                                }),
                                computed: {
                                    isEmpty () {
                                        return false;
                                    }
                                }
                            });

                            jest.spyOn(wrapper.vm, 'hasErrorType').mockReturnValue(true);
                        });

                        afterEach(() => {
                            jest.clearAllMocks();
                        });

                        it('should return %s', () => {
                            // Assert
                            expect(wrapper.vm.isValid).toEqual(expected);
                        });
                    });
                });
            });
        });

        describe('hasError ::', () => {
            afterEach(() => {
                jest.restoreAllMocks();
            });

            describe('when `hasValidationMessages` is true', () => {
                let wrapper;

                beforeEach(() => {
                    jest.spyOn(CheckoutFormField.computed, 'hasValidationMessages').mockReturnValue(true);
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it.each([
                    [true, true, true],
                    [true, true, false],
                    [false, false, true],
                    [true, false, false]
                ])('should return %s when `isEmpty` is %s and `isValid` is %s', (expected, isEmpty, isValid) => {
                    // Arrange & Act
                    jest.spyOn(CheckoutFormField.computed, 'isEmpty').mockReturnValue(isEmpty);
                    jest.spyOn(CheckoutFormField.computed, 'isValid').mockReturnValue(isValid);

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
                    jest.spyOn(CheckoutFormField.computed, 'hasValidationMessages').mockReturnValue(false);

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
                        ...propsData,
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
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('formFieldBlur ::', () => {
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

        describe('hasErrorType ::', () => {
            const invalidErrorType = 'invalid';
            const requiredErrorType = 'required';

            const fieldHasRequiredMessage = 'firstName';
            const fieldHasInvalidMessage = 'lastName';

            const translations = {
                [fieldHasRequiredMessage]: {
                    label: 'First Name',
                    validationMessages: {
                        required: 'Has required error'
                    },
                    type: 'has required message but does not have invalid message'
                },
                [fieldHasInvalidMessage]: {
                    label: 'Last Name',
                    validationMessages: {
                        invalid: 'Has invalid error'
                    },
                    type: 'has invalid message but does not have required message'
                }
            };
            describe('when `hasValidationMessages` is true ', () => {
                beforeEach(() => {
                    jest.spyOn(CheckoutFormField.computed, 'hasValidationMessages').mockReturnValue(true);
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                describe('when field has `required` message but does not have `invalid` message', () => {
                    beforeEach(() => {
                        jest.spyOn(CheckoutFormField.computed, 'translations').mockReturnValue(translations[fieldHasRequiredMessage]);
                    });

                    it.each([
                        [true, requiredErrorType],
                        [false, invalidErrorType]
                    ])('should return %s when `errorType` is %s', (expected, errorType) => {
                        // Arrange & Act
                        const wrapper = shallowMount(CheckoutFormField, {
                            i18n,
                            store: createStore(),
                            localVue,
                            propsData: {
                                ...propsData,
                                fieldName: fieldHasRequiredMessage
                            },
                            provide: () => ({
                                $v
                            })
                        });

                        // Assert
                        expect(wrapper.vm.hasErrorType(errorType)).toEqual(expected);
                    });
                });

                describe('when field has `invalid` message but does not have `required` message', () => {
                    beforeEach(() => {
                        jest.spyOn(CheckoutFormField.computed, 'translations').mockReturnValue(translations[fieldHasInvalidMessage]);
                    });

                    it.each([
                        [false, requiredErrorType],
                        [true, invalidErrorType]
                    ])('should return %s when `errorType` is %s', (expected, errorType) => {
                        // Arrange & Act
                        const wrapper = shallowMount(CheckoutFormField, {
                            i18n,
                            store: createStore(),
                            localVue,
                            propsData: {
                                ...propsData,
                                fieldName: fieldHasInvalidMessage
                            },
                            provide: () => ({
                                $v
                            })
                        });

                        // Assert
                        expect(wrapper.vm.hasErrorType(errorType)).toEqual(expected);
                    });
                });
            });

            describe('when `hasValidationMessages` is false ', () => {
                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should return false', () => {
                    // Arrange
                    jest.spyOn(CheckoutFormField.computed, 'hasValidationMessages').mockReturnValue(false);

                    // Act
                    const wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData: {
                            ...propsData,
                            fieldName: fieldHasInvalidMessage
                        },
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.hasErrorType()).toEqual(false);
                });
            });
        });
    });
});
