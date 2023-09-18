import { shallowMount } from '@vue/test-utils';
import SelfExclusion from '../SelfExclusion.vue';

describe('SelfExclusion', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(SelfExclusion, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
