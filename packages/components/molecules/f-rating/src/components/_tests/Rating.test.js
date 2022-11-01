import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VRating from '../Rating.vue';
import RatingSingleStarVariant from '../RatingSingleStarVariant.vue';
import RatingMultiStarVariant from '../RatingMultiStarVariant.vue';
import i18n from './helpers/setup';
import { VALID_STAR_RATING_DISPLAY_TYPE } from '../../constants';

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
                    expect(wrapper.vm.getRatingDescription).toBe('1 star out of 5');
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
                    expect(wrapper.vm.getRatingDescription).toBe('2 stars out of 5');
                });
            });
        });

        describe('`setRatingVariant`', () => {
            it('should exist', () => {
                // Arrange
                propsData.starRating = 2;
                wrapper = shallowMount(VRating, {
                    propsData,
                    localVue,
                    i18n
                });

                // Act & Assert
                expect(wrapper.vm.setRatingVariant).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and prop `isSingleStarVariant` is truthy', () => {
                    it('should return the single star rating variant: `rating-single-star`', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            isSingleStarVariant: true
                        };
                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n
                        });

                        // Act & Assert
                        expect(wrapper.findComponent(RatingSingleStarVariant).exists()).toBe(true);
                    });
                });

                describe('and prop `isSingleStarVariant` is falsey', () => {
                    it('should return a multi star rating variant: `rating-multi-star`', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            isSingleStarVariant: false
                        };
                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n
                        });

                        // Act & Assert
                        expect(wrapper.findComponent(RatingMultiStarVariant).exists()).toBe(true);
                    });
                });
            });
        });

        describe('`hasRatingAvailable`', () => {
            it('should exist', () => {
                // Arrange
                propsData.starRating = 2;
                wrapper = shallowMount(VRating, {
                    propsData,
                    localVue,
                    i18n
                });

                // Act & Assert
                expect(wrapper.vm.hasRatingAvailable).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and a rating type is available', () => {
                    beforeEach(() => {
                        propsData.starRating = 2;
                        propsData.ratingDisplayType = 'short';
                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n
                        });
                    });

                    it('should return truthy', () => {
                        // Act & Assert
                        expect(wrapper.vm.hasRatingAvailable).toBe(true);
                    });

                    it('should enable the visually hidden description', () => {
                        // Act
                        const result = wrapper.find('[data-test-id="c-rating-description"]');

                        // Act & Assert
                        expect(result).toMatchSnapshot();
                    });
                });

                describe('and a rating type is set to `noRating`', () => {
                    beforeEach(() => {
                        propsData.starRating = 2;
                        propsData.ratingDisplayType = 'noRating';
                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n
                        });
                    });

                    it('should return truthy', () => {
                        // Act & Assert
                        expect(wrapper.vm.hasRatingAvailable).toBe(false);
                    });

                    it('should disable the visually hidden description', () => {
                        // Act
                        const result = wrapper.find('[data-test-id="c-rating-description"]').exists();

                        // Act & Assert
                        expect(result).toBe(false);
                    });
                });
            });
        });
    });

    describe('props', () => {
        describe('`starRatingSize`', () => {
            it('should set a default value of `small`', () => {
                // Act & Assert
                expect(VRating.props.starRatingSize.default).toBe('small');
            });

            it.each(['small', 'medium', 'large'])('should allow value `%s`', ratingSize => {
                // Act
                const { validator } = VRating.props.starRatingSize;

                // Assert
                expect(validator(ratingSize)).toBe(true);
            });

            it('should NOT allow invalid props', () => {
                // Arrange
                const { validator } = VRating.props.starRatingSize;

                // Act & Assert
                expect(validator('supernova')).toBe(false);
            });
        });

        describe('`starRating`', () => {
            it('should be required', () => {
                // Act & Assert
                expect(VRating.props.starRating.required).toBe(true);
            });

            it.each([0, 1, 2, 3, 4, 5])('should allow value `%s`', rating => {
                // Act
                const { validator } = VRating.props.starRating;

                // Assert
                expect(validator(rating)).toBe(true);
            });

            it('should NOT only allow values outside `0 - 5`', () => {
                // Arrange
                const { validator } = VRating.props.starRating;

                // Act & Assert
                expect(validator(6)).toBe(false);
            });
        });

        describe('`ratingDisplayType`', () => {
            it.each(VALID_STAR_RATING_DISPLAY_TYPE)('should allow correct value `%s`', displayType => {
                // Act
                const { validator } = VRating.props.ratingDisplayType;

                // Assert
                expect(validator(displayType)).toBe(true);
            });

            describe('when `ratingDisplayType` is truthy', () => {
                it('should display descriptive content', () => {
                    // Arrange & Act
                    const { validator } = VRating.props.ratingDisplayType;
                    validator('short');

                    propsData = {
                        starRating: 2,
                        maxStarRating: 5,
                        ratingDisplayType: 'short'
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n,
                        mocks: {
                            $tc
                        }
                    });

                    const result = wrapper.find('[data-test-id="c-rating-displayType"]');

                    // Assert
                    expect(result.exists()).toBe(true);
                });
            });

            describe('when `ratingDisplayType` is falsey', () => {
                it('should not display descriptive content', () => {
                    // Arrange & Act
                    propsData = {
                        starRating: 2,
                        maxStarRating: 5,
                        ratingDisplayType: null
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n,
                        mocks: {
                            $tc
                        }
                    });

                    const result = wrapper.find('[data-test-id="c-rating-displayType"]');

                    // Assert
                    expect(result.exists()).toBe(false);
                });
            });
        });

        describe('`isSingleStarVariant`', () => {
            it('should be set to false by default', () => {
                // Act & Assert
                expect(VRating.props.isSingleStarVariant.default).toBe(false);
            });
        });

        describe('`maxStarRating`', () => {
            it('should be set to 5 by default', () => {
                // Act & Assert
                expect(VRating.props.maxStarRating.default).toBe(5);
            });

            describe('validator', () => {
                it('should only allow positive  integers', () => {
                    // Act
                    const { validator } = VRating.props.maxStarRating;

                    // Assert
                    expect(validator(3)).toBe(true);
                });

                it('should not allow decimal placed numbers', () => {
                    // Act
                    const { validator } = VRating.props.maxStarRating;

                    // Assert
                    expect(validator(3.5)).toBe(false);
                });

                it.each([0, -1])('should not allow integer values at zero or below', value => {
                    // Act
                    const { validator } = VRating.props.maxStarRating;

                    // Assert
                    expect(validator(value)).toBe(false);
                });
            });
        });
    });

    describe('methods', () => {
        describe('`getRatingDisplayFormat`', () => {
            it('should exist', () => {
                // Act & Assert
                expect(wrapper.vm.getRatingDisplayFormat).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and `ratingDisplayType` is passed through', () => {
                    it.each([
                        ['noRating', 'No ratings yet'],
                        ['short', '499'],
                        ['medium', '2 of 5'],
                        ['long', 'View 499 reviews']
                    ])('should return the correct display type for each rating component', (type, expected) => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 499,
                            ratingDisplayType: type
                        };

                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe(expected);
                    });
                });

                describe('and `ratingDisplayType` is not passed through', () => {
                    it('should return the default rating display type', () => {
                        wrapper = shallowMount(VRating, {
                            propsData,
                            localVue,
                            i18n,
                            mocks: {
                                $t: () => null
                            }
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe(null);
                    });
                });
            });
        });
    });
});
