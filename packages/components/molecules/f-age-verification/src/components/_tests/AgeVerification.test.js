import { shallowMount } from '@vue/test-utils';
import AgeVerification from '../AgeVerification.vue';

describe('AgeVerification', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(AgeVerification, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
