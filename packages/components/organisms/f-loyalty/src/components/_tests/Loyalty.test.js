import { shallowMount } from '@vue/test-utils';
import VLoyalty from '../Loyalty.vue';

describe('Loyalty', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VLoyalty, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
