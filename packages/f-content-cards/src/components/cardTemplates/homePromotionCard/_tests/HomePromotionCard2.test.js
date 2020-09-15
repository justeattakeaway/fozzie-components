import { shallowMount } from '@vue/test-utils';
import HomePromotionCard2 from '../HomePromotionCard2.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const url = '__URL__';

const card = {
    ctaText,
    url
};

describe('contentCards › HomePromotionCard2', () => {
    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should display a CTA link and label', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                card,
                testId
            }
        });

        const cta = wrapper.find(`[data-test-id="${testId}--cta"]`);

        // Assert
        expect(cta.text()).toBe(ctaText);
        expect(cta.attributes('href')).toBe(url);
    });
});
