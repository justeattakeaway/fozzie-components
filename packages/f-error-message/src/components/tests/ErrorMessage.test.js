import { shallowMount } from '@vue/test-utils';
import ErrorMessage from '../ErrorMessage.vue';

describe('ErrorMessage', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ErrorMessage, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
