<template>
    <div :class="$style['c-carouselCardRestaurantHeader']">
        <image-block :class="$style['c-carouselCardRestaurantHeader-logo']" />
        <heading :class="$style['c-carouselCardRestaurantHeader-heading']" />
        <text-block :class="[$style['c-text']]" />
        <text-block :class="[$style['c-text']]" />
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

.c-carouselCardRestaurantHeader {
    text-align: center;
    background-color: $white;
    margin: auto;
    width: 96%;
    padding-bottom: spacing(x2);
    position: relative;
}

.c-carouselCardRestaurantHeader-logo {
    margin: auto;
    width: $restaurant-logo-width;
    height: $restaurant-logo-width;
    border: 1px solid $white;
    transform: translateY(-50%);
}

.c-carouselCardRestaurantHeader-heading {
    height: spacing(x3);
    margin: 0 auto spacing();
}

.c-text {
    max-width: 40%;
    margin: auto;
}

.c-text:nth-child(3) {
    max-width: 35%;
}

.c-text:not(:last-child) {
    margin-bottom: spacing();
}

</style>
