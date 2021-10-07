// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import IeCompatibility from '../src/components/IeCompatibility.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const IeCompatibilityComponent = () => ({
    components: { IeCompatibility },
    props: {
    },
    template: `<ie-compatibility />`
});

IeCompatibilityComponent.storyName = 'f-ie-compatibility';
