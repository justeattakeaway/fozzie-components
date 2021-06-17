import { shallowMount } from '@vue/test-utils';
import GtmAnalytics from '../Analytics.vue';

describe('Analytics', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(GtmAnalytics, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
