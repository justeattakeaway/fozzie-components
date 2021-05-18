import { shallowMount } from '@vue/test-utils';
import TakeawayPayActivation from '../TakeawayPayActivation.vue';

describe('TakeawayPayActivation', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(TakeawayPayActivation, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
