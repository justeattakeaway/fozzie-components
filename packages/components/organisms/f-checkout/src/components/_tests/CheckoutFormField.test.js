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
    [VALIDATIONS.guest]: {
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

const $t = jest.fn();

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
            ])('should call `isFieldEmpty` with %s and %s', fieldName => {
                // Act
                shallowMount(CheckoutFormField, {
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
                expect(isFieldEmptySpy).toHaveBeenCalledWith(VALIDATIONS.guest, fieldName);
            });
        });

        describe('isValid ::', () => {
            afterEach(() => {
                jest.restoreAllMocks();
            });

            describe('when `hasErrorType` returns `false`', () => {
                let wrapper;

                beforeEach(() => {
                    // Arrange & Act
                    wrapper = shallowMount(CheckoutFormField, {
                        i18n,
                        store: createStore(),
                        localVue,
                        propsData,
                        provide: () => ({
                            $v
                        })
                    });

                    jest.spyOn(wrapper.vm, 'hasErrorType').mockReturnValue(false);
                });

                afterEach(() => {
                    jest.restoreAllMocks();
                });

                it('should return true', () => {
                    // Assert
                    expect(wrapper.vm.isValid).toEqual(true);
                });
            });

            describe('when `hasErrorType` is `true`', () => {
                describe('AND `isEmpty` is `true`', () => {
                    beforeEach(() => {
                        // Arrange
                        jest.spyOn(CheckoutFormField.methods, 'hasErrorType').mockImplementation(() => true);
                    });

                    afterEach(() => {
                        jest.restoreAllMocks();
                    });

                    it('should return `false`', () => {
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

                describe('AND `isEmpty` is `false`', () => {
                    describe.each([
                        [true, true, true],
                        [false, true, true],
                        [false, false, true],
                        [true, false, false]
                    ])('AND `$dirty` is `%s`, field validation is `%s`', ($dirty, isValid, expected) => {
                        let wrapper;

                        beforeEach(() => {
                            // Arrange & Act
                            $v[VALIDATIONS.guest].email = {
                                $touch: jest.fn(),
                                $dirty,
                                email: isValid
                            };

                            wrapper = shallowMount(CheckoutFormField, {
                                i18n,
                                store: createStore(),
                                localVue,
                                propsData: {
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
                            jest.restoreAllMocks();
                        });

                        it('should return `%s`', () => {
                            // Assert
                            expect(wrapper.vm.isValid).toEqual(expected);
                        });
                    });
                });
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
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('formFieldBlur ::', () => {
            describe('when `shouldValidateOnBlur` is `true` AND field has validations', () => {
                let touchSpy;

                beforeEach(() => {
                    touchSpy = jest.spyOn($v[VALIDATIONS.guest].email, '$touch');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `touch` for validation', () => {
                    // Arrange
                    const fieldName = 'email';

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

        describe('hasErrorType ::', () => {
            const invalidErrorType = 'invalid';
            const requiredErrorType = 'required';

            const fieldWithRequiredError = 'firstName';
            const fieldWithInvalidError = 'lastName';

            const translations = {
                formFields: {
                    guest: {
                        [fieldWithRequiredError]: {
                            label: 'First Name',
                            validationMessages: {
                                required: 'Has required error'
                            }
                        },
                        [fieldWithInvalidError]: {
                            label: 'Last Name',
                            validationMessages: {
                                invalid: 'Has invalid error'
                            }
                        }
                    }
                }
            };

            afterEach(() => {
                jest.clearAllMocks();
            });

            it.each([
                [true, fieldWithRequiredError, requiredErrorType],
                [false, fieldWithRequiredError, invalidErrorType],
                [false, fieldWithInvalidError, requiredErrorType],
                [true, fieldWithInvalidError, invalidErrorType]
            ])('should return `%s` when `hasErrorType` `fieldName` is %s and `errorType` is %s', (expected, fieldName, errorType) => {
                // Arrange
                $t.mockReturnValue(translations.formFields.guest[fieldName]);

                const wrapper = shallowMount(CheckoutFormField, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData: {
                        fieldName
                    },
                    provide: () => ({
                        $v
                    }),
                    mocks: {
                        $t
                    }
                });

                // Act
                const received = wrapper.vm.hasErrorType(errorType);

                // Assert
                expect(received).toEqual(expected);
            });
        });
    });
});
