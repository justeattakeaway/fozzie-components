import { shallowMount } from '@vue/test-utils';
import VOffers from '../Offers.vue';

describe('Offers', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VOffers, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
