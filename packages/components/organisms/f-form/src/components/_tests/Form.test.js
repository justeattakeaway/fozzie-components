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

        xit('should throw an error when `formFields` property is missing from `formData`', () => {
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

            xdescribe('when `$v.$invalid` is false', () => {
                const validationState = {
                    validFields: [
                        'formFields.firstName',
                        'formFields.email',
                        'formFields.mobileNumber',
                        'formFields.postcode'
                    ],
                    invalidFields: []
                };

                // let scrollToFirstInlineErrorSpy;

                beforeEach(() => {
                    // Arrange
                    jest.spyOn(validations, 'getFormValidationState').mockReturnValue(validationState);
                    // scrollToFirstInlineErrorSpy = jest.spyOn(VForm.methods, 'scrollToFirstInlineError');

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
                    // expect(scrollToFirstInlineErrorSpy).toHaveBeenCalled();
                    expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.invalid, validationState);
                });
            });
        });
    });
});
