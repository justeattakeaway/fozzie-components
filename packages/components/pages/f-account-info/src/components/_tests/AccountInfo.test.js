import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';

describe('AccountInfo', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(AccountInfo, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
