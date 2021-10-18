import { shallowMount } from '@vue/test-utils';
import NavigationLinks from '../NavigationLinks.vue';

describe('NavigationLinks', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(NavigationLinks, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
