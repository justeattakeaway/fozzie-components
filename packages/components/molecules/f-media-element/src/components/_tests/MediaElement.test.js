import { shallowMount } from '@vue/test-utils';
import MediaElement from '../MediaElement.vue';
import {ALIGN, FONT_SIZE, MODIFIER_OPPOSITES_RULES_MAP, MODIFIER_RULES_MAP} from '../../constants';

const mockTitle = '__TEST_TITLE__';
const mockText = '__TEST_TEXT__';
const mockImageUrl = '__TEST_IMAGE_URL__';

describe('MediaElement.vue', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        const propsData = {
            title: mockTitle,
            text: mockText,
            imageUrl: mockImageUrl
        };
        const wrapper = shallowMount(MediaElement, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        it('should display the title prop value in a h3 when the title prop is set', () => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl
                }
            });

            // Act
            const textWrapper = wrapper.find('h3');

            // Assert
            expect(textWrapper.text()).toEqual(mockTitle);
        });

        it('should display the text prop value in a p tag when the text prop is set', () => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl
                }
            });

            // Act
            const textWrapper = wrapper.find('p');

            // Assert
            expect(textWrapper.text()).toEqual(mockText);
        });

        it.each([
            [ALIGN.LEFT, 'c-mediaElement-content--left'],
            [ALIGN.RIGHT, 'c-mediaElement-content--right'],
            [ALIGN.CENTER, 'c-mediaElement-content--center'],
            ['__TEST_DUMMY_VALUE__', 'c-mediaElement-content--left']
        ])('should when contentAlign prop is %s, set class %s', (contentAlignProp, contentAlignClass) => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl,
                    contentAlign: contentAlignProp
                },
                mocks: {
                    $style: {
                        [contentAlignClass]: contentAlignClass
                    }
                }
            });

            // Act
            const style = wrapper.find(`.${contentAlignClass}`);

            // Assert
            expect(style.exists()).toBe(true);
        });

        it.each([
            [ALIGN.LEFT, 'c-mediaElement-imgWrapper--left'],
            [ALIGN.RIGHT, 'c-mediaElement-imgWrapper--right'],
            [ALIGN.CENTER, 'c-mediaElement-imgWrapper--center'],
            ['__TEST_DUMMY_VALUE__', 'c-mediaElement-imgWrapper--left']
        ])('should when imageAlign prop is %s, set class %s', (imageAlignProp, imageAlignClass) => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl,
                    imageAlign: imageAlignProp
                },
                mocks: {
                    $style: {
                        [imageAlignClass]: imageAlignClass
                    }
                }
            });

            // Act
            const style = wrapper.find(`.${imageAlignClass}`);

            // Assert
            expect(style.exists()).toBe(true);
        });

        it.each([
            [FONT_SIZE.SM, 'c-mediaElement-contentFontSize--sm'],
            [FONT_SIZE.MD, 'c-mediaElement-contentFontSize--md'],
            [FONT_SIZE.LG, 'c-mediaElement-contentFontSize--lg'],
            [FONT_SIZE.XL, 'c-mediaElement-contentFontSize--xl'],
            [FONT_SIZE.XXL, 'c-mediaElement-contentFontSize--xxl'],
            ['__TEST_DUMMY_VALUE__', 'c-mediaElement-contentFontSize--md']
        ])('should when textSize prop is %s, set class %s', (textSizeProp, textSizeClass) => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl,
                    textSize: textSizeProp
                },
                mocks: {
                    $style: {
                        [textSizeClass]: textSizeClass
                    }
                }
            });

            // Act
            const style = wrapper.find(`.${textSizeClass}`);

            // Assert
            expect(style.exists()).toBe(true);
        });

        describe('flex ::', () => {
            it('should add a default class name when not set', () => {
                const className = 'c-mediaElement--row';
                // Arrange
                const wrapper = shallowMount(MediaElement, {
                    propsData: {
                        title: mockTitle,
                        text: mockText,
                        imageUrl: mockImageUrl
                    },
                    mocks: {
                        $style: {
                            [className]: className
                        }
                    }
                });

                // Act
                const style = wrapper.find(`.${className}`);

                // Assert
                expect(style.exists()).toBe(true);
            });

            it('should apply class with the default direction if default.column is true', () => {
                const className = 'c-mediaElement--col';
                // Arrange
                const wrapper = shallowMount(MediaElement, {
                    propsData: {
                        title: mockTitle,
                        text: mockText,
                        imageUrl: mockImageUrl,
                        flex: {
                            default: {
                                column: true,
                                reverse: false
                            }
                        }
                    },
                    mocks: {
                        $style: {
                            [className]: className
                        }
                    }
                });

                // Act
                const style = wrapper.find(`.${className}`);

                // Assert
                expect(style.exists()).toBe(true);
            });

            it('should apply class with reverse direction if default.reverse is true', () => {
                const className = 'c-mediaElement--row--reverse';
                // Arrange
                const wrapper = shallowMount(MediaElement, {
                    propsData: {
                        title: mockTitle,
                        text: mockText,
                        imageUrl: mockImageUrl,
                        flex: {
                            default: {
                                column: false,
                                reverse: true
                            }
                        }
                    },
                    mocks: {
                        $style: {
                            [className]: className
                        }
                    }
                });

                // Act
                const style = wrapper.find(`.${className}`);

                // Assert
                expect(style.exists()).toBe(true);
            });

            it.each([
                ['>', 'narrowMid'],
                ['>=', 'narrowMid'],
                ['<', 'narrowMid'],
                ['<=', 'narrowMid']
            ])('should apply class that applies column and reverse when %s %s screen size', (operator, size) => {
                const className = `c-mediaElement--${MODIFIER_RULES_MAP[operator]}--${size}--col--reverse`;
                // Arrange
                const wrapper = shallowMount(MediaElement, {
                    propsData: {
                        title: mockTitle,
                        text: mockText,
                        imageUrl: mockImageUrl,
                        flex: {
                            default: {
                                column: false,
                                reverse: false
                            },
                            modifier: {
                                rule: [
                                    operator,
                                    size
                                ],
                                column: true,
                                reverse: true
                            }
                        }
                    },
                    mocks: {
                        $style: {
                            [className]: className
                        }
                    }
                });

                // Act
                const style = wrapper.find(`.${className}`);

                // Assert
                expect(style.exists()).toBe(true);
            });

            it.each([
                ['>', 'narrowMid'],
                ['>=', 'narrowMid'],
                ['<', 'narrowMid'],
                ['<=', 'narrowMid']
            ])('should apply class that applies default column and reverse for opposite of %s %s screen size', (operator, size) => {
                const className = `c-mediaElement--${MODIFIER_OPPOSITES_RULES_MAP[operator]}--${size}--row`;
                // Arrange
                const wrapper = shallowMount(MediaElement, {
                    propsData: {
                        title: mockTitle,
                        text: mockText,
                        imageUrl: mockImageUrl,
                        flex: {
                            default: {
                                column: false,
                                reverse: false
                            },
                            modifier: {
                                rule: [
                                    operator,
                                    size
                                ],
                                column: true,
                                reverse: true
                            }
                        }
                    },
                    mocks: {
                        $style: {
                            [className]: className
                        }
                    }
                });

                // Act
                const style = wrapper.find(`.${className}`);

                // Assert
                expect(style.exists()).toBe(true);
            });
        });

    });

    describe('slot', () => {
        it('should display the contents of the slot when used', () => {
            // Arrange
            const wrapper = shallowMount(MediaElement, {
                propsData: {
                    title: mockTitle,
                    text: mockText,
                    imageUrl: mockImageUrl
                },
                slots: {
                    default: '<div data-test-id="__TEST_SLOT__"></div>'
                }
            });

            // Act
            const slotContent = wrapper.find('[data-test-id="__TEST_SLOT__"]');

            // Assert
            expect(slotContent.exists()).toBe(true);
        });
    });
});
