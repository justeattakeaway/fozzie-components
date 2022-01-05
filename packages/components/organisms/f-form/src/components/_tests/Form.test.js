import { shallowMount } from '@vue/test-utils';
import VForm from '../Form.vue';

describe('Form', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VForm, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
