import { shallowMount } from '@vue/test-utils';
import { $v } from './helpers';
import { firstNameData } from '../../../stories/helpers';
import FormField from '../FormField.vue';
import { FORM_EVENTS } from '../../constants';

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
            it('should return translations for form field', () => {
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
            it('should return false if field does not have `validationMessages', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...firstNameData,
                            translations: {
                                label: 'First Name'
                            }
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages).toEqual(false);
            });

            it('should return true if field has `validationMessages', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...firstNameData,
                            translations: {
                                label: 'First Name',
                                validationMessages: {
                                    required: 'Enter First Name'
                                }
                            }
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasValidationMessages).toEqual(true);
            });
        });

        describe('hasInvalidErrorMessage ::', () => {
            it('should return false if field do not have an `invalid` `validationMessages', () => {
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...firstNameData,
                            translations: {
                                label: 'FirstName'
                            }
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage).toEqual(false);
            });

            it('should return false if field has an `invalid` `validationMessages', () => {
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        ...propsData,
                        fieldData: {
                            ...firstNameData,
                            translations: {
                                label: 'FirstName',
                                validationMessages: {
                                    invalid: 'Enter First Name'
                                }
                            }
                        }
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.hasInvalidErrorMessage).toEqual(true);
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

                const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(emitSpy).toHaveBeenCalledWith(FORM_EVENTS.fieldUpdated, payload);
            });
        });
    });
});
