<template>
    <ul
        :class="{
            [$style['c-restaurantCard-dishes']]: true,
            [$style['c-restaurantCard-dishes--isListItem']]: isListItem
        }">
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
        },
        /**
         * Used to manage list item specific styling
         */
        isListItem: {
            type: Boolean,
            default: false
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

 .c-restaurantCard-dishes--isListItem {
     @include media('>mid') {
         display: block;
     }
 }

 .c-restaurantCard-dishes-item {
    list-style-type: none;
    &:before {
        // needed to override & remove legacy fozzie <li> styling
        content: none;
    }

    flex: 0 0 85%;
    margin-bottom: 0;
    margin-right: spacing();
    scroll-snap-align: start;

    &:only-child {
        flex: 0 0 100%;
    }

    &:only-child,
    &:last-of-type {
        margin-right: 0;
    }

    .c-restaurantCard-dishes--isListItem & {
        @include media('>mid') {
            margin-right: 0;
            margin-bottom: spacing();

            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
 }
</style>
