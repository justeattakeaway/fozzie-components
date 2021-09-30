// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../src/components/RestaurantCard.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const RestaurantCardComponent = () => ({
    components: { RestaurantCard },
    props: {
    },
    template: `<restaurant-card />`
});

RestaurantCardComponent.storyName = 'f-restaurant-card';
