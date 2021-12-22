import { shallowMount } from '@vue/test-utils';
import FilterPill from '../FilterPill.vue';

describe('FilterPill', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FilterPill, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
