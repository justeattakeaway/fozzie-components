<template>
    <div :class="$style['c-restaurantCarouselCard']">
        <image-block :class="$style['c-restaurantCarouselCard-background']" />
        <carousel-card-restaurant-header :class="$style['c-restaurantCarouselCard-header']" />
        <carousel-card-restaurant-data :class="$style['c-restaurantCarouselCard-data']" />
    </div>
</template>

<script>
import ImageBlock from './Image.vue';
import CarouselCardRestaurantData from './CarouselCardRestaurantData.vue';
import CarouselCardRestaurantHeader from './CarouselCardRestaurantHeader.vue';

export default {
    components: {
        ImageBlock,
        CarouselCardRestaurantData,
        CarouselCardRestaurantHeader
    }
};
</script>

<style lang="scss" module>

.c-restaurantCarouselCard {
    max-width: 370px;
    text-align: center;
    margin: auto;
}

.c-restaurantCarouselCard-background {
    margin-bottom: -(spacing(x8));
    height: 200px;
}

.c-restaurantCarouselCard-header,
.c-restaurantCarouselCard-data {
    border: 1px solid $skeleton-loader-bone-background-color;
    border-top: 0;
}

.c-restaurantCarouselCard-header {
    border-bottom: 0;
}


</style>
