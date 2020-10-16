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
            it('should add class to visually hide label when not null', async () => {
                // Arrange & Act
                const wrapper = shallowMount(Selector, { propsData });
                const label = wrapper.find("[data-test-id='selector-label']");

                wrapper.setData({ selectedTime: 'testTime' });
                await wrapper.vm.$nextTick();

                // Assert
                expect(label.classes()).toContain('is-visuallyHidden');
            });
        });
    });
});
