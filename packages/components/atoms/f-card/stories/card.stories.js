import { withA11y } from '@storybook/addon-a11y';
import Card from '../src/components/Card.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y],
    parameters: {
        backgrounds: {
            values: [
                { name: 'Grey', value: '#f5f5f5' },
                { name: 'Dark', value: '#333' }
            ],
            default: 'Grey'
        }
    }
};

export const CardComponent = (args, { argTypes }) => ({
    components: { Card },
    props: Object.keys(argTypes),
    template:
        `<card
            :card-heading="cardHeading"
            :card-heading-position="cardHeadingPosition"
            :card-heading-tag="cardHeadingTag"
            :card-heading-size="cardHeadingSize"
            :card-size-custom="cardSizeCustom"
            :has-outline="hasOutline"
            :is-page-content-wrapper="isPageContentWrapper"
            :has-inner-spacing-large="hasInnerSpacingLarge"
            :has-full-width-footer="hasFullWidthFooter">
            <p>Some Card Content</p>
            <template v-slot:cardFooter>
                    <p>I am a bottom positioned full width element</p>
            </template>
        </card>`
});

CardComponent.args = {
    cardHeading: 'My Card Heading',
    cardHeadingPosition: 'left',
    cardHeadingTag: 'h1',
    cardHeadingSize: '',
    hasOutline: false,
    isPageContentWrapper: false,
    hasFullWidthFooter: false,
    hasInnerSpacingLarge: false,
    cardSizeCustom: 'medium'
};

CardComponent.argTypes = {
    cardHeadingPosition: {
        control: { type: 'select', options: ['left', 'center', 'right'] }
    },
    cardHeadingTag: {
        control: { type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
    },
    cardHeadingSize: {
        control: {
            type: 'select',
            options: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'],
            defaultValue: ''
        }
    },
    cardSizeCustom: {
        control: { type: 'select', options: ['medium', 'large'] }
    }
};

CardComponent.storyName = 'f-card';
