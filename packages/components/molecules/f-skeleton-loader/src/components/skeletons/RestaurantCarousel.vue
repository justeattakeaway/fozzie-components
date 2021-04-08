<template>
    <div :class="$style['c-restaurantCarouselWrapper']">
        <heading :class="$style['c-restaurantCarousel-heading']" />
        <text-block :class="$style['c-restaurantCarousel-desc']" />
        <div :class="$style['c-restaurantCarousel']">
            <restaurant-carousel-card :class="$style['c-restaurantCarousel-card']" />
            <restaurant-carousel-card :class="$style['c-restaurantCarousel-card']" />
            <restaurant-carousel-card :class="$style['c-restaurantCarousel-card']" />
        </div>
    </div>
</template>

<script>
import TextBlock from './Text.vue';
import Heading from './Heading.vue';
import RestaurantCarouselCard from './RestaurantCarouselCard.vue';

export default {
    components: {
        Heading,
        TextBlock,
        RestaurantCarouselCard
    }
};
</script>

<style lang="scss" module>

$breakpoints: (medium: 520px, large: 960px);

.c-restaurantCarouselWrapper {
    margin: auto;
    padding-top: spacing();
    margin-bottom: spacing(x2);
}

.c-restaurantCarousel-heading {
    margin-bottom: spacing();
    max-width: 300px;
}

.c-restaurantCarousel-desc {
    margin-bottom: spacing(x2);
    max-width: 425px;
}

.c-restaurantCarousel {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.c-restaurantCarousel-card {
    flex: 1;
    display: none;

    &:nth-child(1) {
        display: block;
    }
    @include media('>medium') {
        margin: 0 spacing(x2) 0 0;
        &:nth-child(2) {
            display: block;
        }
    }
    @include media('>large') {
        &:nth-child(3) {
            display: block;
        }
    }
}

</style>
