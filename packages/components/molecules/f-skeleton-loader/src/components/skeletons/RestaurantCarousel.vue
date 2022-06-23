<template>
    <div :class="$style['c-restaurantCarousel']">
        <heading :class="$style['c-restaurantCarousel-heading']" />
        <text-block :class="$style['c-restaurantCarousel-desc']" />
        <div :class="$style['c-restaurantCarousel-list']">
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
        </div>
    </div>
</template>

<script>
import TextBlock from './Text.vue';
import Heading from './Heading.vue';
import RestaurantCard from './RestaurantCard.vue';

export default {
    components: {
        Heading,
        TextBlock,
        RestaurantCard
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantCarousel {
    margin: auto;
    padding-top: f.spacing();
    margin-bottom: f.spacing(d);
}

.c-restaurantCarousel-heading {
    margin-bottom: f.spacing();
    max-width: 300px;
}

.c-restaurantCarousel-desc {
    margin-bottom: f.spacing(d);
    max-width: 425px;
}

.c-restaurantCarousel-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.c-restaurantCarousel-item {
    flex: 1;
    display: none;

    &:nth-child(1) {
        display: block;
    }
    @include f.media('>520px') {
        margin: 0 f.spacing(d) 0 0;
        &:nth-child(2) {
            display: block;
        }
    }
    @include f.media('>960px') {
        &:nth-child(3) {
            display: block;
        }
    }
}
</style>
