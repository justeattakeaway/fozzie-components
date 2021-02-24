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
        '<card :cardHeading="cardHeading" :cardHeadingPosition="cardHeadingPosition" :isRounded="isRounded" :hasOutline="hasOutline" :isPageContentWrapper="isPageContentWrapper"><p>Some Card Content</p></card>'
});

CardComponent.args = {
    cardHeading: 'My Card Heading',
    cardHeadingPosition: 'left',
    isRounded: false,
    hasOutline: false,
    isPageContentWrapper: false
};

CardComponent.argTypes = {
    cardHeadingPosition: {
        control: { type: 'select', options: ['left', 'center', 'right'] }
    }
};

CardComponent.storyName = 'f-card';
