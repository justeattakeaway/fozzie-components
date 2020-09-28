import { shallowMount } from '@vue/test-utils';
import FormLabel from '../FormLabel.vue';

describe('FormLabel', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormLabel, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
