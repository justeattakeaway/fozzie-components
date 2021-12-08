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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
 }

 .c-restaurantCard-dishes-item {
     list-style-type: none;
     flex: 0 0 90%;
     margin-right: spacing();
     scroll-snap-align: start;

    &:only-child {
        flex-shrink: 0;
        flex: 0 0 100%;
    }

    &:only-child,
    &:last-of-type {
        margin-right: 0;
    }
 }
</style>
