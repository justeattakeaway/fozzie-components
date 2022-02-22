import { withA11y } from '@storybook/addon-a11y';
import RestaurantCuisines from '../src/components/subcomponents/RestaurantCuisines.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantCuisinesComponent = (args, { argTypes }) => ({
    components: { RestaurantCuisines },
    props: Object.keys(argTypes),
    template:  '<restaurant-cuisines v-bind="$props" />'
});

RestaurantCuisinesComponent.args = {
    cuisines: ['Mexican', 'Burgers', 'Chinese']
};

RestaurantCuisinesComponent.storyName = 'restaurant-cuisines';
