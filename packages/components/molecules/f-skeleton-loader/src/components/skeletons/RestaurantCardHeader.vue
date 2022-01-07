<template>
    <div :class="$style['c-restaurantCardHeader']">
        <image-block :class="$style['c-restaurantCardHeader-logo']" />
        <heading :class="$style['c-restaurantCardHeader-heading']" />
        <text-block :class="[$style['c-restaurantCardHeader-text']]" />
        <text-block :class="[$style['c-restaurantCardHeader-text']]" />
    </div>
</template>

<script>
import ImageBlock from './Image.vue';
import TextBlock from './Text.vue';
import Heading from './Heading.vue';

export default {
    components: { ImageBlock, Heading, TextBlock }
};
</script>

<style lang="scss" module>

$restaurant-logo-width: 48px;

.c-restaurantCardHeader {
    text-align: center;
    background-color: $color-container-default;
    margin: auto;
    width: 96%;
    padding-bottom: spacing(x2);
    position: relative;
    border-radius: $radius-rounded-c $radius-rounded-c 0 0;
}

.c-restaurantCardHeader-logo {
    margin: auto;
    width: $restaurant-logo-width;
    height: $restaurant-logo-width;
    border: 1px solid $color-white;
    transform: translateY(-50%);
}

.c-restaurantCardHeader-heading {
    height: spacing(x3);
    margin: 0 auto spacing();
}

.c-restaurantCardHeader-text {
    max-width: 40%;
    margin: auto;
}

.c-restaurantCardHeader-text:nth-child(3) {
    max-width: 35%;
}

.c-restaurantCardHeader-text:not(:last-child) {
    margin-bottom: spacing();
}

</style>
