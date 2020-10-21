import { shallowMount } from '@vue/test-utils';
import Selector from '../Selector.vue';

describe('Selector', () => {
    const propsData = {};

    it('should be defined', () => {
        const wrapper = shallowMount(Selector, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('data ::', () => {
        describe('selectedTime ::', () => {
            const data = () => ({
                selectedTime: 'testTime'
            });

            it('should add class to display label above option when not null', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData, data });
                const selector = wrapper.find("[data-test-id='form-select']");

                // Assert
                expect(wrapper.html()).toContain('o-form-select--float');
                expect(selector.classes()).toContain('o-form-select--float');
            });

            it('should remove class to display label centrally when null', async () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData });
                const selector = wrapper.find("[data-test-id='form-select']");

                // Assert
                expect(selector.classes()).not.toContain('o-form-select--float');
            });
        });
    });
});
