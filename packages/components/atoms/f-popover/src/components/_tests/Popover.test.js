import { shallowMount } from '@vue/test-utils';
import VPopover from '../Popover.vue';

describe('Popover', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VPopover, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
