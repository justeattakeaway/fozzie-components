import { shallowMount } from '@vue/test-utils';
import VMfa from '../Mfa.vue';

describe('Mfa', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VMfa, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
