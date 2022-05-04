import { mount } from '@vue/test-utils';
import VoucherCard from '../VoucherCard.vue';

const MOCK_CARD = {
    image: 'https://example.com/image.jpg',
    icon: 'https://example.com/logo.jpg',
    title: '__TEST_TITLE__',
    subtitle: '__TEST_SUBTITLE__',
    description: ['__TEST_DESCRIPTION__'],
    ctaText: '__TEST_CTA_TEXT__',
    url: 'https://example.com',
    voucherCode: 'SPECIALVOUCHER'
};
const MOCK_COPY_LABEL = 'Copy Code';
const MOCK_COPY_LABEL_COPIED = 'Offer code copied';

describe('VoucherCard.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange
        wrapper = mount(VoucherCard, {
            provide: {
                emitCardView: jest.fn(),
                emitCardClick: jest.fn(),
                emitVoucherCodeClick: jest.fn(),
                copy: {
                    copyCodeLabel: MOCK_COPY_LABEL,
                    codeCopiedLabel: MOCK_COPY_LABEL_COPIED
                }
            },
            propsData: {
                card: MOCK_CARD
            }
        });
    });

    it('should display the cards image when card is passed to prop', () => {
        // Act
        const image = wrapper.find('[data-test-id="content-card-background-image"]');

        // Assert
        expect(image.attributes('src')).toEqual(MOCK_CARD.image);
    });

    it('should display the restaurant logo when card is passed to prop', () => {
        // Act
        const logo = wrapper.find('[data-test-id="content-card-restaurant-logo"]');

        // Assert
        expect(logo.attributes('src')).toEqual(MOCK_CARD.icon);
    });

    it('should display the title when card is passed to prop', () => {
        // Act
        const title = wrapper.find('[data-test-id="content-card-title"]');

        // Assert
        expect(title.text()).toEqual(MOCK_CARD.title);
    });

    it('should display the subtitle when card is passed to prop', () => {
        // Act
        const subtitle = wrapper.find('[data-test-id="content-card-subtitle"]');

        // Assert
        expect(subtitle.text()).toEqual(MOCK_CARD.subtitle);
    });

    it('should display the description when card is passed to prop', () => {
        // Act
        const description = wrapper.find('[data-test-id="content-card-description-item"]');

        // Assert
        expect(description.text()).toEqual(MOCK_CARD.description[0]);
    });

    it('should display the voucher code when card is passed to prop', () => {
        // Act
        const code = wrapper.find('[data-test-id="contentCard-voucher-card-code"]');

        // Assert
        expect(code.text()).toEqual(MOCK_CARD.voucherCode);
    });

    it('should copy code label when card is passed to the prop', () => {
        // Act
        const label = wrapper.find('[data-test-id="contentCard-not-copied-label"]');

        // Assert
        expect(label.text()).toEqual(MOCK_COPY_LABEL);
    });
});
