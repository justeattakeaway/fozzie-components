import { shallowMount } from '@vue/test-utils';
import FormDropdown from '../FormDropdown.vue';

describe('FormDropdown', () => {
    const dropdownOptions = ['test option'];
    const propsData = { dropdownOptions };

    it('should be defined', () => {
        const wrapper = shallowMount(FormDropdown, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('dropdownOptions ::', () => {
            it('should populate `<option>` tags', () => {
                // Arrange && Act
                const wrapper = shallowMount(FormDropdown, { propsData });
                const option = wrapper.find('[data-test-id="formDropdown-option-0"]');

                // Assert
                expect(option.text()).toEqual('test option');
            });
        });
    });

    describe('methods ::', () => {
        describe('updateOption ::', () => {
            it('should emit `update` whens option selected', async () => {
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
