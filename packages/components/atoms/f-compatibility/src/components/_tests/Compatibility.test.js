import { shallowMount } from '@vue/test-utils';
import VCompatibility from '../Compatibility.vue';

describe('Compatibility', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VCompatibility, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
