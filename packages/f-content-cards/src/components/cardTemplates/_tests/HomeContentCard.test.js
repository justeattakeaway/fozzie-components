import { shallowMount } from '@vue/test-utils';
import HomeContentCard from '../HomeContentCard.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const url = '__URL__';

const card = {
    ctaText,
    url
};

describe('contentCards › HomeContentCard', () => {
    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomeContentCard, {
            propsData: {
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should display a CTA link and label', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomeContentCard, {
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

    it('should apply given max-width to inner container', () => {
        // Arrange
        const containerMaxWidth = 1234;

        // Act
        const wrapper = shallowMount(HomeContentCard, {
            propsData: {
                testId,
                containerMaxWidth
            }
        });

        const styles = wrapper.find(`[data-test-id="${testId}--container"]`).attributes('style');

        // Assert
        expect(styles.indexOf(`max-width: ${containerMaxWidth}px;`)).toBe(0);
    });
});
