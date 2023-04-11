import { shallowMount, config } from '@vue/test-utils';
import Rating from '../skeletons/Rating.vue';


describe('SkeletonLoader :: Rating', () => {
    beforeEach(() => {
        config.provide = {};
    });

    it('should show 6 stars by default', () => {
        // arrage & act
        const wrapper = shallowMount(Rating);

        // assert
        expect(wrapper.text()).toBe('★★★★★★');
    });

    it('should show 5 stars when injected skeletonOptions use5Stars is enabled', () => {
        // arrage
        config.provide = { skeletonOptions: { use5Stars: true } };

        // act
        const wrapper = shallowMount(Rating);

        // assert
        expect(wrapper.text()).toBe('★★★★★');
    });

    it.each([undefined, null, 0, 1])('should fallback to 6 stars when injected skeletonOptions use5Stars is %p', use5Stars => {
        // arrage
        config.provide = { skeletonOptions: { use5Stars } };

        // act
        const wrapper = shallowMount(Rating);

        // assert
        expect(wrapper.text()).toBe('★★★★★★');
    });
});
