import { shallowMount, createLocalVue } from '@vue/test-utils';
import MegaModal from '../MegaModal.vue';

const localVue = createLocalVue();

describe('MegaModal', () => {
    describe('component', () => {
        it('should be defined', () => {
            // Arrange & Act
            const wrapper = shallowMount(MegaModal, {
                localVue
            });

            // Assert
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('computed', () => {
        describe('showOverlay', () => {
            it.each([
                [false, false, false],
                [false, true, false],
                [false, false, true],
                [true, true, true]
            ])('should return "%s" when `isOpen` is "%s" and `hasOverlay` is "%s"', (
                expected,
                isOpen,
                hasOverlay
            ) => {
                // Arrange
                const propsData = {
                    isOpen,
                    hasOverlay
                };

                // Act
                const wrapper = shallowMount(MegaModal, {
                    localVue,
                    propsData
                });

                // Assert
                expect(wrapper.vm.showOverlay).toBe(expected);
            });
        });

        describe('title', () => {
            it('should not be visible if it’s not set in props', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(MegaModal, { propsData });
                const modalTitle = wrapper.find('[data-test-id="mega-modal-title"]');

                // Assert
                expect(modalTitle.exists()).toBe(false);
            });

            it('should be visible if it’s set in props', () => {
                // Arrange
                const propsData = {
                    title: 'Test modal title'
                };

                // Act
                const wrapper = shallowMount(MegaModal, { propsData });
                const modalTitle = wrapper.find('[data-test-id="mega-modal-title"]');

                // Assert
                expect(modalTitle.text()).toBe(propsData.title);
            });

            it.each(['h1', 'h2', 'h3', 'h4'])('should set the tag to be %s, as passed in the `titleHtmlTag` prop', htmlTag => {
                // Arrange
                const propsData = {
                    title: 'Test modal title',
                    titleHtmlTag: htmlTag
                };

                // Act
                const wrapper = shallowMount(MegaModal, { propsData });
                const modalTitle = wrapper.find('[data-test-id="mega-modal-title"]');

                // Assert
                expect(modalTitle.element.tagName.toLowerCase()).toBe(htmlTag);
            });

            it('should set the tag to be h3, if `title` is set in props, but `titleHtmlTag` prop is not set', () => {
                // Arrange
                const propsData = {
                    title: 'Test modal title'
                };

                // Act
                const wrapper = shallowMount(MegaModal, { propsData });
                const modalTitle = wrapper.find('[data-test-id="mega-modal-title"]');

                // Assert
                expect(modalTitle.element.tagName.toLowerCase()).toBe('h3');
            });
        });
    });
});
