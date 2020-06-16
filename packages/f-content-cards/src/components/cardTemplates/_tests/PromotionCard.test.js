import { shallowMount } from '@vue/test-utils';
import PromotionCard from '../PromotionCard.vue';

const button = '__BUTTON__';

const card = {
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: 'Promotion_Card_1' // eslint-disable-line camelcase
    }
};

describe('contentCards › PromotionCard1', () => {
    it('should display the appropriate content when type is promotion_card_1', () => {
        // Arrange & Act
        const wrapper = shallowMount(PromotionCard, {
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-promoCard-1"]').text()).toBe(button);
    });

    it('should display the appropriate content when type is promotion_card_2', () => {
        // Arrange & Act
        const wrapper = shallowMount(PromotionCard, {
            propsData: {
                card: {
                    extras: {
                        ...card.extras,
                        custom_card_type: 'Promotion_Card_2' // eslint-disable-line
                    }
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-promoCard-2"]').text()).toBe(button);
    });

    it('should fallback to linkText if button copy is not provided', () => {
        // Arrange
        const linkText = '__LINK_TEXT__';

        // Act
        const wrapper = shallowMount(PromotionCard, {
            propsData: {
                card: {
                    linkText,
                    extras: {
                        custom_card_type: 'Promotion_Card_1' // eslint-disable-line
                    }
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-promoCard-1"]').text()).toBe(linkText);
    });
});
