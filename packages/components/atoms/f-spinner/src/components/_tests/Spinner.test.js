import { shallowMount } from '@vue/test-utils';
import VSpinner from '../Spinner.vue';

describe('Spinner', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VSpinner, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
