// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VSpinner from '../src/components/Spinner.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const VSpinnerComponent = () => ({
    components: { VSpinner },
    props: {
    },
    template: `<v-spinner />`
});

VSpinnerComponent.storyName = 'f-spinner';
