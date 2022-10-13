import { shallowMount } from '@vue/test-utils';
import VRating from '../Rating.vue';

describe('Rating', () => {
    it('should be defined', () => {
        const propsData = {
            starRating: 2
        };
        const wrapper = shallowMount(VRating, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('methods', () => {
        describe('`hasRating`', () => {
            let propsData;
            let wrapper;

            beforeEach(() => {
                propsData = {
                    starRating: 2,
                    maxStarRating: 5
                };
                wrapper = shallowMount(VRating, { propsData });
            });

            it('should exist', () => {
                expect(wrapper.vm.hasRating).toBeDefined();
            });

            it('should contain a description `c-rating-description`', () => {
                // Act
                const result = wrapper.find('[data-test-id="c-rating-description"]');

                // Assert
                expect(result).toMatchSnapshot();
            });

            describe('when invoked', () => {
                it('should return truthy when `starRating` is less than or equal to `rating`', () => {
                    // Act
                    const result = wrapper.vm.hasRating(2);

                    // Assert
                    expect(result).toBe(true);
                });

                it('should return falsey when `starRating` is more than `rating`', () => {
                    // Act
                    const result = wrapper.vm.hasRating(3);

                    // Assert
                    expect(result).toBe(false);
                });
            });
        });
    });

    describe('computed', () => {
        describe('`setRatingDescription`', () => {
            let propsData;
            let wrapper;

            beforeEach(() => {
                propsData = {
                    starRating: 2,
                    maxStarRating: 5
                };
                wrapper = shallowMount(VRating, { propsData });
            });

            it('should exist', () => {
                expect(wrapper.vm.setRatingDescription).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return a singular description if the rating is less than 2', () => {
                    // Arrange
                    const description = 'star out of';
                    propsData = {
                        starRating: 1
                    };
                    wrapper = shallowMount(VRating, { propsData });

                    // Act & Assert
                    expect(wrapper.vm.setRatingDescription).toBe(description);
                });

                it('should return a plural description if the rating is greater than 1', () => {
                    // Arrange
                    const description = 'stars out of';
                    propsData = {
                        starRating: 2
                    };
                    wrapper = shallowMount(VRating, { propsData });

                    // Act & Assert
                    expect(wrapper.vm.setRatingDescription).toBe(description);
                });
            });
        });
    });
});
