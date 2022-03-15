import { shallowMount } from '@vue/test-utils';
import Image from '../Image.vue';

const MOCK_BACKGROUND_IMG = 'https://example.com/image.jpg';
const MOCK_LOGO_IMG = 'https://example.com/logo.jpg';

describe('Image.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(Image, {
            propsData: {
                backgroundImageUrl: MOCK_BACKGROUND_IMG,
                restaurantLogoUrl: MOCK_LOGO_IMG
            }
        });
    });

    it('should display a background image when provided one via the backgroundImageUrl prop', () => {
        // Act
        const imageAttr = wrapper.find('[data-test-id="content-card-background-image"]');

        // Assert
        expect(imageAttr.attributes().src).toBe(MOCK_BACKGROUND_IMG);
    });
    it('should display a restaurant logo image when provided one via the restaurantLogoUrl prop', () => {
        // Act
        const imageAttr = wrapper.find('[data-test-id="content-card-restaurant-logo"]');

        // Assert
        expect(imageAttr.attributes().src).toBe(MOCK_LOGO_IMG);
    });
});
