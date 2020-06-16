import { shallowMount } from '@vue/test-utils';
import PostOrderCard from '../PostOrderCard.vue';

const button = '__BUTTON__';

const card = {
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: 'Post_Order_Card_1' // eslint-disable-line camelcase
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
});
