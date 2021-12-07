<template>
    <ul :class="[$style['c-restaurantCard-dishes']]">
        <li
            v-for="dish in dishes"
            :key="dish"
            :class="[$style['c-restaurantCard-dishes-item']]">
            <restaurant-dish v-bind="dish" />
        </li>
    </ul>
</template>

<script>
import RestaurantDish from './RestaurantDish.vue';

export default {
    name: 'RestaurantDishes',
    components: {
        RestaurantDish
    },
    props: {
        /**
         * An array of dish objects
         */
        dishes: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
 .c-restaurantCard-dishes {
     margin: 0;
     padding: 0;
 }
 .c-restaurantCard-dishes-item {
     list-style-type: none;
 }
</style>
