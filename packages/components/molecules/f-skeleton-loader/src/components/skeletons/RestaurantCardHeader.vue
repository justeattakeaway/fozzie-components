<template>
    <div :class="$style['c-restaurantCardHeader']">
        <image-block :class="$style['c-skeletonLoader-logo']" />
        <heading :class="$style['c-skeletonLoader-heading']" />
        <text-block :class="[$style['c-skeletonLoader-text']]" />
        <text-block :class="[$style['c-skeletonLoader-text']]" />
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
    background-color: $white;
    margin: auto;
    width: 96%;
    padding-bottom: spacing(x2);
    position: relative;
}

.c-skeletonLoader-logo {
    margin: auto;
    width: $restaurant-logo-width;
    height: $restaurant-logo-width;
    border: 1px solid $white;
    transform: translateY(-50%);
}

.c-skeletonLoader-heading {
    height: spacing(x3);
    margin: 0 auto spacing();
}

.c-skeletonLoader-text {
    max-width: 40%;
    margin: auto;
}

.c-skeletonLoader-text:nth-child(3) {
    max-width: 35%;
}

.c-skeletonLoader-text:not(:last-child) {
    margin-bottom: spacing();
}

</style>
