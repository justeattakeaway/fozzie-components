// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils';
import VueGlobalisation from '../globalisation.mixin.vue';

describe('Globalisation', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueGlobalisation, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
