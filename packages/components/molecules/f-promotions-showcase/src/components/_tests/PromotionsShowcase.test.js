import { shallowMount } from '@vue/test-utils';
import PromotionsShowcase from '../PromotionsShowcase.vue';

describe('PromotionsShowcase', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(PromotionsShowcase, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
