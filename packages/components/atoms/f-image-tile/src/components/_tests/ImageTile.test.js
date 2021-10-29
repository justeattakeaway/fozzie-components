import { shallowMount } from '@vue/test-utils';
import ImageTile from '../ImageTile.vue';

describe('ImageTile', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ImageTile, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
