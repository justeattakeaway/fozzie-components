import { shallowMount } from '@vue/test-utils';
import VueAlert from '../Alert.vue';

describe('Alert', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueAlert, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
