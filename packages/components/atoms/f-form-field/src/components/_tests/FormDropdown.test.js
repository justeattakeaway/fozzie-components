import { shallowMount } from '@vue/test-utils';
import FormDropdown from '../FormDropdown.vue';

describe('FormDropdown', () => {
    const dropdownOptions = [
        { text: 'text 0', value: 'value 0' },
        { text: 'text 1', value: 'value 1' },
        { text: 'text 2', value: 'value 2' },
        { text: 'text 3', value: 'value 3' },
        { disabled: true, text: 'text 4', value: 'value 4' }
    ];

    const attributes = {
        disabled: null
    };

    const propsData = { attributes, dropdownOptions };

    it('should be defined', () => {
        const wrapper = shallowMount(FormDropdown, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('dropdownOptions ::', () => {
            it('should populate `<option>` tags', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.element.text).toEqual('text 0');
                expect(option.element.value).toEqual('value 0');
            });

            it('should display an empty `<select>` if no options available', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormDropdown, {
                    propsData: {
                        ...propsData,
                        dropdownOptions: null
                    }
                });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.exists()).toBe(false);
            });

            it('should apply `disabled` attribute if passed in', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-4"]');

                // Assert
                expect(option.attributes().disabled).toBe('disabled');
            });

            it('should not apply disabled attribute if not passed in', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-1"]');

                // Assert
                expect(option.attributes().disabled).toBeUndefined();
            });
        });

        describe('value ::', () => {
            it('should default to first dropdown option when omitted', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormDropdown, { propsData });

                // Assert
                expect(wrapper.find('select').element.value).toBe('value 0');
            });

            it('should update selected value when changed', async () => {
                // Arrange
                const wrapper = shallowMount(FormDropdown, {
                    propsData: {
                        ...propsData,
                        value: 'value 1'
                    }
                });

                // Act
                await wrapper.setProps({ value: 'value 3' });

                // Assert
                expect(wrapper.find('select').element.value).toBe('value 3');
            });
        });
    });

    describe('methods ::', () => {
        describe('updateOption ::', () => {
            it('should emit `update` when an option is selected', async () => {
                // Arrange
                const wrapper = shallowMount(FormDropdown, { propsData });

                const event = {
                    target: {
                        value: 'test option'
                    }
                };

                // Act
                await wrapper.vm.updateOption(event);

                // Assert
                expect(wrapper.emitted('update').length).toBe(1);
            });
        });
    });
});
