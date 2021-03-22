<template>
    <div class="c-skeleton-loader-favouriteCarouselCard c-skeleton-loader-bone">
        <carousel-card-background />
        <carousel-card-restaurant-header />
        <carousel-card-restaurant-data />
    </div>
</template>

<script>
import CarouselCardBackground from './CarouselCardBackground.vue';
import CarouselCardRestaurantData from './CarouselCardRestaurantData.vue';
import CarouselCardRestaurantHeader from './CarouselCardRestaurantHeader.vue';

export default {
    name: 'RestaurantCarouselCard',
    components: {
        CarouselCardBackground, CarouselCardRestaurantData, CarouselCardRestaurantHeader
    }
};
</script>

<style lang="scss" scoped>
.c-skeleton-loader-favouriteCarouselCard {
    max-width: 400px;
    text-align: center;
    margin: auto;

    .c-skeleton-loader-carouselCardBackground {
        margin-bottom: -(spacing(x8));
    }
    .c-skeleton-loader-carouselCardRestaurantHeader,
    .c-skeleton-loader-restaurantData  {
        border: 1px solid $skeleton-loader-bone-background-color;
    }

    .c-skeleton-loader-carouselCardRestaurantHeader {
        border-top: 0px;
        border-bottom: 0px;
    }

    .c-skeleton-loader-restaurantData {
        border-top: 0px;
    }
}
</style>
