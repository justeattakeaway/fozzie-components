import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '../SkeletonLoader.vue';

describe('contentCards › SkeletonLoader', () => {
    it('should display a single SkeletonLoader card when invoked', () => {
        // Arrange & Act
        const wrapper = shallowMount(SkeletonLoader);

        // Assert
        expect(wrapper.findAll('[data-test-id="contentCard-skeletonLoader"]')).toHaveLength(1);
    });

    it('should show multiple SkeletonLoader cards when provided with a "count" prop', async () => {
        // Arrange
        await Promise.all([1, 5, 10].map(count => {
            // Act
            const wrapper = shallowMount(SkeletonLoader, {
                propsData: {
                    count
                }
            });

            // Assert
            return expect(Array.from(wrapper.findAll('[data-test-id="contentCard-skeletonLoader"]'))).toHaveLength(count);
        }));
    });
});
