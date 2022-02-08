import { withA11y } from '@storybook/addon-a11y';
import RestaurantDishes from '../src/components/subcomponents/RestaurantDishes/RestaurantDishes.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantDishesComponent = (args, { argTypes }) => ({
    components: { RestaurantDishes },
    props: Object.keys(argTypes),
    template:  '<restaurant-dishes v-bind="$props" />'
});

RestaurantDishesComponent.args = {
    isVerticallyStacked: false,
    dishes: [
        {
            name: 'Sausage And Egg Mcmuffin its a really long dish name I hope never happens®',
            price: '£2.79',
            calories: '345kcal'
        },
        {
            name: 'Fries (Large)',
            price: '£1.75',
            calories: '1250kcal',
            portion: '2 servings'
        },
        {
            name: 'Fish and chips (XL)',
            price: '£19.95',
            calories: '599kcal',
            portion: '1 serving'
        }
    ]
};

RestaurantDishesComponent.storyName = 'restaurant-dishes';
