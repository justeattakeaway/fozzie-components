import { shallowMount } from '@vue/test-utils';
import SegmentedControl from '../SegmentedControl.vue';

describe('SegmentedControl', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(SegmentedControl, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
