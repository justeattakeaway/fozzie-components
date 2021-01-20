import { shallowMount } from '@vue/test-utils';
import BreadCrumbs from '../BreadCrumbs.vue';

describe('BreadCrumbs', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(BreadCrumbs, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
