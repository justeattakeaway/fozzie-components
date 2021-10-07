import { shallowMount } from '@vue/test-utils';
import IeCompatibility from '../IeCompatibility.vue';

describe('IeCompatibility', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(IeCompatibility, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
