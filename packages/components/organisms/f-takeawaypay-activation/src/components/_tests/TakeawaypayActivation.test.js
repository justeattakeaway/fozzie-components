import { shallowMount } from '@vue/test-utils';
import TakeawaypayActivation from '../TakeawaypayActivation.vue';

describe('TakeawaypayActivation', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(TakeawaypayActivation, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
