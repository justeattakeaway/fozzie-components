import { shallowMount } from '@vue/test-utils';
import StampcardsHeader from '../StampcardsHeader.vue';

describe('StampcardsHeader', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(StampcardsHeader, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
