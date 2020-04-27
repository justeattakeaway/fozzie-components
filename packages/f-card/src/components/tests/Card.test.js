import { shallowMount } from '@vue/test-utils';
import Card from '../Card.vue';

describe('Card', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(Card, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('cardTitle shouldn’t be visible if it’s not set in props', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(Card, { propsData });
        const cardTitleElement = wrapper.find('[data-test="card-heading"]');

        // Assert
        expect(cardTitleElement.exists()).toBe(false);
    });

    it('cardTitle should be visible if it’s set in props', () => {
        // Arrange
        const propsData = {
            cardHeading: 'Test card title'
        };

        // Act
        const wrapper = shallowMount(Card, { propsData });
        const cardTitleElement = wrapper.find('[data-test="card-heading"]');

        // Assert
        expect(cardTitleElement.text()).toBe(propsData.cardHeading);
    });

    describe('props', () => {
        it('if isRounded is not set, then it should default to false', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.isRounded).toBe(false);
        });

        it('if isRounded is set to true, data property is set on the Card component to true', () => {
            // Arrange
            const propsData = {
                isRounded: true
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.isRounded).toBe(true);
        });

        it('if hasOutline is not set, then it should default to false', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.hasOutline).toBe(false);
        });

        it('if hasOutline is set to true, data property is set on the Card component to true', () => {
            // Arrange
            const propsData = {
                hasOutline: true
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.hasOutline).toBe(true);
        });

        it('if isPageContentWrapper is not set, then it should default to false', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.isPageContentWrapper).toBe(false);
        });

        it('if isPageContentWrapper is set to true, data property is set on the Card component to true', () => {
            // Arrange
            const propsData = {
                isPageContentWrapper: true
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });

            // Assert
            expect(wrapper.vm.isPageContentWrapper).toBe(true);
        });
    });
});
