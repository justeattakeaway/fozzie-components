import { shallowMount } from '@vue/test-utils';
import ErrorPage from '../ErrorPage.vue';

describe('ErrorPage', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ErrorPage, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
