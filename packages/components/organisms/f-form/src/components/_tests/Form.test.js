import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import { PROP_VALIDATION_MESSAGES } from '../../constants';
import {
    localVue,
    i18n,
    formData,
    $v,
    phoneNumberData,
    postcodeData,
    firstNameData
} from './helpers';
import VForm from '../Form.vue';

describe('Form', () => {
    let propsData;

    beforeEach(() => {
        propsData = { formData, locale: 'en-GB' };
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(VForm, {
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('when `formData` prop is incorrect', () => {
        let spy;

        beforeEach(() => {
            spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            spy.mockRestore();
        });

        it('should throw an error when `formFields` property is missing from `formData`', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: { ...propsData, formData: {} }
                });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.requiredFormFields);
        });

        it('should throw an error when `formFields` property is not an `Array`', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: { ...propsData, formData: { formFields: {} } }
                });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.invalidFormFields);
        });

        it('should throw an error when field in `formFields` does not have `name` property', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: {
                        ...propsData,
                        formData: {
                            formFields: [{
                                value: '',
                                translations: {
                                    label: 'Label Text'
                                }
                            }]
                        }
                    }
                });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.requiredNameProperty);
        });

        it('should throw an error when field in `formFields` does not have `translations` property', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: {
                        ...propsData,
                        formData: {
                            formFields: [{
                                name: 'fieldName',
                                value: ''
                            }]
                        }
                    }
                });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.requiredTranslationsProperty);
        });

        it('should throw an error when field in `formFields` does not have `translations.label` property', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: {
                        ...propsData,
                        formData: {
                            formFields: [{
                                name: 'fieldName',
                                value: '',
                                translations: {}
                            }]
                        }
                    }
                });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.requiredLabelProperty);
        });
    });

    it('should have one form with method "post"', () => {
        // Arrange
        const wrapper = shallowMount(VForm, {
            i18n,
            localVue,
            propsData
        });

        // Act
        const forms = wrapper.findAll('form');

        // Assert
        expect(forms.wrappers[0].attributes('method')).toBe('post');
    });

    describe('computed :: ', () => {
        describe('formFields :: ', () => {
            it('should return an object of `formData` keys and field values', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });
                const result = wrapper.vm.formFields;

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('invalidFieldsSummary ::', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = shallowMount(VForm, {
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
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });


                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
            });
        });
    });

    describe('methods :: ', () => {
        describe('updateField :: ', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(wrapper.emitted('updated').length).toBe(1);
                expect(wrapper.emitted('updated')[0][0]).toEqual(payload);
            });
        });

        describe('isFormValid ::', () => {
            it('should call `.touch()` ', () => {
                // Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData,
                    mocks: { $v }
                });

                wrapper.vm.isFormValid();

                // Assert
                expect($v.$touch).toBeCalled();
            });

            it.each([
                [true, false],
                [false, true]
            ])('should return %s if `$v.invalid` is $s', (expected, $invalid) => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v: {
                            ...$v,
                            $invalid
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.isFormValid()).toBe(expected);
            });
        });

        describe('onFormSubmit ::', () => {
            let isFormValidSpy;
            let scrollToFirstInlineErrorSpy;
            let wrapper;
            let emitSpy;

            beforeEach(() => {
                isFormValidSpy = jest.spyOn(VForm.methods, 'isFormValid');
                scrollToFirstInlineErrorSpy = jest.spyOn(VForm.methods, 'scrollToFirstInlineError');

                // Arrange
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v
                    }
                });

                emitSpy = jest.spyOn(wrapper.vm, '$emit');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should emit with `FormSubmitting` event', () => {
                // Act
                wrapper.vm.onFormSubmit();

                // Assert
                expect(emitSpy).toHaveBeenCalledWith('form-submitting');
            });

            describe('when `isFormValid` is true', () => {
                beforeEach(() => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(true);

                    wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should emit `FormValid` event with valid fields', () => {
                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.emitted('form-valid').length).toBe(1);
                    expect(wrapper.emitted('form-valid')[0][0]).toMatchSnapshot();
                });
            });

            describe('when `isFormValid` is false', () => {
                beforeEach(() => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData
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
                    expect(wrapper.emitted('form-invalid').length).toBe(1);
                    expect(wrapper.emitted('form-invalid')[0][0]).toMatchSnapshot();
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

                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.isValidPhoneNumber();

                // Assert
                expect(isValidPhoneNumberSpy).toHaveBeenCalledWith(phoneNumberData.value, 'en-GB');
            });
        });

        describe('isValidPostcode ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPostcode` from `f-services`', () => {
                // Arrange
                const isValidPostcodeSpy = jest.spyOn(validations, 'isValidPostcode');
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                wrapper.vm.isValidPostcode();

                // Assert
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(postcodeData.value, 'en-GB');
            });
        });

        describe('translations ::', () => {
            it('should return translations for passed field', () => {
                // Arrange
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.translations('firstName');

                // Assert
                expect(result).toEqual(firstNameData.translations);
            });
        });

        describe('hasValidationMessages ::', () => {
            it('should return true if passed field has `validationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages('firstName')).toBeTruthy();
            });

            it('should return false if passed field does not have `validationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages('lastName')).toBeFalsy();
            });
        });

        describe('hasInvalidErrorMessage ::', () => {
            it.each([
                [true, 'Invalid ErrorMessage'],
                [false, null]
            ])('should return %s if passed field has invalid is %s', (expected, invalidMessage) => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: {
                        ...propsData,
                        formData: {
                            formFields: [
                                {
                                    ...phoneNumberData,
                                    translations: {
                                        ...phoneNumberData.translations,
                                        validationMessages: {
                                            ...phoneNumberData.translations.validationMessages,
                                            invalid: invalidMessage
                                        }
                                    }
                                }
                            ]
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage('mobileNumber')).toBe(expected);
            });
        });
    });
});
