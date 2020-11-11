import { shallowMount } from '@vue/test-utils';
import CookieBanner from '../CookieBanner.vue';

describe('CookieBanner', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(CookieBanner, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
