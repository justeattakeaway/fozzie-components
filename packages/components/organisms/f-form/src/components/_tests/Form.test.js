import { shallowMount } from '@vue/test-utils';
import {
    localVue,
    i18n,
    $v,
    FormFieldErrorMock,
    FormFieldMock
} from './helpers';
import {
    fieldWithRequiredValidations,
    fieldWithoutValidations
} from '../../../stories/helpers';
import FormValidationMixin from '../../mixin/formValidation.mixin';
import { FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../../constants';
import VForm from '../Form.vue';
import { FormFieldClass, FormFieldErrorClass } from '../../services/formField';

jest.mock('../../services/formField');

FormFieldClass.mockImplementation(() => (FormFieldMock));
FormFieldErrorClass.mockImplementation(() => (FormFieldErrorMock));

describe('Form', () => {
    let propsData;

    beforeEach(() => {
        propsData = {
            formData: {
                formFields: [fieldWithRequiredValidations]
            },
            locale: 'en-GB'
        };
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

    it('should have a form with method "post"', () => {
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
                // Arrange
                const wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                const result = wrapper.vm.formFields;

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('formFieldData :: ', () => {
            let wrapper;
            let createFieldSpy;
            let result;

            beforeEach(() => {
                // Arrange
                createFieldSpy = jest.spyOn(VForm.methods, 'createField');
                wrapper = shallowMount(VForm, {
                    i18n,
                    localVue,
                    propsData
                });

                // Act
                result = wrapper.vm.formFieldData;
            });

            it('should create an array of formFields with additional fieldData', () => {
                // Assert
                expect(result).toMatchSnapshot();
            });

            it('should call `createField` with field', () => {
                // Assert
                expect(createFieldSpy).toHaveBeenCalledWith(fieldWithRequiredValidations);
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
                const payload = { name: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.fieldUpdated, payload);
            });
        });

        describe('createField :: ', () => {
            let fieldStatusSpy;

            beforeEach(() => {
                fieldStatusSpy = jest.spyOn(FormValidationMixin.methods, 'fieldStatus');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when field has validationMessages', () => {
                it('should call `fieldStatus` with fieldName', () => {
                    // Arrange
                    const wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData
                    });

                    // Act
                    wrapper.vm.createField(fieldWithRequiredValidations);

                    // Assert
                    expect(fieldStatusSpy).toHaveBeenCalledWith(fieldWithRequiredValidations.name);
                });

                describe('when field has an error', () => {
                    const errorType = 'required';

                    beforeEach(() => {
                        fieldStatusSpy.mockReturnValue(errorType);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should create fieldData calling `FormFieldErrorClass` with field and error', () => {
                        // Arrange
                        const wrapper = shallowMount(VForm, {
                            i18n,
                            localVue,
                            propsData
                        });

                        // Act
                        const fieldData = wrapper.vm.createField(fieldWithRequiredValidations);

                        // Assert
                        expect(FormFieldErrorClass).toHaveBeenCalledWith(fieldWithRequiredValidations, errorType);
                        expect(fieldData).toEqual(FormFieldErrorMock);
                    });
                });

                describe('when field does not have an error', () => {
                    beforeEach(() => {
                        fieldStatusSpy.mockReturnValue(false);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should create fieldData calling `FormFieldClass` with field', () => {
                        // Arrange
                        const wrapper = shallowMount(VForm, {
                            i18n,
                            localVue,
                            propsData
                        });

                        // Act
                        const fieldData = wrapper.vm.createField(fieldWithRequiredValidations);

                        // Assert
                        expect(FormFieldClass).toHaveBeenCalledWith(fieldWithRequiredValidations);
                        expect(fieldData).toEqual(FormFieldMock);
                    });
                });

                describe('when field has Error', () => {
                    const errorType = 'required';

                    beforeEach(() => {
                        fieldStatusSpy.mockReturnValue(errorType);
                    });

                    afterEach(() => {
                        jest.clearAllMocks();
                    });

                    it('should create fieldData with `FormFieldErrorClass` with field and error', () => {
                        // Arrange
                        const wrapper = shallowMount(VForm, {
                            i18n,
                            localVue,
                            propsData
                        });

                        // Act
                        const result = wrapper.vm.createField(fieldWithRequiredValidations);

                        // Assert
                        expect(FormFieldErrorClass).toHaveBeenCalledWith(fieldWithRequiredValidations, errorType);
                        expect(result).toEqual(FormFieldErrorMock);
                    });
                });
            });

            describe('when field does not have validationMessages', () => {
                it('should not call `fieldStatus`', () => {
                    // Arrange
                    const wrapper = shallowMount(VForm, {
                        i18n,
                        localVue,
                        propsData: {
                            ...propsData,
                            formData: {
                                formFields: [fieldWithoutValidations]
                            }
                        }
                    });

                    // Act
                    wrapper.vm.createField(fieldWithoutValidations);

                    // Assert
                    expect(fieldStatusSpy).not.toHaveBeenCalledWith(fieldWithoutValidations.name);
                });
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
                        firstName: 'John'
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

                beforeEach(() => {
                    // Arrange
                    jest.spyOn(FormValidationMixin.computed, 'validationState').mockReturnValue(validationState);

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

                it('should emit `FormInvalid` with validation state', () => {
                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.invalid, validationState);
                });
            });
        });
    });
});
