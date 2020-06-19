import { shallowMount } from '@vue/test-utils';
import PostOrderCard from '../PostOrderCard.vue';

const button = '__BUTTON__';
const linkText = '__LINK_TEXT__';
const customCardType = 'Post_Order_Card_1';

const card = {
    linkText,
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: customCardType // eslint-disable-line camelcase
    }
};

describe('contentCards › PostOrderCard', () => {
    it('should display the appropriate content when type is Post_Order_Card_1', () => {
        // Arrange & Act
        const wrapper = shallowMount(PostOrderCard, {
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-postOrderCard-1"]').text()).toBe(button);
    });

    it('should fallback to linkText if button_1 is unavailable', () => {
        // Arrange & Act
        const wrapper = shallowMount(PostOrderCard, {
            propsData: {
                card: {
                    linkText,
                    extras: {
                        custom_card_type: customCardType // eslint-disable-line camelcase
                    }
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-postOrderCard-1"]').text()).toBe(linkText);
    });

    it('should hide the heading element if the copy is unavailable', () => {
        // Arrange & Act
        const wrapper = shallowMount(PostOrderCard);

        // Assert
        expect(wrapper.find('h2').exists()).toBe(false);
    });
});
