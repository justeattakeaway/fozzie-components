<template>
    <div :class="$style['c-restaurantCard']">
        <image-block :class="$style['c-restaurantCard-background']" />
        <restaurant-card-header :class="$style['c-restaurantCard-header']" />
        <restaurant-card-data :class="$style['c-restaurantCard-data']" />
    </div>
</template>

<script>
import ImageBlock from './Image.vue';
import RestaurantCardData from './RestaurantCardData.vue';
import RestaurantCardHeader from './RestaurantCardHeader.vue';

export default {
    components: {
        ImageBlock,
        RestaurantCardData,
        RestaurantCardHeader
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantCard {
    max-width: 370px;
    text-align: center;
    margin: auto;
}

.c-restaurantCard-background {
    margin-bottom: -(f.spacing(i));
    height: 200px;
}

.c-restaurantCard-header,
.c-restaurantCard-data {
    border: 1px solid common.$skeleton-loader-bone-background-color;
    border-top: 0;
}

.c-restaurantCard-header {
    border-bottom: 0;
}
</style>
