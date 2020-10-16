import {
    withKnobs, boolean, select, text
} from '@storybook/addon-knobs';
import Card from '../src/components/Card.vue';
import { withA11y } from '@storybook/addon-a11y';
import results from '../src/components/tests/.jest-test-results.json'
import { withTests } from '@storybook/addon-jest';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y, withTests({ results })]
};

export const CardComponent = () => ({
    components: { Card },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        cardHeading: {
            default: text('Card Heading', 'My Card Heading')
        },
        cardHeadingPosition: {
            default: select('Card Heading Position', ['left', 'center', 'right'])
        },
        isRounded: {
            default: boolean('isRounded', false)
        },
        hasOutline: {
            default: boolean('hasOutline', false)
        },
        isPageContentWrapper: {
            default: boolean('isPageContentWrapper', false)
        }
    },
    parameters: {
        notes: 'some documentation here'
    },
    template:
        '<card :locale="locale" :cardHeading="cardHeading" :cardHeadingPosition="cardHeadingPosition" :isRounded="isRounded" :hasOutline="hasOutline" :isPageContentWrapper="isPageContentWrapper"><p>Some Card Content</p></card>'
});

CardComponent.parameters = {
    jest: ['Card.test.js'],
  };
CardComponent.storyName = 'f-card';
