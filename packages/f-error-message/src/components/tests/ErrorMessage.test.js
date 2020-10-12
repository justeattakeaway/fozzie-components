import { shallowMount } from '@vue/test-utils';
import ErrorMessage from '../ErrorMessage.vue';

const propsData = {
    slots: {
        default: '<div class="mock-message">Here is a message</div>'
    }
};

describe('ErrorMessage', () => {

    it('should be defined', () => {
        const wrapper = shallowMount(ErrorMessage, {});
        expect(wrapper.exists()).toBe(true);
    });

    it ('should render if slot content is provided', () => {

        const wrapper = shallowMount(ErrorMessage, propsData);
        const content = wrapper.find('[data-test-id="content"]');
        expect(content.exists()).toBe(true);
    });

    it ('should not render if slot content is omitted', () => {

        const wrapper = shallowMount(ErrorMessage, {});
        const content = wrapper.find('[data-test-id="content"]');
        expect(content.exists()).toBe(false);
    });

    it ('should correctly render the content passed in a slot', () => {

        const wrapper = shallowMount(ErrorMessage, propsData);
        const content = wrapper.find('[data-test-id="content"]');
        expect(content.element.innerHTML).toBe(propsData.slots.default);
    });
});
