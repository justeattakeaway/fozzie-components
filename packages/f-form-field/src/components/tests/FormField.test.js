import { shallowMount } from '@vue/test-utils';
import FormField from '../FormField.vue';

describe('FormField', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormField, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
