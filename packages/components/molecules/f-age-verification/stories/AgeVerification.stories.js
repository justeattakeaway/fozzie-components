// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import AgeVerification from '../src/components/AgeVerification.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const AgeVerificationComponent = () => ({
    components: { AgeVerification },
    props: {
    },
    template: '<age-verification />'
});

AgeVerificationComponent.storyName = 'f-age-verification';
