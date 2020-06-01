import { shallowMount } from '@vue/test-utils';
import FormField from '../FormField.vue';
import { DEFAULT_INPUT_TYPE, VALID_INPUT_TYPES } from '../../constants';


describe('FormField', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormField, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('inputType ::', () => {
            it('should be set to type `text` by default if no value is set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(DEFAULT_INPUT_TYPE);
            });

            it('should set the type of the input element if the prop value passed in is valid', () => {
                // Arrange
                const propsData = {
                    inputType: 'email'
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(propsData.inputType);
            });

            it('should fallback to type `text` if inputType is invalid', () => {
                // Arrange
                const propsData = {
                    inputType: 'invalidType'
                };
                console.error = jest.fn();

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(console.error).toHaveBeenCalledTimes(1); // checks that vue is throwing an error because of the defined prop validation function
                expect(formInput.attributes('type')).toBe(DEFAULT_INPUT_TYPE);
            });

            it.each(VALID_INPUT_TYPES)('should set the type of form input element as expected if inputType=%p is specified', definedType => {
                // Arrange
                const propsData = {
                    inputType: definedType
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(definedType);
            });

            it('should set the value of attribute data-test-id on input element if dataTestId is specified', () => {
                // Arrange
                const dataTestId = 'my-test-id';
                const propsData = {
                    dataTestId
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(dataTestId);
            });

            it('should set the value of attribute data-test-id on input element if name is specified', () => {
                // Arrange
                const name = 'my-input';
                const attrs = {
                    name
                };

                // Act
                const wrapper = shallowMount(FormField, { attrs });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(name);
            });

            it('should not add the attribute data-test-id on input element if dataTestId is not specified', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, { });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(undefined);
            });
        });
    });
});
