import { shallowMount } from '@vue/test-utils';
import { VALID_CHECKOUT_TYPES } from '../../constants';
import VueCheckout from '../Checkout.vue';

describe('Checkout', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('checkoutType ::', () => {
            it.each(VALID_CHECKOUT_TYPES)('should set load the component as expected if checkoutType=%p is specified', definedType => {
                // Arrange
                const propsData = {
                    checkoutType: definedType
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const selectedComponent = wrapper.find('[data-test-id="checkout-component-type"]');

                // Assert
                expect(selectedComponent.element.tagName).toMatchSnapshot();
            });
        });
    });

    describe('computed ::', () => {
        const propsData = {};
        const data = { firstName: 'name' };

        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });
                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Act
                wrapper.setData(data);
                await wrapper.vm.$nextTick();

                // Assert
                expect(name.props('cardHeading')).toContain('Name');
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });
                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Act
                wrapper.setData(data);
                await wrapper.vm.$nextTick();

                // Assert
                expect(name.props('cardHeading')).toEqual('Name, confirm your details');
            });
        });
    });
});
