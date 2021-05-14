// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLink from '../src/components/Link.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VLinkComponent = () => ({
    components: { VLink },
    props: {
    },
    template: `<v-link />`
});

VLinkComponent.storyName = 'f-link';
