import { shallowMount } from '@vue/test-utils';
import Card from '../Card.vue';

const $style = {
    'c-card--rounded': 'c-card--rounded',
    'c-card--outline': 'c-card--outline',
    'c-card--pageContentWrapper': 'c-card--pageContentWrapper',
    'c-card-heading--centerAligned': 'c-card-heading--centerAligned',
    'c-card-heading--rightAligned': 'c-card-heading--rightAligned'
};

describe('Card', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(Card, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('cardTitle', () => {
        it('should not be visible if it’s not set in props', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Card, { propsData });
            const cardTitleElement = wrapper.find('[data-test-id="card-heading"]');

            // Assert
            expect(cardTitleElement.exists()).toBe(false);
        });

        it('should be visible if it’s set in props', () => {
            // Arrange
            const propsData = {
                cardHeading: 'Test card title'
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });
            const cardTitleElement = wrapper.find('[data-test-id="card-heading"]');

            // Assert
            expect(cardTitleElement.text()).toBe(propsData.cardHeading);
        });

        it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])('should set the tag to be %s, as passed in the `cardHeading` prop', headingTag => {
            // Arrange
            const propsData = {
                cardHeading: 'Test card title',
                cardHeadingTag: headingTag
            };

            // Act
            const wrapper = shallowMount(Card, { propsData });
            const cardTitle = wrapper.find('[data-test-id="card-heading"]');

            // Assert
            expect(cardTitle.element.tagName.toLowerCase()).toBe(headingTag);
        });
    });

    describe('props', () => {
        describe.each([
            ['hasOutline', 'c-card--outline'],
            ['isPageContentWrapper', 'c-card--pageContentWrapper']
        ])('%s', (propKey, cssClass) => {
            it(`should not apply ${cssClass} to the card if it is not set`, () => {
                // Arrange & Act
                const wrapper = shallowMount(Card, { propsData: {} });

                // Assert
                expect(wrapper.attributes('class')).not.toContain(cssClass);
            });

            it(`should apply ${cssClass} class to the card if set to true`, () => {
                // Arrange & Act
                const wrapper = shallowMount(Card, {
                    propsData: {
                        [propKey]: true
                    },
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).toContain(cssClass);
            });

            it(`should not apply ${cssClass} class to the card if set to false`, () => {
                // Arrange & Act
                const wrapper = shallowMount(Card, {
                    propsData: {
                        [propKey]: false
                    },
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).not.toContain(cssClass);
            });
        });

        describe('cardHeadingPosition', () => {
            it('should default to `left` if it is not set', () => {
                // Arrange & Act
                const wrapper = shallowMount(Card, { propsData: {} });

                // Assert
                expect(wrapper.vm.cardHeadingPosition).toBe('left');
            });

            it.each([
                ['c-card-heading--centerAligned', 'center'],
                ['c-card-heading--rightAligned', 'right']
            ])('should add %s class to the heading if `cardHeadingPosition` prop is set to %s', (cssClass, propValue) => {
                // Arrange & Act
                const wrapper = shallowMount(Card, {
                    propsData: {
                        cardHeadingPosition: propValue,
                        cardHeading: 'Test Heading'
                    },
                    mocks: {
                        $style
                    }
                });
                const testedElement = wrapper.find('[data-test-id="card-heading"]');

                // Assert
                expect(testedElement.attributes('class')).toContain(cssClass);
            });

            it('should only allow `left`, `right` or `center` to be passed in.', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                const position = wrapper.vm.$options.props.cardHeadingPosition;

                // Assert
                expect(position.validator('invalid')).toBeFalsy();
                expect(position.validator('left')).toBeTruthy();
                expect(position.validator('right')).toBeTruthy();
                expect(position.validator('center')).toBeTruthy();
            });
        });


        describe('cardHeadingTag', () => {
            it('should default to `h1` if it is not set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                // Assert
                expect(wrapper.vm.cardHeadingTag).toBe('h1');
            });

            it('should only allow `h1`, `h2`, `h3`, `h4`, `h5` or `h6` to be passed in', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(Card, { propsData });

                const heading = wrapper.vm.$options.props.cardHeadingTag;

                // Assert
                expect(heading.validator('h100')).toBeFalsy();
                expect(heading.validator('h1')).toBeTruthy();
                expect(heading.validator('h2')).toBeTruthy();
                expect(heading.validator('h3')).toBeTruthy();
                expect(heading.validator('h4')).toBeTruthy();
                expect(heading.validator('h5')).toBeTruthy();
                expect(heading.validator('h6')).toBeTruthy();
            });
        });
    });

    describe.each([
        [true, true],
        [false, false]
    ])('if `hasFullWidthFooter` prop is %s', (passedValue, expected) => {
        // Arrange
        const propsData = {
            hasFullWidthFooter: passedValue
        };

        // Act
        const wrapper = shallowMount(Card, { propsData });

        // Act
        const testedElement = wrapper.find('[data-test-id="card-footer"]');

        it(`should ${wrapper.vm.hasFullWidthFooter ? '' : 'not '}display a bottom positioned full width element`, () => {
            expect(testedElement.exists()).toBe(expected);
        });
    });
});
