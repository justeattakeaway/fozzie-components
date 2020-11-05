import { shallowMount } from '@vue/test-utils';
import { VALID_CHECKOUT_METHOD } from '../../constants';
import VueCheckout from '../Checkout.vue';

describe('Checkout', () => {
    const checkoutUrl = '/checkout/uk/12345';

    it('should be defined', () => {
        const propsData = { checkoutUrl };
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('checkoutMethod ::', () => {
            it.each(VALID_CHECKOUT_METHOD)('should update the Selector `ordermethod` attribute to match checkoutMethod=%p', definedType => {
                // Arrange
                const propsData = {
                    checkoutMethod: definedType,
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const selectorComponent = wrapper.find('[data-test-id="selector"]');

                // Assert
                expect(selectorComponent.attributes('ordermethod')).toEqual(definedType);
            });

            it('should display the address block if set to `delivery`', () => {
                // Arrange
                const propsData = {
                    checkoutMethod: 'delivery',
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(true);
            });

            it('should not display the address block if set to `collection`', () => {
                // Arrange
                const propsData = {
                    checkoutMethod: 'collection',
                    checkoutUrl
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(false);
            });
        });
    });

    describe('computed ::', () => {
        const propsData = { checkoutUrl };
        const data = { customer: { firstName: 'name' } };

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
