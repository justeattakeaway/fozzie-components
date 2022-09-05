import { shallowMount } from '@vue/test-utils';
import WdioTest from '../WdioTest.vue';

describe('WdioTest', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(WdioTest, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
