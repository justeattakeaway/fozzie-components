import { shallowMount } from '@vue/test-utils';
import ContentCards from '../ContentCards.vue';

describe('f-braze-content-cards', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(ContentCards);
        expect(wrapper.find('[data-test-id="ContentCards"]').exists()).toBe(true);
    });
});
