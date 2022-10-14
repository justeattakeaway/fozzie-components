import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VRating from '../Rating.vue';
import i18n from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('Rating', () => {
    let propsData;
    let wrapper;
    const $tc = jest.fn();

    beforeEach(() => {
        propsData = {
            starRating: 2,
            maxStarRating: 5
        };
        wrapper = shallowMount(VRating, {
            propsData,
            localVue,
            i18n,
            mocks: {
                $tc
            }
        });
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('methods', () => {
        describe('`isRatingStarFilled`', () => {
            it('should exist', () => {
                expect(wrapper.vm.isRatingStarFilled).toBeDefined();
            });

            it('should contain a description `c-rating-description`', () => {
                // Act
                const result = wrapper.find('[data-test-id="c-rating-description"]');

                // Assert
                expect(result).toMatchSnapshot();
            });

            describe('when invoked', () => {
                it('should return truthy when the argument `star` is less than or equal to `starRating`', () => {
                    // Act
                    const star = 1;
                    const result = wrapper.vm.isRatingStarFilled(star);

                    // Assert
                    expect(result).toBe(true);
                });

                it.each([1, 2])('should return truthy when the argument star is %s', value => {
                    // Arrange
                    propsData = {
                        starRating: value,
                        maxStarRating: 5
                    };

                    // Act
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n,
                        mocks: {
                            $tc
                        }
                    });
                    const result = wrapper.vm.isRatingStarFilled(value);

                    // Assert
                    expect(result).toBe(true);
                });

                it('should return truthy when the argument `star` is equal to `starRating`', () => {
                    // Act
                    const star = 2;
                    const result = wrapper.vm.isRatingStarFilled(star);

                    // Assert
                    expect(result).toBe(true);
                });

                it('should return falsey when argument `star` is greater than `starRating`', () => {
                    // Act
                    const star = 3;
                    const result = wrapper.vm.isRatingStarFilled(star);

                    // Assert
                    expect(result).toBe(false);
                });
            });
        });
    });

    describe('computed', () => {
        describe('`getRatingDescription`', () => {
            it('should exist', () => {
                // Arrange
                propsData.starRating = 2;
                wrapper = shallowMount(VRating, {
                    propsData,
                    localVue,
                    i18n
                });

                // Act & Assert
                expect(wrapper.vm.getRatingDescription).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return a singular description if the rating is less than 2', () => {
                    // Arrange
                    propsData = {
                        starRating: 1
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toMatchSnapshot();
                });

                it('should return a plural description if the rating is greater than 1', () => {
                    // Arrange
                    propsData = {
                        starRating: 2
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toMatchSnapshot();
                });
            });
        });
    });
});
