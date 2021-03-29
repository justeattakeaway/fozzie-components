import { shallowMount } from '@vue/test-utils';
import StampCardPromotionCard from '../StampCardPromotionCard.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const icon = '__ICON__';
const url = '__URL__';

describe('contentCards › StampCardPromotionCard1', () => {
    it('should NOT render any test id attributes if `testId` prop not provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    icon
                }
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id]').exists()).toBeFalsy();
    });

    it('should render the test id attribute on the root element if `testId` prop provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    icon
                },
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBeTruthy();
    });

    it('should render the icon element if `card.icon` provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    icon
                },
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}-icon"]`).exists()).toBeTruthy();
    });

    it('should NOT render the icon element if `card.icon` not provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText
                },
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}-icon"]`).exists()).toBeFalsy();
    });

    it('should render the link element if `card.url` provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText,
                    url
                },
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}-link"]`).exists()).toBeTruthy();
    });

    it('should NOT render the link element if `card.url` not provided', () => {
        // Arrange & Act
        const wrapper = shallowMount(StampCardPromotionCard, {
            propsData: {
                card: {
                    ctaText
                },
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}-link"]`).exists()).toBeFalsy();
    });
});
