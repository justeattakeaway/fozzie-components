import { shallowMount } from '@vue/test-utils';
import RestaurantCard from '../RestaurantCard.vue';

describe('RestaurantCard', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(RestaurantCard, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
