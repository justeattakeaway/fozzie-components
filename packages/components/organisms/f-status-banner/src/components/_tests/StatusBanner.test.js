import { shallowMount } from '@vue/test-utils';
import StatusBanner from '../StatusBanner.vue';

describe('StatusBanner', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(StatusBanner, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
