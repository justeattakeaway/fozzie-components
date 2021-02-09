// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ErrorPage from '../src/components/ErrorPage.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const ErrorPageComponent = () => ({
    components: { ErrorPage },
    props: {
    },
    template: `<error-page />`
});

ErrorPageComponent.storyName = 'f-error-page';
