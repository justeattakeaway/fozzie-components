import { shallowMount } from '@vue/test-utils';
import FButton from '../Button.vue';

describe('Button', () => {
    allure.feature('Button');
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FButton, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
