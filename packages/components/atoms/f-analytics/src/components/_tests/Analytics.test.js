import { shallowMount } from '@vue/test-utils';
import Analytics from '../Analytics.vue';

describe('Analytics', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(
            Analytics,
            {
                propsData
            }
        );

        expect(wrapper.exists()).toBe(true);
    });
});
