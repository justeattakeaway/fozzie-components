import { shallowMount } from '@vue/test-utils';
import StatusBanner from '../StatusBanner.vue';

describe('`StatusBanner`', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};
        const wrapper = shallowMount(StatusBanner, { propsData });

        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('`Header component`', () => {
        it('should be rendered', () => {
            // Arrange
            const propsData = {};
            const wrapper = shallowMount(StatusBanner, { propsData });

            // Act & Assert
            expect(wrapper.find('[data-test-id="header-component"]').exists()).toBeTruthy();
        });
    });

    describe('`Main Banner component`', () => {
        it('should be rendered', () => {
            // Arrange
            const propsData = {};
            const wrapper = shallowMount(StatusBanner, { propsData });

            // Act & Assert
            expect(wrapper.find('[data-test-id="main-banner-container"]').exists()).toBeTruthy();
        });
    });

    describe('`Footer component`', () => {
        it('should be rendered', () => {
            // Arrange
            const propsData = {};
            const wrapper = shallowMount(StatusBanner, { propsData });

            // Act & Assert
            expect(wrapper.find('[data-test-id="footer-component"]').exists()).toBeTruthy();
        });
    });
});
