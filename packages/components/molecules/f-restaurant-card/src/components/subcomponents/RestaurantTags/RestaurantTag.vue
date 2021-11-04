<template>
    <span
        :class="{
            [$style['c-restaurantTag']]: true,
            [$style['c-restaurantTag--isLarge']]: isLarge
        }"
        :style="`color:${textColour}; background-color:${backgroundColour};`"
        :title="text"
        data-test-id="restaurant-tag">
        {{ text }}
    </span>
</template>

<script>
import { theme as PieTokensTheme } from '@justeat/pie-design-tokens/dist/tokens.json';

const {
    'content-default': textColour,
    'container-subtle': backgroundColor
} = PieTokensTheme.jet.color.alias.default;

export default {
    name: 'RestaurantTag',
    props: {
        text: {
            type: String,
            required: true
        },
        textColour: {
            type: String,
            default: textColour
        },
        backgroundColour: {
            type: String,
            default: backgroundColor
        },
        isLarge: {
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
</style>
