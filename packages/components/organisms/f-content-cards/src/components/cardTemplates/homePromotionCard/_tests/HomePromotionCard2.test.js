import { shallowMount } from '@vue/test-utils';
import HomePromotionCard2 from '../HomePromotionCard2.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const url = '__URL__';

describe('contentCards › HomePromotionCard2', () => {
    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                testId
            }
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should display a CTA link and label', () => {
        // Arrange
        const card = {
            ctaText,
            url
        };

        // Act
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                card,
                testId
            }
        });

        const cta = wrapper.find(`[data-test-id="${testId}--cta"]`);

        // Assert
        expect(cta.text()).toBe(ctaText);
        expect(cta.attributes('href')).toBe(url);
    });

    // Check contentBackgroundColour is the dominant factor
    describe('when `contentBackgroundColor` is "#000" and `backgroundColor` is "#fff" ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: '#fff',
                contentBackgroundColor: '#000'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    describe('when `contentBackgroundColor` is "#fff" and `backgroundColor` is "#000" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: '#000',
                contentBackgroundColor: '#fff'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    // Check fallback to backgroundColour
    describe('when `contentBackgroundColor` is undefined and `backgroundColor` is "#fff" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: '#fff'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    describe('when `contentBackgroundColor` is undefined and `backgroundColor` is "#000" ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: '#000'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    // Edge case checking luminosity differentiation between this and below case
    describe('when `contentBackgroundColor` is "#f05b14" and `backgroundColor` is undefined ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const card = {
                contentBackgroundColor: '#f05b14'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    describe('when `contentBackgroundColor` is "#f05c14" and `backgroundColor` is undefined ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {
                contentBackgroundColor: '#f05c14'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    // Check default is dark
    describe('when `contentBackgroundColor` is undefined and `backgroundColor` is undefined ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {};

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    // Check default is used when colours are invalid
    describe('when `contentBackgroundColor` is "invalid" and `backgroundColor` is "invalid" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: 'invalid',
                contentBackgroundColor: 'invalid'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard2--light': 'c-contentCards-homePromotionCard2--light'
                    }
                }
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });
});
