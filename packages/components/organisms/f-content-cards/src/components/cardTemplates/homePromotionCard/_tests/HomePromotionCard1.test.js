import { shallowMount } from '@vue/test-utils';
import Color from 'color';
import HomePromotionCard1 from '../HomePromotionCard1.vue';

const testId = '__TEST_ID__';
const ctaText = '__CTA_TEXT__';
const url = '__URL__';

const provide = {
    emitCardClick: jest.fn()
};

describe('contentCards › HomePromotionCard1', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should apply the given test ID', () => {
        // Arrange & Act
        const wrapper = shallowMount(HomePromotionCard1, {
            propsData: {
                testId
            },
            provide
        });

        // Assert
        expect(wrapper.find(`[data-test-id="${testId}"]`).exists()).toBe(true);
    });

    it('should apply given max-width to inner container', () => {
        // Arrange
        const containerMaxWidth = 1234;

        // Act
        const wrapper = shallowMount(HomePromotionCard1, {
            propsData: {
                testId,
                containerMaxWidth
            },
            provide
        });

        const styles = wrapper.find(`[data-test-id="${testId}--container"]`).attributes('style');

        // Assert
        expect(styles.indexOf(`max-width: ${containerMaxWidth}px;`)).toBe(0);
    });

    it('should render the container as a link', () => {
        // Arrange
        const card = {
            ctaText,
            url
        };

        // Act
        const wrapper = shallowMount(HomePromotionCard1, {
            propsData: {
                card,
                testId
            },
            provide
        });

        const container = wrapper.find(`[data-test-id="${testId}"]`);

        // Assert
        expect(container.element.tagName).toBe('A');
        expect(container.attributes('href')).toBe(url);
    });

    it('should call the injected `emitCardClick` event when clicked', () => {
        // Arrange
        const card = {
            ctaText,
            url
        };
        const wrapper = shallowMount(HomePromotionCard1, {
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
        expect(provide.emitCardClick).toHaveBeenCalledWith(card);
    });

    describe('when `backgroundColor` is "#000" ::', () => {
        it('should set the `background` css property appropriately in a style attribute', () => {
            // Arrange
            const backgroundColor = '#000';
            const card = {
                backgroundColor
            };
            const expectedColour = new Color(backgroundColor);

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    testId,
                    card
                },
                provide
            });

            // Assert
            const styles = wrapper.find(`[data-test-id="${testId}"]`).attributes('style');
            const [, backgroundColour] = styles.match(/background: ([^;]+);/);

            // Check contrast is 1 - e.g. colour is identical
            expect(expectedColour.contrast(new Color(backgroundColour))).toBe(1);
        });
    });

    describe('when `backgroundColor` is undefined ::', () => {
        it('should not set the `background` css property in a style attribute', () => {
            // Arrange
            const card = {};

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    testId,
                    card
                },
                provide
            });

            // Assert
            const styles = wrapper.find(`[data-test-id="${testId}"]`).attributes('style') || '';
            expect(styles.match(/background: ([^;]+);/)).toBeNull();
        });
    });

    describe('when `backgroundColor` is `#000` ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const backgroundColor = '#000';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    describe('when `backgroundColor` is "#fff" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const backgroundColor = '#fff';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    describe('when `backgroundColor` is "black" ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const backgroundColor = 'black';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    describe('when `backgroundColor` is "white" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const backgroundColor = 'white';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    describe('when `backgroundColor` is "#f05b14" ::', () => {
        it('should add the light subtitle class', () => {
            // Arrange
            const backgroundColor = '#f05b14';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(true);
        });
    });

    describe('when `backgroundColor` is "#f05c14" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const backgroundColor = '#f05c14';
            const card = {
                backgroundColor
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBe(false);
        });
    });

    describe('when `backgroundColor` is undefined ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {};

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBeFalsy();
        });
    });

    describe('when `backgroundColor` is "invalid" ::', () => {
        it('should NOT add the light subtitle class', () => {
            // Arrange
            const card = {
                backgroundColor: 'invalid'
            };

            // Act
            const wrapper = shallowMount(HomePromotionCard1, {
                propsData: {
                    card
                },
                mocks: {
                    $style: {
                        'c-contentCards-homePromotionCard1-subtitle--light': 'c-contentCards-homePromotionCard1-subtitle--light'
                    }
                },
                provide
            });

            // Assert
            const lightSubtitle = wrapper.find('.c-contentCards-homePromotionCard1-subtitle--light');
            expect(lightSubtitle.exists()).toBeFalsy();
        });
    });
});
