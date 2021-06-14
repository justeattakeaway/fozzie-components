import { shallowMount } from '@vue/test-utils';
import MediaElement from '../MediaElement.vue';
import { ALIGN, FONT_SIZE } from '../../constants';

const mockTitle = '__TEST_TITLE__';
const mockText = '__TEST_TEXT__';
const mockImageUrl = '__TEST_IMAGE_URL__';

describe('MediaElement.vue', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        const propsData = {};
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
            [FONT_SIZE.SM, 'c-mediaElement-content--fontSizeSmall'],
            [FONT_SIZE.MD, 'c-mediaElement-content--fontSizeMedium'],
            [FONT_SIZE.LG, 'c-mediaElement-content--fontSizeLarge'],
            [FONT_SIZE.XL, 'c-mediaElement-content--fontSizeXLarge'],
            [FONT_SIZE.XXL, 'c-mediaElement-content--fontSizeXXLarge'],
            ['__TEST_DUMMY_VALUE__', 'c-mediaElement-content--fontSizeMedium']
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
