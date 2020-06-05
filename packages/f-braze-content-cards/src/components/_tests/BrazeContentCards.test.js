import { shallowMount } from '@vue/test-utils';
import BrazeContentCards from '../BrazeContentCards.vue';

describe('f-braze-content-cards', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(BrazeContentCards);
        expect(wrapper.find('[data-test-id="BrazeContentCards"]').exists()).toBe(true);
    });
});
