import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import {
    localVue,
    i18n,
    $v
} from './helpers';
import {
    formData,
    firstNameData,
    phoneNumberData,
    postcodeData
} from '../../../stories/helpers';

import { FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../../constants';
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

    it('should have one form with method "post"', () => {
        // Arrange
        const wrapper = shallowMount(VForm, {
            i18n,
            localVue,
            propsData
        });

        // Act
        const form = wrapper.find('form');

        // Assert
        expect(form.attributes('method')).toBe('post');
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

            afterEach(() => {
                jest.clearAllMocks();
                jest.restoreAllMocks();
            });

            it('should return `null` if no fields have been touched', () => {
                // Arrange & Act
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v: {
                            ...$v,
                            dirty: false
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
            });

            it('should return `null` if all fields have been touched and are valid', () => {
                // Arrange
                const mockValidationState = {
                    invalidFields: []
                };

                jest.spyOn(validations, 'getFormValidationState').mockReturnValue(mockValidationState);

                // Act
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $v: {
                            ...$v,
                            dirty: true
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
            });
        });
    });

    describe('methods :: ', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('updateField :: ', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.fieldUpdated, payload);
            });
        });

        describe('isFormValid ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

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
            let wrapper;
            let emitSpy;

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should emit with `FormSubmitting` event', () => {
                // Arrange
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                emitSpy = jest.spyOn(wrapper.vm, '$emit');

                // Act
                wrapper.vm.onFormSubmit();

                // Assert
                expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.submitting);
            });

            describe('when `$v.$invalid` is false', () => {
                beforeEach(() => {
                    // Arrange
                    wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v: {
                                ...$v,
                                $invalid: false
                            }
                        }
                    });

                    emitSpy = jest.spyOn(wrapper.vm, '$emit');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should emit `FormValid` event with valid fields', () => {
                    // Arrange
                    const expected = {
                        email: 'John.Johnson@gmail.com',
                        firstName: 'John',
                        lastName: 'Johnson',
                        mobileNumber: '07111111111',
                        postcode: 'EC1A1BB'
                    };

                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.valid, expected);
                });
            });

            describe('when `$v.$invalid` is false', () => {
                const validationState = {
                    validFields: [
                        'formFields.firstName',
                        'formFields.email',
                        'formFields.mobileNumber',
                        'formFields.postcode'
                    ],
                    invalidFields: []
                };

                let scrollToFirstInlineErrorSpy;

                beforeEach(() => {
                    // Arrange
                    jest.spyOn(validations, 'getFormValidationState').mockReturnValue(validationState);
                    scrollToFirstInlineErrorSpy = jest.spyOn(VForm.methods, 'scrollToFirstInlineError');

                    wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData,
                        mocks: {
                            $v: {
                                ...$v,
                                $invalid: true
                            }
                        }
                    });

                    emitSpy = jest.spyOn(wrapper.vm, '$emit');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `scrollToFirstInlineError` and emit `FormInvalid` with validation state', () => {
                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(scrollToFirstInlineErrorSpy).toHaveBeenCalled();
                    expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.invalid, validationState);
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
            it.each([
                [true, { validationMessages: { required: 'Enter phone Number' } }],
                [false, null]
            ])('should return %s if passed field `validationMessages` are %s', (expected, validationMessages) => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData: {
                        ...propsData,
                        formData: {
                            formFields: [
                                {
                                    name: 'firstName',
                                    value: '',
                                    translations: {
                                        label: 'First Name',
                                        ...validationMessages
                                    }
                                }
                            ]
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages('firstName')).toBe(expected);
            });
        });

        describe('hasInvalidErrorMessage ::', () => {
            it.each([
                [true, 'Invalid Error Message'],
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
