import { shallowMount } from '@vue/test-utils';
import Card from '../Card.vue';

describe('Card', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(Card, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
