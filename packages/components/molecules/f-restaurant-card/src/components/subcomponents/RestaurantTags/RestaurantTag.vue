<template>
    <span
        :class="{
            [$style['c-restaurantTag']]: true,
            [$style['c-restaurantTag--isLarge']]: isLarge,
            [$style['c-restaurantTag--isUppercase']]: isUppercase
        }"
        :style="`color:${textColour}; background-color:${backgroundColour};`"
        :title="text"
        data-test-id="restaurant-tag">
        {{ text }}
    </span>
</template>

<script>
export default {
    name: 'RestaurantTag',
    props: {
        text: {
            type: String,
            required: true
        },
        textColour: {
            type: String,
            default: null
        },
        backgroundColour: {
            type: String,
            default: null
        },
        isLarge: {
            type: Boolean,
            default: false
        },
        isUppercase: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantTag {
    display: inline-block;
    padding: 0 spacing() / 2;
    border-radius: $radius-rounded-a;
    font-size: $font-paragraph-03 * 1px;
    color: $color-content-default;
    background-color: $color-container-subtle;

     @include media('<mid') {
         max-width: 30ch;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
     }
}

.c-restaurantTag--isLarge {
    padding: spacing() / 4 spacing();
}

.c-restaurantTag--isUppercase {
    text-transform: uppercase;
}
</style>
