import { shallowMount } from '@vue/test-utils';
import Skeleton from '../Skeleton.vue';

describe('Skeleton', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(Skeleton, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
