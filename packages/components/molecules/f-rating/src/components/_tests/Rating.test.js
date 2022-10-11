import { shallowMount } from '@vue/test-utils';
import VRating from '../Rating.vue';

describe('Rating', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VRating, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
