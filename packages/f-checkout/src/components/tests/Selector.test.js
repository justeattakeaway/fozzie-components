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
            it('should add class to display label above option when not null', async () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData });
                const selector = wrapper.find("[data-test-id='selector']");

                wrapper.setData({ selectedTime: 'testTime' });
                await wrapper.vm.$nextTick();

                // Assert
                expect(selector.classes()).toContain('o-selector--float');
            });

            it('should remove class to display label centrally when not null', () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData });
                const selector = wrapper.find("[data-test-id='selector']");

                // Assert
                expect(selector.classes()).not.toContain('o-selector--float');
            });
        });
    });
});
