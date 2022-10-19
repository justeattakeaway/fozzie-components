import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VRating from '../Rating.vue';
import i18n from './helpers/setup';
import { VALID_STAR_RATING_SIZES } from '../../constants';

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
        describe('`getRatingStarPercentage`', () => {
            it('should exist', () => {
                // Arrange
                propsData.starRating = 2;
                wrapper = shallowMount(VRating, {
                    propsData,
                    localVue,
                    i18n
                });

                // Act & Assert
                expect(wrapper.vm.getRatingStarPercentage).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return a percentage from a combination of `starRating` and `maxStarRating`', () => {
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
                    expect(wrapper.vm.getRatingStarPercentage).toBe('width: 40%');
                });
            });
        });

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

    describe('props', () => {
        describe('`starRatingSize`', () => {
            it('should set a default value of `small`', () => {
                // Act & Assert
                expect(VRating.props.starRatingSize.default).toBe('small');
            });

            it.each(VALID_STAR_RATING_SIZES)('should allow valid type prop of `%s`', type => {
                // Act
                const { validator } = VRating.props.starRatingSize;

                // Arrange
                expect(validator(type)).toBe(true);
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
    });
});
