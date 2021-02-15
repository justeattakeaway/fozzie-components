import { shallowMount } from '@vue/test-utils';
import HomePromotionCard2 from '../HomePromotionCard2.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const url = '__URL__';

const provide = {
    emitCardView: jest.fn(),
    emitCardClick: jest.fn()
};

describe('contentCards › HomePromotionCard2', () => {
    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                testId
            },
            provide
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should call the injected `emitCardView` event when mounted', () => {
        // Arrange & Act
        shallowMount(HomePromotionCard2, {
            propsData: {
                testId
            },
            provide
        });

        // Assert
        expect(provide.emitCardView).toHaveBeenCalled();
    });

    it('should display a CTA label', () => {
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
            },
            provide
        });

        const cta = wrapper.find(`[data-test-id="${testId}--cta"]`);

        // Assert
        expect(cta.text()).toBe(ctaText);
    });

    it('should render the container as a link', () => {
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
            },
            provide
        });

        const container = wrapper.find(`[data-test-id="${testId}"]`);

        // Assert
        expect(container.attributes('href')).toBe(url);
    });

    describe('when `no-link` prop is truthy', () => {
        it('should NOT render the container as a link', () => {
            // Arrange
            const card = {
                ctaText,
                url
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard2, {
                propsData: {
                    card,
                    testId,
                    noLink: true
                },
                provide
            });

            const container = wrapper.find(`[data-test-id="${testId}"]`);

            // Assert
            expect(container.attributes('href')).toBeUndefined();
        });
    });

    it('should call the injected `emitCardClick` event when clicked', () => {
        // Arrange
        const card = {
            ctaText,
            url
        };
        const wrapper = shallowMount(HomePromotionCard2, {
            propsData: {
                card,
                testId
            },
            provide
        });

        // Act
        wrapper.find(`[data-test-id="${testId}"]`).trigger('click');

        // Assert
        expect(provide.emitCardClick).toHaveBeenCalled();
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
                },
                provide
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
                },
                provide
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
                },
                provide
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
                },
                provide
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
                },
                provide
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
                },
                provide
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
                },
                provide
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
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard2--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });
});
