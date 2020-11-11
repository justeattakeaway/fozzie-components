import { shallowMount } from '@vue/test-utils';
import Selector from '../Selector.vue';

describe('Selector', () => {
    allure.feature('Checkout-Selector');
    const propsData = {};

    it('should be defined', () => {
        const wrapper = shallowMount(Selector, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('data ::', () => {
        describe('selectedTime ::', () => {
            // TODO: Component is working correctly but the tests do not work with `scss modules`

            xit('should add class to display label above option when not null', async () => {
                // Arrange
                const data = { selectedTime: 'testTime' };
                const wrapper = shallowMount(Selector, { propsData });
                const selector = wrapper.find("[data-test-id='form-select']");

                // Act
                wrapper.setData(data);
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.html()).toContain('o-form-select--float');
                expect(selector.classes()).toContain('o-form-select--float');
            });

            it('should remove class to display label centrally when null', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData });
                const selector = wrapper.find("[data-test-id='form-select']");

                // Assert
                expect(selector.classes()).not.toContain('o-form-select--float');
            });
        });
    });
});
