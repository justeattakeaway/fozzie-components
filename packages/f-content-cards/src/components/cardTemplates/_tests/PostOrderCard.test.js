import { shallowMount } from '@vue/test-utils';
import PostOrderCard from '../PostOrderCard.vue';

const image = '__IMAGE__';
const icon = '__ICON__';
const ctaText = '__CTA_TEXT__';
const type = 'Post_Order_Card_1';

const card = {
    ctaText,
    icon,
    image,
    type
};

describe('contentCards › PostOrderCard', () => {
    it('should display the appropriate content when type is Post_Order_Card_1', () => {
        // Arrange & Act
        const wrapper = shallowMount(PostOrderCard, {
            propsData: {
                card,
                testId: 'foo'
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-postOrderCard-1"]').text()).toBe(ctaText);
    });

    it('should hide the heading element if the copy is unavailable', () => {
        // Arrange & Act
        const wrapper = shallowMount(PostOrderCard);

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-postOrderCard-title"]').exists()).toBe(false);
    });

    describe('condensed', () => {
        it('should apply the condensed class when no background image is available', () => {
            // Arrange & Act
            const wrapper = shallowMount(PostOrderCard, {
                propsData: {
                    card: {
                        icon,
                        type
                    }
                }
            });

            // Assert
            expect(wrapper.find('.c-postOrderCard--condensed').exists()).toBe(true);
        });

        it('should NOT apply the condensed class when imageUrl is provided', () => {
            // Arrange & Act
            const wrapper = shallowMount(PostOrderCard, {
                propsData: {
                    card: {
                        image,
                        icon,
                        type
                    }
                }
            });

            // Assert
            expect(wrapper.find('.c-postOrderCard--condensed').exists()).toBe(false);
        });

        it('should NOT apply the condensed class when extras.image_1 is provided', () => {
            // Arrange & Act
            const wrapper = shallowMount(PostOrderCard, {
                propsData: {
                    icon,
                    image,
                    type
                }
            });

            // Assert
            expect(wrapper.find('.c-postOrderCard--condensed').exists()).toBe(false);
        });
    });
});
