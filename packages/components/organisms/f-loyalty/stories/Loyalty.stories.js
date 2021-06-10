// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VLoyalty from '../src/components/Loyalty.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const VLoyaltyComponent = () => ({
    components: { VLoyalty },
    props: {
    },
    template: `<v-loyalty />`
});

VLoyaltyComponent.storyName = 'f-loyalty';
