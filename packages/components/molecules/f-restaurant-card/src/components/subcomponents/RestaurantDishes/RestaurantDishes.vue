<template>
    <ul
        :class="{
            [$style['c-restaurantCard-dishes']]: true,
            [$style['c-restaurantCard-dishes--isVerticallyStacked']]: isVerticallyStacked,
            [$style['c-restaurantCard-dishes--isScrollable']]: hasMultipleDishes
        }"
        data-test-id="dishsearch-dish-list">
        <li
            v-for="dish in renderableDishes"
            :key="`restaurant-dish-${dish.name}`"
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
         * Stacks dishes vertically, however will fallback to horizontal scrolling at smaller screen sizes
         */
        isVerticallyStacked: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Removes non-truthy values from dishes array
         */
        renderableDishes () {
            return this.dishes?.filter(d => !!d) || [];
        },
        hasMultipleDishes () {
            return this.renderableDishes.length > 1;
        }
    }
};
</script>

<style lang="scss" module>
$scrollOffset: spacing(d);

 .c-restaurantCard-dishes {
    padding: 0;
    margin: 0;
 }

 .c-restaurantCard-dishes--isScrollable {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -#{$scrollOffset};
    margin-right: -#{$scrollOffset};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
}

.c-restaurantCard-dishes--isVerticallyStacked {
    @include media('>mid') {
        display: block;
        margin-left: 0;
        margin-right: 0;
    }
}

.c-restaurantCard-dishes-item {
    list-style-type: none;

    &:before {
        // needed to override & remove legacy fozzie <li> styling
        content: none;
    }

    &:only-child {
        margin-bottom: 0;
    }
}

.c-restaurantCard-dishes--isScrollable > .c-restaurantCard-dishes-item {
    scroll-snap-align: center;
    flex: 0 0 85%;
    margin-bottom: 0;
    margin-right: spacing();

    &:first-of-type {
        margin-left: $scrollOffset;
        scroll-margin-left: $scrollOffset;
        scroll-snap-align: start;
    }

    &:last-of-type {
        margin-right: 0;
        padding-right: $scrollOffset;
        scroll-margin-right: $scrollOffset;
        scroll-snap-align: center;
    }

    &:only-child {
        flex: 0 0 100%;
        margin-right: 0;
    }
}

.c-restaurantCard-dishes--isVerticallyStacked > .c-restaurantCard-dishes-item {
    @include media('>mid') {
        margin-right: 0;
        margin-bottom: spacing();

        &:last-of-type {
            padding-right: 0;
            margin-right: 0;
            margin-bottom: 0;
        }

        &:first-of-type {
            margin-left: 0;
        }
    }
}
</style>
