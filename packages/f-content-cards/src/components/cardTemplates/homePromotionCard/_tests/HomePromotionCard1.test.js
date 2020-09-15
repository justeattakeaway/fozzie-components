import { shallowMount } from '@vue/test-utils';
import HomePromotionCard1 from '../HomePromotionCard1.vue';

const testId = '__TEST_ID__';

describe('contentCards › HomePromotionCard1', () => {
    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard1, {
            propsData: {
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should apply given max-width to inner container', () => {
        // Arrange
        const containerMaxWidth = 1234;

        // Act
        const wrapper = shallowMount(HomePromotionCard1, {
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
