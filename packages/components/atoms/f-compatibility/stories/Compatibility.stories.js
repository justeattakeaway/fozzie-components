// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VCompatibility from '../src/components/Compatibility.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VCompatibilityComponent = () => ({
    components: { VCompatibility },
    props: {
    },
    template: `<v-compatibility />`
});

VCompatibilityComponent.storyName = 'f-compatibility';
