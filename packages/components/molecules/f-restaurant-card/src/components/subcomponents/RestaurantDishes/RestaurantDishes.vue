<template>
    <ul
        :class="{
            [$style['c-restaurantCard-dishes']]: true,
            [$style['c-restaurantCard-dishes--isListItem']]: isListItem
        }">
        <li
            v-for="dish in renderableDishes"
            :key="`restaurant-dish-${dish.name}`"
            data-test-id="restaurant-dish-list-item"
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
    },
    computed: {
        // remove null/falsey dishes from renderable collection
        renderableDishes () {
            return this.dishes?.filter(d => !!d) || [];
        }
    }
};
</script>

<style lang="scss" module>
$scrollOffset: 16px;

 .c-restaurantCard-dishes {
    margin: 0 -#{$scrollOffset} 0 -#{$scrollOffset};
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
         margin: 0;
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
    scroll-snap-align: center;

    &:only-child {
        flex: 0 0 100%;
    }

    &:only-child,
    &:last-of-type {
        margin-right: 0;
    }

    &:first-of-type {
        margin-left: $scrollOffset;
        scroll-margin-left: $scrollOffset;
        scroll-snap-align: start;
    }

    &:last-of-type {
        margin-right: $scrollOffset;
    }

    .c-restaurantCard-dishes--isListItem & {
        @include media('>mid') {
            margin-right: 0;
            margin-bottom: spacing();

            &:last-of-type {
                margin-bottom: 0;
            }

            &:first-of-type {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }
    }
 }
</style>
