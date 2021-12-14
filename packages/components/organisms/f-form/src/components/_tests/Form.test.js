import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import { PROP_VALIDATION_MESSAGES } from '../../constants';
import {
    formData,
    $v
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

        describe('onFormSubmit :: ', () => {
            it('should emit `form-submitting`', () => {
                // Arrange
                const wrapper = shallowMount(VForm, { propsData });

                // Act
                wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted('form-submitting').length).toBe(1);
            });
        });
    });
});
