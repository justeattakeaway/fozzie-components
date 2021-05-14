import { shallowMount } from '@vue/test-utils';
import VLink from '../Link.vue';

describe('Link', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VLink, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
