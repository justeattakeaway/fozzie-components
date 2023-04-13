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
        :data-test-id="testId || 'restaurant-badge'">
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantTag {
    display: block;
    padding: 0 f.spacing(a);
    border-radius: f.$radius-rounded-a;
    @include f.font-size(f.$font-paragraph-spacing-03);
    color: f.$color-content-default;
    background-color: f.$color-container-strong;
    max-width: 30ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.c-restaurantTag--isLarge.c-restaurantTag--isUppercase.c-restaurantTag--positive {
        margin-bottom: 0;
        margin-right: f.spacing(b);
    }
}

.c-restaurantTag--isLarge {
    padding: math.div(f.spacing(), 4) f.spacing();
}

.c-restaurantTag--isUppercase {
    text-transform: uppercase;
}

.c-restaurantTag--dark {
    color: f.$color-content-light;
    background-color: f.$color-container-dark;
}

.c-restaurantTag--warm {
    color: f.$color-content-default;
    background-color: f.$color-support-brand-02;
}

.c-restaurantTag--positive {
    color: f.$color-support-positive;
    background-color: f.$color-support-positive-02;
}
</style>
