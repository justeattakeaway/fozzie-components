import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '../SkeletonLoader.vue';

describe('SkeletonLoader', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(SkeletonLoader, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
