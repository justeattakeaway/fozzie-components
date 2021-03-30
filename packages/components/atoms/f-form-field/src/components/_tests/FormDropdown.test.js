import { shallowMount } from '@vue/test-utils';
import FormDropdown from '../FormDropdown.vue';

describe('FormDropdown', () => {
    const dropdownOptions = [
        { text: 'text 0', value: 'value 0' },
        { text: 'text 1', value: 'value 1' },
        { text: 'text 2', value: 'value 2' },
        { text: 'text 3', value: 'value 3' },
        { text: 'text 4', value: 'value 4' }
    ];

    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormDropdown, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('dropdownOptions ::', () => {
            it('should populate `<option>` tags', () => {
                // Arrange & Act
                const propsData = { dropdownOptions };
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.element.text).toEqual('text 0');
                expect(option.element.value).toEqual('value 0');
            });

            it('should display an empty `<select>`', () => {
                // Arrange & Act
                const propsData = {};
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.exists()).toBe(false);
            });
        });

        describe('value ::', () => {
            it('should default to first dropdown option when omitted', () => {
                // Arrange & Act
                const propsData = { dropdownOptions };
                const wrapper = shallowMount(FormDropdown, { propsData });

                // Assert
                expect(wrapper.find('select').element.value).toBe('value 0');
            });

            it('should update selected value when changed', async () => {
                // Arrange
                const propsData = { dropdownOptions, value: 'value 1' };
                const wrapper = shallowMount(FormDropdown, { propsData });

                // Act
                await wrapper.setProps({ value: 'value 3' });

                // Assert
                expect(wrapper.find('select').element.value).toBe('value 3');
            });
        });
    });

    describe('methods ::', () => {
        describe('updateOption ::', () => {
            const propsData = { dropdownOptions };

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
