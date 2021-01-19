import { shallowMount } from '@vue/test-utils';
import FormDropdown from '../FormDropdown.vue';

describe('FormDropdown', () => {
    const dropdownOptions = ['option 0', 'option 1', 'option 2', 'option 3', 'option 4'];

    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormDropdown, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('dropdownOptions ::', () => {
            it('should populate `<option>` tags', () => {
                // Arrange && Act
                const propsData = { dropdownOptions };
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.text()).toEqual('option 0');
            });

            it('should display an empty `<select>`', () => {
                // Arrange && Act
                const propsData = {};
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formfield-dropdown-option-0"]');

                // Assert
                expect(option.exists()).toBe(false);
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
