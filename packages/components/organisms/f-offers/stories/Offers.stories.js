// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VOffers from '../src/components/Offers.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const VOffersComponent = () => ({
    components: { VOffers },
    props: {
    },
    template: `<v-offers />`
});

VOffersComponent.storyName = 'f-offers';
