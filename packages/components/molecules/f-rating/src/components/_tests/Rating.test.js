import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VRating from '../Rating.vue';
import RatingSingleStarVariant from '../RatingSingleStarVariant.vue';
import RatingMultiStarVariant from '../RatingMultiStarVariant.vue';
import i18n from './helpers/setup';
import { VALID_STAR_RATING_DISPLAY_TYPE } from '../../constants';

const localVue = createLocalVue();
localVue.use(VueI18n);

const logMocks = {
    warn: jest.fn()
};

const createComponent = ({
    propsData,
    computed,
    mocks
} = {}) => shallowMount(VRating, {
    i18n,
    localVue,
    computed,
    propsData,
    mocks
});

describe('Rating', () => {
    let propsData;
    let mocks;
    let wrapper;
    const $tc = jest.fn();

    beforeEach(() => {
        propsData = {
            starRating: 2,
            maxStarRating: 5,
            ratingDisplayType: 'short'
        };

        mocks = {
            $log: logMocks,
            $tc
        };

        wrapper = createComponent({
            propsData,
            mocks
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed', () => {
        describe('`getRatingDescription`', () => {
            it('should exist', async () => {
                // Act & Assert
                expect(wrapper.vm.getRatingDescription).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return a singular description if the rating is equal to 1', async () => {
                    // Arrange
                    propsData = {
                        starRating: 1,
                        ratingDisplayType: 'short',
                        locale: 'en-GB'
                    };

                    wrapper = createComponent({
                        propsData
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toBe('1 star out of 5');
                });

                it.each([
                    [1.3, '1.3 stars out of 5'],
                    [0.5, '0.5 stars out of 5'],
                    [2, '2 stars out of 5']
                ])('should return a plural description if the rating is NOT equal to 1 `%s`', (type, expected) => {
                    // Arrange
                    propsData = {
                        starRating: type,
                        ratingDisplayType: 'short',
                        locale: 'en-GB'
                    };

                    wrapper = createComponent({
                        propsData
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toBe(expected);
                });
            });
        });

        describe('`getRatingVariant`', () => {
            it('should exist', () => {
                // Act & Assert
                expect(wrapper.vm.getRatingVariant).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and prop `isSingleStarVariant` is truthy', () => {
                    it('should return the single star rating variant: `rating-single-star`', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            ratingDisplayType: 'short',
                            isSingleStarVariant: true
                        };

                        wrapper = createComponent({
                            propsData
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
                            ratingDisplayType: 'short',
                            isSingleStarVariant: false
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act & Assert
                        expect(wrapper.findComponent(RatingMultiStarVariant).exists()).toBe(true);
                    });
                });
            });
        });

        describe('`hasRatingAvailable`', () => {
            it('should exist', () => {
                // Act & Assert
                expect(wrapper.vm.hasRatingAvailable).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and a `reviewCount` is truthy', () => {
                    beforeEach(() => {
                        propsData = {
                            starRating: 2,
                            reviewCount: 1,
                            ratingDisplayType: 'short',
                            locale: 'en-GB'
                        };

                        wrapper = createComponent({
                            propsData
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

                describe('and a `reviewCount` is falsey', () => {
                    beforeEach(() => {
                        propsData = {
                            starRating: 2,
                            reviewCount: 0,
                            ratingDisplayType: 'short'
                        };

                        wrapper = createComponent({
                            propsData
                        });
                    });

                    it('should return falsey', () => {
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

        describe('`shouldDisplayUserOwnRating`', () => {
            it('should exist', () => {
                // Act & Assert
                expect(wrapper.vm.shouldDisplayUserOwnRating).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and `isUserRating` is falsey and reviewCount is truthy', () => {
                    it('should return false', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 100
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act & Assert
                        expect(wrapper.vm.shouldDisplayUserOwnRating).toBe(false);
                    });
                });

                describe('and `hasRatingAvailable` is falsey and `isUserRating` is truthy', () => {
                    it('should return false', () => {
                        // Arrange
                        propsData = {
                            starRating: 0,
                            isUserRating: true
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act & Assert
                        expect(wrapper.vm.shouldDisplayUserOwnRating).toBe(false);
                    });
                });

                describe('and `hasRatingAvailable` & `isUserRating` are both truthy', () => {
                    it('should return true', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 100,
                            isUserRating: true
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act & Assert
                        expect(wrapper.vm.shouldDisplayUserOwnRating).toBe(true);
                    });
                });
            });
        });

        describe('`starRatingWithValidation`', () => {
            it('should exist', () => {
                // Act & Assert
                expect(wrapper.vm.starRatingWithValidation).toBeDefined();
            });

            describe('when invoked', () => {
                describe('and `starRating` is not within range', () => {
                    it.each([
                        [-1, 5],
                        [6, 5]
                    ])('should return 0', (starRating, maxStarRating) => {
                        // Arrange
                        propsData = {
                            starRating,
                            maxStarRating
                        };

                        wrapper = createComponent({
                            propsData,
                            mocks
                        });

                        // Act & Assert
                        expect(wrapper.vm.starRatingWithValidation).toBe(0);
                        expect(mocks.$log.warn).toHaveBeenCalled();
                    });
                });

                describe('and `starRating` is within range', () => {
                    it.each([
                        [0, 5],
                        [1, 5],
                        [2, 5],
                        [3, 5],
                        [4, 5],
                        [5, 5]
                    ])('should return the start Rating', (starRating, maxStarRating) => {
                        // Arrange
                        propsData = {
                            starRating,
                            maxStarRating
                        };

                        wrapper = createComponent({
                            propsData,
                            mocks
                        });

                        // Act & Assert
                        expect(wrapper.vm.starRatingWithValidation).toBe(starRating);
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
        });

        describe('`ratingDisplayType`', () => {
            it.each(VALID_STAR_RATING_DISPLAY_TYPE)('should allow correct value `%s`', displayType => {
                // Act
                const { validator } = VRating.props.ratingDisplayType;

                // Assert
                expect(validator(displayType)).toBe(true);
            });

            it('should be set to `short` by default', () => {
                // Act & Assert
                expect(VRating.props.ratingDisplayType.default).toBe('short');
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

                    wrapper = createComponent({
                        propsData
                    });

                    const result = wrapper.find('[data-test-id="c-rating-displayType"]');

                    // Assert
                    expect(result.exists()).toBe(true);
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

        describe('`isUserRating`', () => {
            it('should be set to false by default', () => {
                // Act & Assert
                expect(VRating.props.isUserRating.default).toBe(false);
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
                describe('and `hasRatingAvailable` is falsey', () => {
                    it('should return the correct translation reference', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 0,
                            ratingDisplayType: 'short',
                            locale: 'en-GB'
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe('No ratings yet');
                    });
                });

                describe('and `hasRatingAvailable` is truthy', () => {
                    it('should return the correct translation reference', () => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 499,
                            ratingDisplayType: 'medium',
                            locale: 'en-GB'
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe('2 of 5');
                    });
                });

                describe('and `ratingDisplayType` is passed through', () => {
                    it.each([
                        ['short', '499'],
                        ['medium', '2 of 5'],
                        ['long', 'View 499 reviews']
                    ])('should return the correct display type for each rating component', (type, expected) => {
                        // Arrange
                        propsData = {
                            starRating: 2,
                            reviewCount: 499,
                            ratingDisplayType: type,
                            locale: 'en-GB'
                        };

                        wrapper = createComponent({
                            propsData
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe(expected);
                    });
                });

                describe('and `ratingDisplayType` is not passed through', () => {
                    it('should return the default rating display type', () => {
                        wrapper = createComponent({
                            mocks: {
                                $t: () => '',
                                $log: logMocks
                            }
                        });

                        // Act
                        const result = wrapper.vm.getRatingDisplayFormat();

                        // Assert
                        expect(result).toBe('');
                    });
                });
            });
        });
    });
});
