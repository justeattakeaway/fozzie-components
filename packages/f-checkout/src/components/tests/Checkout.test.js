import { shallowMount } from '@vue/test-utils';
import VueCheckout from '../Checkout.vue';

describe('Checkout', () => {
    const propsData = {};

    it('should be defined', () => {
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('have a button', () => {
        const wrapper = shallowMount(VueCheckout, { propsData });
        const button = wrapper.find("[data-test-id='confirm-payment-submit-button']");
        expect(button.exists()).toBe(true);
    });

    describe('computed ::', () => {
        const data = () => ({
            firstName: 'name'
        });

        describe('name ::', () => {
            it('should capitalize `firstName` data', () => {
                // Arrange & Act
                const wrapper = shallowMount(VueCheckout, { propsData, data });
                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toContain('Name');
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', () => {
                // Arrange & Act
                const wrapper = shallowMount(VueCheckout, { propsData, data });
                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Assert
                expect(name.props('cardHeading')).toEqual('Name, confirm your details');
            });
        });
    });
});
