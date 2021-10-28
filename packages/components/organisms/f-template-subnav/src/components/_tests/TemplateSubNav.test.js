import { shallowMount } from '@vue/test-utils';
import TemplateSubNav from '../TemplateSubNav.vue';

describe('TemplateSubNav', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(TemplateSubNav, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
