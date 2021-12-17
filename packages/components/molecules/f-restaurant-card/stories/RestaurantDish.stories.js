// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import RestaurantDish from '../src/components/subcomponents/RestaurantDishes/RestaurantDish.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantDishComponent = (args, { argTypes }) => ({
    components: { RestaurantDish },
    props: Object.keys(argTypes),
    template:  '<restaurant-dish v-bind="$props" />'
});

RestaurantDishComponent.args = {
    name: 'Sausage And Egg Mcmuffin its a really long dish name I hope never happens®',
    price: '£1.75',
    calories: '1250kcal',
    portion: '2 servings'
};

RestaurantDishComponent.storyName = 'restaurant-dish';
