import { shallowMount } from '@vue/test-utils';
import VueTabs from '../Tabs.vue';

describe('Tabs', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueTabs, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
