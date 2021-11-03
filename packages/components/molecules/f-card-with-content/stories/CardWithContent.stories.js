// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import CardWithContent from '../src/components/CardWithContent.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const CardWithContentComponent = () => ({
    components: { CardWithContent },
    props: {
    },
    template: '<card-with-content />'
});

CardWithContentComponent.storyName = 'f-card-with-content';
