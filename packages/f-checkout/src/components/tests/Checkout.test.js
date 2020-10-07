import { shallowMount } from '@vue/test-utils';
import VueCheckout from '../Checkout.vue';

describe('Checkout', () => {
    const propsData = {};

    it('should be defined', () => {
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('has a button', () => {
        const wrapper = shallowMount(VueCheckout, { propsData });
        const button = wrapper.find("[data-test-id='confirm-payment-submit-button']");
        expect(button.exists()).toBe(true);
    });
});
