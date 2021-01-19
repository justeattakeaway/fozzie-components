import { shallowMount, mount } from '@vue/test-utils';
import FormField from '../FormField.vue';
import FormDropdown from '../FormDropdown.vue';
import {
    DEFAULT_INPUT_TYPE, VALID_INPUT_TYPES, VALID_LABEL_STYLES
} from '../../constants';

describe('FormField', () => {
    allure.feature('Form Field');
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

            it('should display the dropdown component if inputType=`dropdown`', () => {
                // Arrange
                const propsData = {
                    inputType: 'dropdown'
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });

                // Assert
                expect(wrapper.contains(FormDropdown)).toBe(true);
            });
        });

        describe('labelStyle ::', () => {
            it.each(VALID_LABEL_STYLES)('should set the type of form label element as expected if labelStyle=%p is specified', definedType => {
                // Arrange
                const propsData = {
                    labelStyle: definedType
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formLabel = wrapper.find('form-label-stub');

                // Assert
                expect(formLabel.attributes('labelstyle')).toBe(definedType);
            });

            describe('when set to `inlineNarrow`', () => {
                const MOBILE = 767;
                const DESKTOP = 768;
                const eventName = 'resize';
                let resizeWindow;

                beforeEach(() => {
                    resizeWindow = width => {
                        window.innerWidth = width;
                        window.dispatchEvent(new Event(eventName));
                    };
                });

                it('should append the label above input when window size is not mobile', async () => {
                    // Arrange
                    const propsData = {
                        labelStyle: 'inlineNarrow',
                        labelText: 'Test Label'
                    };

                    resizeWindow(DESKTOP);

                    // Act
                    const wrapper = await shallowMount(FormField, { propsData });

                    const defaultLabel = wrapper.find('[data-test-id="formfield-label"]');
                    const inlineLabel = wrapper.find('[data-test-id="formfield-label--inline"]');

                    // Assert
                    expect(defaultLabel.exists()).toBe(true);
                    expect(inlineLabel.exists()).toBe(false);
                });

                it('should append the label inline with input when window size is mobile', async () => {
                    // Arrange
                    const propsData = {
                        labelStyle: 'inlineNarrow',
                        labelText: 'Test Label'
                    };

                    resizeWindow(MOBILE);

                    // Act
                    const wrapper = await shallowMount(FormField, { propsData });

                    const defaultLabel = wrapper.find('[data-test-id="formfield-label"]');
                    const inlineLabel = wrapper.find('[data-test-id="formfield-label--inline"]');

                    // Assert
                    expect(defaultLabel.exists()).toBe(false);
                    expect(inlineLabel.exists()).toBe(true);
                });
            });
        });
    });

    describe('attrs ::', () => {
        describe('name ::', () => {
            it('should set testId.container to `formfield-container when name is is not set`', () => {
                // Arrange
                const attrsData = {};

                // Act
                const wrapper = shallowMount(FormField, { attrsData });

                // Assert
                expect(wrapper.attributes('data-test-id')).toBe('formfield-container');
            });

            it('should include attribute `name` in the generated container data-test-id when it is set', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = shallowMount(FormField, attrsData);

                // Assert
                expect(wrapper.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}`);
            });

            it('should include attribute `name` in the generated input data-test-id when it is set', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = shallowMount(FormField, attrsData);
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}-input`);
            });

            it('when name is set, it should be included in the generated testId.input data-test-id', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = mount(FormField, attrsData);
                const formLabel = wrapper.find('label');

                // Assert
                expect(formLabel.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}-label`);
            });
        });
    });
});
