import { shallowMount } from '@vue/test-utils';
import PostOrderCard from '../PostOrderCard.vue';

const imageUrl = '__IMAGE_URL__';
const image = '__IMAGE_1__';
const icon = '__ICON_1__';
const button = '__BUTTON__';
const linkText = '__LINK_TEXT__';
const customCardType = 'Post_Order_Card_1';

const card = {
    linkText,
    extras: {
        icon_1: icon, // eslint-disable-line camelcase
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: customCardType // eslint-disable-line camelcase
    }
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
                },
                testId: 'foo'
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="contentCard-postOrderCard-1"]').text()).toBe(linkText);
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
                        extras: {
                            icon_1: icon, // eslint-disable-line camelcase
                            custom_card_type: customCardType // eslint-disable-line camelcase
                        }
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
                        imageUrl,
                        extras: {
                            icon_1: icon, // eslint-disable-line camelcase
                            custom_card_type: customCardType // eslint-disable-line camelcase
                        }
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
                    card: {
                        extras: {
                            icon_1: icon, // eslint-disable-line camelcase
                            image_1: image, // eslint-disable-line camelcase
                            custom_card_type: customCardType // eslint-disable-line camelcase
                        }
                    }
                }
            });

            // Assert
            expect(wrapper.find('.c-postOrderCard--condensed').exists()).toBe(false);
        });
    });
});
