import { shallowMount, mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import { VALID_CHECKOUT_METHOD } from '../../constants';
import VueCheckout from '../Checkout.vue';
import EventNames from '../../event-names';

describe('Checkout', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueCheckout, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('checkoutMethod ::', () => {
            it.each(VALID_CHECKOUT_METHOD)('should update the Selector `ordermethod` attribute to match checkoutMethod=%p', definedType => {
                // Arrange
                const propsData = {
                    checkoutMethod: definedType
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const selectorComponent = wrapper.find('[data-test-id="selector"]');

                // Assert
                expect(selectorComponent.attributes('ordermethod')).toEqual(definedType);
            });

            it('should display the address block if set to `Delivery`', () => {
                // Arrange
                const propsData = {
                    checkoutMethod: 'Delivery'
                };

                // Act
                const wrapper = shallowMount(VueCheckout, { propsData });
                const addressBlock = wrapper.find('[data-test-id="address-block"]');

                // Assert
                expect(addressBlock.exists()).toBe(true);
            });

            it('should not display the address block if set to `Collection`', () => {
                // Arrange
                const propsData = {
                    checkoutMethod: 'Collection'
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

    describe('with a working checkout service', () => {
        describe('when checkoutMethod set to `Collection`', () => {
            const propsData = { checkoutMethod: 'Collection' };

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                const wrapper = mount(VueCheckout, { propsData });
                // expect(wrapper.html()).toBe('1');
                wrapper.find('[data-test-id="input-mobile-number"]').setValue('07777777777');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.GoToPaymentSuccess).length).toBe(1);
            });

            it('should show error message and emit failure event when the mobile number field is not populated', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.isMobileNumberValid).toBe(false);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('mobileNumber');
            });

            it('should not show error message or emit failure event when the address input fields are not populated', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.addressErrors).toBe(null);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('mobileNumber');
            });
        });

        describe('when checkoutMethod set to `Delivery`', () => {
            const propsData = { checkoutMethod: 'Delivery' };

            it('should emit success event when all fields are populated correctly', async () => {
                // Arrange
                const wrapper = mount(VueCheckout, { propsData });
                // expect(wrapper.html()).toBe('1');
                wrapper.find('[data-test-id="input-mobile-number"]').setValue('07777777777');
                wrapper.find('[data-test-id="input-address-line-1"]').setValue('Fleet Place House');
                wrapper.find('[data-test-id="input-address-city"]').setValue('London');
                wrapper.find('[data-test-id="input-address-postcode"]').setValue('EC4M 7RF');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();

                // Assert
                expect(wrapper.emitted(EventNames.GoToPaymentSuccess).length).toBe(1);
            });

            it('should show error message and emit failure event when the address line 1 input field is not populated', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.addressErrors.line1.error).toBe(true);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('address');
            });

            it('should show error message and emit failure event when the address city input field is not populated', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.addressErrors.city.error).toBe(true);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('address');
            });

            it('should show error message and emit failure event when the address postcode input field is not populated', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, { propsData });

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.addressErrors.postcode.errors.required.error).toBe(true);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('address');
            });

            it('should show error message and emit failure event when the address postcode input field is populated with incorrect postcode', async () => {
                // Arrange
                const wrapper = mount(VueCheckout, { propsData });
                const postcodeInput = wrapper.find('[data-test-id="input-address-postcode"]');
                postcodeInput.setValue('!?dh352s');

                // Act
                await wrapper.vm.onFormSubmit();
                await flushPromises();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.addressErrors.postcode.errors.type.error).toBe(true);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure).length).toBe(1);
                expect(wrapper.emitted(EventNames.GoToPaymentFailure)[0][0].invalidFields).toContain('address');
            });
        });
    });
});
