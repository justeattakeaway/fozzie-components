import { withA11y } from '@storybook/addon-a11y';
import RestaurantRating from '../src/components/subcomponents/RestaurantRating/RestaurantRating.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantRatingComponent = (args, { argTypes }) => ({
    components: { RestaurantRating },
    props: Object.keys(argTypes),
    template:  '<restaurant-rating v-bind="$props" />'
});

RestaurantRatingComponent.args = {
    isOwnRating: false,
    mean: 5.00,
    count: 1400,
    accessibleMessage: 'rated 5 stars out of 6',
    notRatedMessage: 'No ratings yet',
    isOwnRatingMessage: 'You'
};

RestaurantRatingComponent.storyName = 'restaurant-rating';
