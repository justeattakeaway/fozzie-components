import { shallowMount, createLocalVue } from '@vue/test-utils';
import MegaModal from '../MegaModal.vue';

const localVue = createLocalVue();

describe('MegaModal', () => {
    allure.feature('Mega Modal');
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
    });
});
