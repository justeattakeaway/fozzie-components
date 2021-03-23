<template>
    <div class="c-skeleton-loader-carouselCardRestaurantHeader c-skeleton-loader-bone">
        <image-block />
        <heading />
        <text-block />
        <text-block />
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

<style lang="scss" scoped>

$restaurant-logo-width: 48px;

.c-skeleton-loader-carouselCardRestaurantHeader {
    text-align: center;
    background-color: #fff;
    margin: auto;
    width: 96%;
    padding-bottom: spacing(x2);
}

.c-skeleton-loader-image {
    margin: auto;
    width: $restaurant-logo-width;
    height: $restaurant-logo-width;
    border: 1px solid white;
    transform: translateY(-50%);
}

.c-skeleton-loader-heading {
    margin: auto;
    height: spacing(x3);
    margin-bottom: spacing();
}

.c-skeleton-loader-text {
    max-width: 40%;
    margin: auto;
}

.c-skeleton-loader-text:nth-child(3) {
    max-width: 35%;
}

.c-skeleton-loader-text:not(:last-child) {
    margin-bottom: spacing();
}

</style>
