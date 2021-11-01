<template>
    <span
        :class="[$style['c-restaurantBadge'], $style[colorSchemeClass]]"
        :title="text"
        data-test-id="restaurant-badge">
        {{ text }}
    </span>
</template>

<script>
export default {
    name: 'RestaurantBadge',
    props: {
        text: {
            type: String,
            required: true
        },
        colorScheme: {
            type: String,
            default: null,
            validator: value => ['dark', 'warm'].indexOf(value) !== -1
        }
    },
    computed: {
        colorSchemeClass () {
            return this.colorScheme ? `c-restaurantBadge--${this.colorScheme}` : null;
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantBadge {
    display: inline-block;
    padding: 0 spacing() / 2;
    border-radius: $radius-rounded-a;
    font-size: $font-paragraph-03 * 1px;
    color: $color-grey-70;
    background-color: $color-container-subtle;

     @include media('<mid') {
         max-width: 30ch;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
     }
}

.c-restaurantBadge--dark {
    color: $color-content-light;
    background-color: $color-container-dark;
}

.c-restaurantBadge--warm {
    color: $color-grey-70;
    background-color: $color-orange-10;
}
</style>
