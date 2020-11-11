import { shallowMount } from '@vue/test-utils';
import VueButton from '../Button.vue';

describe('Button', () => {
    allure.feature('Button');
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueButton, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
