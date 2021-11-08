import { shallowMount } from '@vue/test-utils';
import CardWithContent from '../CardWithContent.vue';

describe('CardWithContent', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(CardWithContent, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
