import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import { PROP_VALIDATION_MESSAGES } from '../../constants';
import {
    formData, $v, phoneNumberData, postcodeData, firstNameData
} from './helpers';
import VForm from '../Form.vue';

describe('Form', () => {
    let propsData;

    beforeEach(() => {
        propsData = { formData };
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(VForm, { propsData });

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
                shallowMount(VForm, { propsData: { formData: {} } });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.requiredFormFields);
        });

        it('should throw an error when `formFields` property is not an `Array`', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, { propsData: { formData: { formFields: {} } } });
            })
                .toThrowError(PROP_VALIDATION_MESSAGES.invalidFormFields);
        });

        it('should throw an error when field in `formFields` does not have `name` property', () => {
            // Act & Assert
            expect(() => {
                shallowMount(VForm, {
                    propsData: {
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
                    propsData: {
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
                    propsData: {
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
        const wrapper = shallowMount(VForm, { propsData });

        // Act
        const forms = wrapper.findAll('form');

        // Assert
        expect(forms.length).toBe(1);
        expect(forms.wrappers[0].attributes('method')).toBe('post');
    });

    describe('computed :: ', () => {
        describe('formFields :: ', () => {
            it('should return an object of `formData` keys and field values', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, { propsData });
                const result = wrapper.vm.formFields;

                // Assert
                expect(result).toMatchSnapshot();
            });
        });
    });

    describe('methods :: ', () => {
        describe('updateField :: ', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(VForm, { propsData });
                const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(emitSpy).toHaveBeenCalledWith('updated', payload);
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
                    propsData,
                    mocks: { $v }
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

            xdescribe('when `isFormValid` is false', () => {
                beforeEach(() => {
                    // Arrange
                    isFormValidSpy.mockReturnValue(false);

                    wrapper = shallowMount(VForm, {
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

                const wrapper = shallowMount(VForm, { propsData });

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
                const wrapper = shallowMount(VForm, { propsData });

                // Act
                wrapper.vm.isValidPostcode();

                // Assert
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(postcodeData.value, 'en-GB');
            });
        });

        describe('translations ::', () => {
            it('should return translations for passed field', () => {
                // Arrange
                const wrapper = shallowMount(VForm, { propsData });

                // Act
                const result = wrapper.vm.translations('firstName');

                // Assert
                expect(result).toEqual(firstNameData.translations);
            });
        });

        describe('hasValidationMessages ::', () => {
            it('should return true if passed field has `validationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, { propsData });

                // Assert
                expect(wrapper.vm.hasValidationMessages('firstName')).toBeTruthy();
            });

            it('should return false if passed field does not have `validationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, { propsData });

                // Assert
                expect(wrapper.vm.hasValidationMessages('lastName')).toBeFalsy();
            });
        });

        describe('hasInvalidErrorMessage ::', () => {
            it('should return true if passed field has `invalidValidationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, { propsData });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage('email')).toBeTruthy();
            });

            it('should return false if passed field does not have `invalidValidationMessages`', () => {
                // Arrange & Act
                const wrapper = shallowMount(VForm, { propsData });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage('lastName')).toBeFalsy();
            });
        });
    });
});
