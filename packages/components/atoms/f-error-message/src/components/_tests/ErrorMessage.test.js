import { shallowMount } from '@vue/test-utils';
import ErrorMessage from '../ErrorMessage.vue';

const propsData = {
    slots: {
        default: '<div class="mock-message">Here is a message</div>'
    }
};

describe('ErrorMessage', () => {
    allure.feature('Error Message');

    it('should render if slot content is provided', () => {
        // Arrange
        const wrapper = shallowMount(ErrorMessage, propsData);

        // Act
        const content = wrapper.find('[data-test-id="content"]');

        // Assert
        expect(content.exists()).toBe(true);
    });

    it('should not render if slot content is omitted', () => {
        // Arrange
        const wrapper = shallowMount(ErrorMessage, {});

        // Act
        const content = wrapper.find('[data-test-id="content"]');

        // Assert
        expect(content.exists()).toBe(false);
    });

    it('should correctly render the content passed in a slot', () => {
        // Arrange
        const wrapper = shallowMount(ErrorMessage, propsData);

        // Act
        const content = wrapper.find('[data-test-id="content"]');

        // Assert
        expect(content.element.innerHTML).toBe(propsData.slots.default);
    });
});
