import { shallowMount } from '@vue/test-utils';
import { validations } from '@justeat/f-services';
import {
    localVue,
    i18n,
    $v
} from '../../components/_tests/helpers';
import {
    formData,
    firstNameData,
    phoneNumberData,
    postcodeData
} from '../../../stories/helpers';

import { FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../../constants';
import formValidations from '../formValidation.mixin';

describe('Form', () => {
    describe('computed :: ', () => {
        describe('invalidFieldsSummary ::', () => {
            let wrapper;

            afterEach(() => {
                jest.clearAllMocks();
                jest.restoreAllMocks();
            });

            it('should return `null` if no fields have been touched', () => {
                // Arrange & Act
                wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {},
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
                wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {},
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

        describe('isFormValid ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `.touch()` ', () => {
                // Act
                const wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {},
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
                const wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {},
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

        xdescribe('isValidPhoneNumber ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPhoneNumber` from `f-services`', () => {
                // Arrange
                const isValidPhoneNumberSpy = jest.spyOn(validations, 'isValidPhoneNumber');

                const wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {}
                });

                // Act
                wrapper.vm.isValidPhoneNumber();

                // Assert
                expect(isValidPhoneNumberSpy).toHaveBeenCalledWith(phoneNumberData.value, 'en-GB');
            });
        });

        xdescribe('isValidPostcode ::', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `isValidPostcode` from `f-services`', () => {
                // Arrange
                const isValidPostcodeSpy = jest.spyOn(validations, 'isValidPostcode');
                const wrapper = shallowMount(formValidations, {
                    i18n,
                    localVue,
                    render () {}
                });

                // Act
                wrapper.vm.isValidPostcode();

                // Assert
                expect(isValidPostcodeSpy).toHaveBeenCalledWith(postcodeData.value, 'en-GB');
            });
        });
    });
});
