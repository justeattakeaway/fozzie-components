import { shallowMount } from '@vue/test-utils';
import VueCheckout from '../Checkout.vue';

describe('Checkout', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
