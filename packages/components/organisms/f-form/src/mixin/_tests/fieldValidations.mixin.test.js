import { shallowMount } from '@vue/test-utils';
import fieldValidations from '../fieldValidation.mixin';
import { $v } from '../../components/_tests/helpers';
import { firstNameData } from '../../../stories/helpers';
import { FORM_EVENTS } from '../../constants';

describe('fieldValidations', () => {
    describe('computed ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        xdescribe('error ::', () => {
            afterEach(() => {
                jest.restoreAllMocks();
            });

            it.each([
                [true, true, true],
                [true, false, true],
                [true, true, false],
                [false, false, false]
            ])('should return %s when `hasRequiredError` is %s and `hasInvalidError` is %s', (expected, hasRequiredError, hasInvalidError) => {
                // Arrange & Act
                jest.spyOn(fieldValidations.computed, 'hasRequiredError').mockReturnValue(hasRequiredError);
                jest.spyOn(fieldValidations.computed, 'hasInvalidError').mockReturnValue(hasInvalidError);

                wrapper = shallowMount(fieldValidations, {
                    render () {},
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.error).toEqual(expected);
            });
        });

        describe('isDirty ::', () => {
            it.each([
                [true, true],
                [false, false]
            ])('should return %s when `validatons.$dirty` is %s', (expected, $dirty) => {
                // Arrange && Act
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
                    computed: {
                        validations: () => ({ $dirty })
                    },
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.isDirty).toEqual(expected);
            });
        });

        xdescribe('validations ::', () => {
            it('should return fields validations', () => {
                // Arrange & Act
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
                    provide: () => ({
                        $v
                    })
                });

                const fieldName = formFields.name;

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
            ])('should return %s when `isDirty` is %s and required validation is %s', (expected, isDirty, required) => {
                // Arrange & Act
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
                    computed: {
                        isDirty: () => isDirty,
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

        xdescribe('hasInvalidError ::', () => {
            it.each([
                [true, true, true, false],
                [false, true, true, true],
                [false, true, false, false],
                [false, true, false, true],
                [false, false, true, false],
                [false, false, true, true],
                [false, false, false, false],
                [false, false, false, true]
            ])('should return %s when `hasInvalidErrorMessage` is %s, `isDirty` is %s and field validation is %s', (expected, hasInvalidErrorMessage, isDirty, fieldValidation) => {
                // Arrange & Act
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
                    computed: {
                        hasInvalidErrorMessage: () => hasInvalidErrorMessage,
                        isDirty: () => isDirty,
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

        xdescribe('errorType ::', () => {
            it.each([
                [false, true, null],
                [false, false, null],
                [true, false, 'invalid'],
                [true, true, 'required']
            ])('when `hasError` is %s and `hasRequiredError` is %s, should return %s', (hasError, hasRequiredError, expected) => {
                // Arrange && Act
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
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
    });

    describe('methods ::', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('formFieldBlur ::', () => {
            xit('should call `touch` for validation', () => {
                // Arrange
                const wrapper = shallowMount(fieldValidations, {
                    render () {},
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
