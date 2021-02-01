import { shallowMount } from '@vue/test-utils';
import MediaElement from '../MediaElement.vue';

describe('MediaElement', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(MediaElement, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
