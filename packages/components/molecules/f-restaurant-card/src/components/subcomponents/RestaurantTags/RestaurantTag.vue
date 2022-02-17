<template>
    <span
        :class="{
            [$style['c-restaurantTag']]: true,
            [$style[`c-restaurantTag--${colorScheme}`]]: !!colorScheme,
            [$style['c-restaurantTag--isLarge']]: isLarge,
            [$style['c-restaurantTag--isUppercase']]: isUppercase
        }"
        :title="text"
        :aria-label="ariaLabel"
        :data-test-id="testId ? testId : 'restaurant-badge'">
        {{ text }}
    </span>
</template>

<script>
const colourSchemes = {
    warm: 'warm',
    dark: 'dark',
    positive: 'positive'
};

export default {
    name: 'RestaurantTag',
    props: {
        text: {
            type: String,
            required: true
        },
        colorScheme: {
            type: String,
            default: null,
            validator: value => !!colourSchemes[value]
        },
        isLarge: {
            type: Boolean,
            default: false
        },
        isUppercase: {
            type: Boolean,
            default: false
        },
        ariaLabel: {
            type: String,
            default: null
        },
        testId: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantTag {
    display: inline-block;
    padding: 0 spacing(a);
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
    padding: math.div(spacing(), 4) spacing();
}

.c-restaurantTag--isUppercase {
    text-transform: uppercase;
}

.c-restaurantTag--dark {
    color: $color-content-light;
    background-color: $color-dark-container-dark;
}

.c-restaurantTag--warm {
    color: $color-content-default;
    background-color: $color-support-brand-02;
}

.c-restaurantTag--positive {
    color: $color-support-positive;
    background-color: $color-support-positive-02;
}
</style>
