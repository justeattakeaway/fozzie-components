import { shallowMount } from '@vue/test-utils';
import Card from '../Card.vue';

describe('Card', () => {
    allure.feature('Card');
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(Card, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('cardTitle', () => {
        it('should not be visible if it’s not set in props', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Card, { propsData });
            const cardTitleElement = wrapper.find('[data-test-id="card-heading"]');

            // Assert
            expect(cardTitleElement.exists()).toBe(false);
        });

        it('should be visible if it’s set in props', () => {
            // Arrange
            const propsData = {
                cardHeading: 'Test card title'
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });
            const cardTitleElement = wrapper.find('[data-test-id="card-heading"]');

            // Assert
            expect(cardTitleElement.text()).toBe(propsData.cardHeading);
        });
    });

    describe('props', () => {
        describe('isRounded', () => {
            it('should default to `false` if it is not set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.isRounded).toBe(false);
            });

            it('should be set to `true` if the `isRounded` prop is passed in as `true`', () => {
                // Arrange
                const propsData = {
                    isRounded: true
                };

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.isRounded).toBe(true);
            });
        });

        describe('hasOutline', () => {
            it('should default to `false` if it is not set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.hasOutline).toBe(false);
            });

            it('should be set to `true` if the `hasOutline` prop is passed in as `true`', () => {
                // Arrange
                const propsData = {
                    hasOutline: true
                };

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.hasOutline).toBe(true);
            });
        });

        describe('isPageContentWrapper', () => {
            it('should default to `false` if it is not set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.isPageContentWrapper).toBe(false);
            });

            it('should be set to `true` if the `isPageContentWrapper` prop is passed in as `true`', () => {
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

        describe('cardHeadingPosition', () => {
            it('should default to `left` if it is not set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.cardHeadingPosition).toBe('left');
            });

            it('should be set to `center` if the `cardHeadingPosition` prop is passed in as `center`', () => {
                // Arrange
                const propsData = {
                    cardHeadingPosition: 'center'
                };

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.cardHeadingPosition).toBe('center');
            });

            it('should only allow `left`, `right` or `center` to be passed in.', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                const position = wrapper.vm.$options.props.cardHeadingPosition;

                // Assert
                expect(position.validator('invalid')).toBeFalsy();
                expect(position.validator('left')).toBeTruthy();
                expect(position.validator('right')).toBeTruthy();
                expect(position.validator('center')).toBeTruthy();
            });
        });
    });
});
