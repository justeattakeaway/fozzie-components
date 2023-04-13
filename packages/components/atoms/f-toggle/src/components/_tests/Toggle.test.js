import { shallowMount } from '@vue/test-utils';
import VToggle from '../Toggle.vue';

describe('Toggle', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VToggle, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
