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
        describe('`hasRating`', () => {
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
                    const description = '1 star out of 5';
                    propsData = {
                        starRating: 1
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toBe(description);
                });

                it('should return a plural description if the rating is greater than 1', () => {
                    // Arrange
                    const description = '2 stars out of 5';
                    propsData = {
                        starRating: 2
                    };
                    wrapper = shallowMount(VRating, {
                        propsData,
                        localVue,
                        i18n
                    });

                    // Act & Assert
                    expect(wrapper.vm.getRatingDescription).toBe(description);
                });
            });
        });
    });
});
