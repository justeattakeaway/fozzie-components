import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VRatingFiveStarVariant from '../RatingFiveStarVariant.vue';
import i18n from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('RatingFiveStarVariant', () => {
    let propsData;
    let wrapper;
    const $tc = jest.fn();

    beforeEach(() => {
        propsData = {
            starRating: 2,
            maxStarRating: 5
        };
        wrapper = shallowMount(VRatingFiveStarVariant, {
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
                wrapper = shallowMount(VRatingFiveStarVariant, {
                    propsData,
                    localVue,
                    i18n
                });

                // Act & Assert
                expect(wrapper.vm.getRatingStarPercentage).toBeDefined();
            });

            describe('when invoked', () => {
                it('should return a correct calculated number from a combination of `starRating` and `maxStarRating`', () => {
                    // Arrange
                    propsData = {
                        starRating: 2
                    };
                    wrapper = shallowMount(VRatingFiveStarVariant, {
                        propsData,
                        localVue,
                        i18n
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingStarPercentage).toBe(40);
                });
            });
        });
    });
});
