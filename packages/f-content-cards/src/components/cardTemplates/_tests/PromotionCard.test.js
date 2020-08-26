import { shallowMount } from '@vue/test-utils';
import PromotionCard from '../PromotionCard.vue';

const ctaText = '__CTA_TEXT__';

describe('contentCards › PromotionCard1', () => {
    it('should display the appropriate content when type is promotion_card_1', () => {
        // Arrange & Act
        const wrapper = shallowMount(PromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    type: 'Promotion_Card_1'
                },
                testId: 'foo'
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-promoCard-1"]').text()).toBe(ctaText);
    });

    it('should display the appropriate content when type is promotion_card_2', () => {
        // Arrange & Act
        const wrapper = shallowMount(PromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    type: 'Promotion_Card_2'
                },
                testId: 'foo'
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-promoCard-2"]').text()).toBe(ctaText);
    });
});
