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
            it('should remove label when not null', () => {
                // Arrange
                const data = () => ({
                    selectedTime: 'time'
                });

                // Act
                const wrapper = shallowMount(Selector, { propsData, data });
                const label = wrapper.find("[data-test-id='selector-label']");

                // Assert
                expect(label.exists()).toBe(false);
            });
        });
    });
});
