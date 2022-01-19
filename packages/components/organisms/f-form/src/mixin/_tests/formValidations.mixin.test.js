import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import {
    localVue,
    i18n,
    $v
} from '../../components/_tests/helpers';
import {
    formData,
    fieldWithoutValidations,
    fieldWithBothValidations,
    phoneNumberData,
    postcodeData
} from '../../../stories/helpers';

import formValidations from '../formValidation.mixin';

describe('Form', () => {
    let baseComponent;

    beforeEach(() => {
        baseComponent = {
            render () {},
            data () {
                return {
                    formData,
                    locale: 'en-GB'
                };
            },
            mixins: [formValidations]
        };
    });

    describe('computed :: ', () => {
        describe('validationState ::', () => {
            const expectedState = {
                invalidFields: [],
                validFields: []
            };
            let getFormValidationStateSpy;

            beforeEach(() => {
                getFormValidationStateSpy = jest.spyOn(validations, 'getFormValidationState').mockReturnValue(expectedState);
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `getFormValidationState` with validations and return value', () => {
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
                    mocks: {
                        $v: {
                            ...$v,
                            dirty: false
                        }
                    }
                });

                // Act
                const { validationState } = wrapper.vm;

                // Assert
                expect(getFormValidationStateSpy).toHaveBeenCalledWith($v);
                expect(validationState).toEqual(expectedState);
            });
        });

        describe('invalidFieldsSummary ::', () => {
            let wrapper;

            it('should return `null` if no fields have been touched', () => {
                wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
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

            describe('when fields are `dirty`', () => {
                let getFormValidationStateSpy;

                beforeEach(() => {
                    wrapper = shallowMount(baseComponent, {
                        i18n,
                        localVue,
                        mocks: {
                            $v: {
                                ...$v,
                                dirty: true
                            }
                        }
                    });

                    getFormValidationStateSpy = jest.spyOn(validations, 'getFormValidationState');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should return `null` if all fields have been touched and are valid', () => {
                    // Arrange
                    const mockValidationState = {
                        invalidFields: []
                    };

                    getFormValidationStateSpy.mockReturnValue(mockValidationState);

                    // Assert
                    expect(wrapper.vm.invalidFieldsSummary).toEqual(null);
                });

                it('should return the error summary with the number of invalid fields', () => {
                    // Arrange
                    const mockValidationState = {
                        invalidFields: [
                            'mobileNumber',
                            'line1',
                            'postcode'
                        ]
                    };

                    getFormValidationStateSpy.mockReturnValue(mockValidationState);

                    wrapper = shallowMount(baseComponent, {
                        i18n,
                        localVue,
                        mocks: {
                            $v: {
                                formFields: {
                                    ...$v.formFields,
                                    $dirty: true
                                }
                            },
                            $tc: jest.fn(() => 'There are 3 errors in the form')
                        }
                    });

                    // Assert
                    expect(wrapper.vm.invalidFieldsSummary).toMatchSnapshot();
                });
            });
        });
    });

    describe('methods :: ', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('isFormValid ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `.touch()` ', () => {
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
                    mocks: {
                        $v: {
                            ...$v,
                            dirty: false
                        }
                    }
                });

                wrapper.vm.isFormValid();

                // Assert
                expect($v.$touch).toBeCalled();
            });

            it.each([
                [true, false],
                [false, true]
            ])('should return %s if `$v.invalid` is $s', (expected, $invalid) => {
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
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

        describe('isValidPhoneNumber ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPhoneNumber`', () => {
                // Arrange
                const isValidPhoneNumberSpy = jest.spyOn(validations, 'isValidPhoneNumber');

                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue
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

            it('should call `isValidPostcode`', () => {
                // Arrange
                const isValidPostcodeSpy = jest.spyOn(validations, 'isValidPostcode');

                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue
                });

                // Act
                wrapper.vm.isValidPostcode();

                // Assert
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(postcodeData.value, 'en-GB');
            });
        });

        describe('fieldErrorStatus ::', () => {
            describe('when field does not have validations', () => {
                beforeEach(() => {
                    baseComponent.data = () => ({
                        formData: {
                            formFields: [
                                fieldWithoutValidations
                            ]
                        }
                    });
                });

                it('should return false', () => {
                    // Arrange
                    const wrapper = shallowMount(baseComponent, {
                        i18n,
                        localVue
                    });

                    // Act
                    const result = wrapper.vm.fieldErrorStatus(fieldWithoutValidations.name);

                    // Assert
                    expect(result).toEqual(false);
                });
            });

            it('should return false when field is not dirty', () => {
                // Arrange
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
                    mocks: {
                        $v: {
                            formFields: {
                                fieldWithBothValidations: {
                                    $dirty: false
                                }
                            }
                        }
                    }
                });

                // Act
                const result = wrapper.vm.fieldErrorStatus(fieldWithBothValidations.name);

                // Assert
                expect(result).toEqual(false);
            });

            describe('when field is dirty and has validations', () => {
                beforeEach(() => {
                    baseComponent.data = () => ({
                        formData: {
                            formFields: [
                                fieldWithBothValidations
                            ]
                        }
                    });
                });

                it.each([
                    [false, true, true],
                    ['required', false, false],
                    ['required', false, true],
                    ['invalid', true, false]
                ])('should return %s if required is %s and isValid is %s', (expected, required, isValid) => {
                    // Arrange
                    const wrapper = shallowMount(baseComponent, {
                        i18n,
                        localVue,
                        mocks: {
                            $v: {
                                formFields: {
                                    email: {
                                        required,
                                        isValid,
                                        $dirty: true
                                    }
                                }
                            }
                        }
                    });

                    // Act
                    const result = wrapper.vm.fieldErrorStatus(fieldWithBothValidations.name);

                    // Assert
                    expect(result).toEqual(expected);
                });
            });
        });
    });
});
