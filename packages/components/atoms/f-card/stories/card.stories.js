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
            :has-outline="hasOutline"
            :is-page-content-wrapper="isPageContentWrapper"
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
    hasOutline: false,
    isPageContentWrapper: false,
    hasFullWidthFooter: false
};

CardComponent.argTypes = {
    cardHeadingPosition: {
        control: { type: 'select', options: ['left', 'center', 'right'] }
    },
    cardHeadingTag: {
        control: { type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
    }
};

CardComponent.storyName = 'f-card';
