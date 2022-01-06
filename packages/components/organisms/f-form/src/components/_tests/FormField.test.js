import { shallowMount } from '@vue/test-utils';
import { firstNameData, $v } from './helpers';
import FormField from '../FormField.vue';

describe('FormField', () => {
    const propsData = {
        fieldData: firstNameData
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(FormField, {
            propsData,
            provide: () => ({
                $v
            })
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('kebabCase ::', () => {
            it.each([
                ['firstName', 'first-name'],
                ['line1', 'line-1'],
                ['city', 'city']
            ])('should convert `fieldName` value to kebab case', (fieldName, expected) => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        fieldData: {
                            name: fieldName
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.kebabCase).toEqual(expected);
            });
        });

        describe('translations ::', () => {
            it('should return translations from with id names', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.translations).toMatchSnapshot();
            });
        });

        describe('fieldProps ::', () => {
            it('should return field props', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.fieldProps).toMatchSnapshot();
            });

            describe('when field has error ::', () => {
                it('should return field props with error props', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(FormField, {
                        computed: {
                            hasError: () => true
                        },
                        propsData,
                        provide: () => ({
                            $v
                        })
                    });

                    // Assert
                    expect(wrapper.vm.fieldProps).toMatchSnapshot();
                });
            });
        });

        describe('inputType ::', () => {
            it.each([
                ['tel', 'mobileNumber'],
                ['email', 'email'],
                ['text', 'firstName']
            ])('should return %s when field name is %s', (expected, name) => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        fieldData: {
                            ...firstNameData,
                            name
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.inputType).toEqual(expected);
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
                jest.spyOn(FormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(FormField, {
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
                jest.spyOn(FormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages).toEqual(true);
            });
        });

        describe('hasInvalidErrorMessage ::', () => {
            const translations = {};
            const validationMessages = {
                invalid: 'Invalid message'
            };

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should return false if `translations` do not have an `invalid` `validationMessages', () => {
                // Arrange & Act
                jest.spyOn(FormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage).toEqual(false);
            });

            it('should return false if `translations` returns an `invalid` `validationMessages', () => {
                // Arrange & Act
                translations.validationMessages = validationMessages;
                jest.spyOn(FormField.computed, 'translations').mockReturnValue(translations);

                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage).toEqual(true);
            });
        });

        describe('hasError ::', () => {
            let hasValidationMessagesSpy;

            beforeEach(() => {
                hasValidationMessagesSpy = jest.spyOn(FormField.computed, 'hasValidationMessages');
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
                    jest.spyOn(FormField.computed, 'hasRequiredError').mockReturnValue(hasRequiredError);
                    jest.spyOn(FormField.computed, 'hasInvalidError').mockReturnValue(hasInvalidError);

                    wrapper = shallowMount(FormField, {
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

                    const wrapper = shallowMount(FormField, {
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

        describe('isEmpty ::', () => {
            it.each([
                [true, true],
                [false, false]
            ])('should return %s when `validatons.$dirty` is %s', (expected, $dirty) => {
                // Arrange && Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    computed: {
                        validations: () => ({ $dirty })
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.isEmpty).toEqual(expected);
            });
        });

        describe('validations ::', () => {
            it('should return fields validations', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                const fieldName = propsData.fieldData.name;

                // Assert
                expect(wrapper.vm.validations).toEqual($v.formFields[fieldName]);
            });
        });

        describe('hasRequiredError ::', () => {
            it.each([
                [true, true, false],
                [false, true, true],
                [false, false, false],
                [false, true, true]
            ])('should return %s when `isEmpty` is %s and required validation is %s', (expected, isEmpty, required) => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    computed: {
                        isEmpty: () => isEmpty,
                        validations: () => ({ required })
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasRequiredError).toEqual(expected);
            });
        });

        describe('hasInvalidError ::', () => {
            it.each([
                [true, true, true, false],
                [false, true, true, true],
                [false, true, false, false],
                [false, true, false, true],
                [false, false, true, false],
                [false, false, true, true],
                [false, false, false, false],
                [false, false, false, true]
            ])('should return %s when `hasInvalidErrorMessage` is %s, `isEmpty` is %s and field validation is %s', (expected, hasInvalidErrorMessage, isEmpty, fieldValidation) => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...propsData.fieldData,
                            name: 'email'
                        }
                    },
                    computed: {
                        hasInvalidErrorMessage: () => hasInvalidErrorMessage,
                        isEmpty: () => isEmpty,
                        validations: () => ({ email: fieldValidation })
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasInvalidError).toEqual(expected);
            });
        });

        describe('errorType ::', () => {
            it.each([
                [false, true, null],
                [false, false, null],
                [true, false, 'invalid'],
                [true, true, 'required']
            ])('when `hasError` is %s and `hasRequiredError` is %s, should return %s', (hasError, hasRequiredError, expected) => {
                // Arrange && Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    computed: {
                        hasError: () => hasError,
                        hasRequiredError: () => hasRequiredError
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.errorType).toEqual(expected);
            });
        });

        describe('ariaLabel ::', () => {
            it.each([
                ['+ 4 4 7 1 1 1 1 1 1 1 1 1', '+447111111111'],
                [null, ''],
                [null, null]
            ])('should return %s if mobile vaule is %s', (expected, value) => {
                // Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...propsData.fieldData,
                            value,
                            name: 'mobileNumber'
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.ariaLabel).toEqual(expected);
            });
        });
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('updateField ::', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(wrapper.emitted('updated').length).toBe(1);
                expect(wrapper.emitted('updated')[0][0]).toEqual(payload);
            });
        });

        describe('formFieldBlur ::', () => {
            it('should call `touch` for validation', () => {
                // Arrange
                const wrapper = shallowMount(FormField, {
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Act
                wrapper.vm.formFieldBlur();

                // Assert
                expect($v.formFields.firstName.$touch).toHaveBeenCalled();
            });
        });
    });
});
