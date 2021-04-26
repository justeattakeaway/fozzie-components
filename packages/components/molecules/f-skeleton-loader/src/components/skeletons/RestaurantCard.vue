<template>
    <div :class="$style['c-restaurantCard']">
        <image-block :class="$style['c-skeletonLoader-background']" />
        <restaurant-card-header :class="$style['c-skeletonLoader-header']" />
        <restaurant-card-data :class="$style['c-skeletonLoader-data']" />
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

.c-restaurantCard {
    max-width: 370px;
    text-align: center;
    margin: auto;
}

.c-skeletonLoader-background {
    margin-bottom: -(spacing(x8));
    height: 200px;
}

.c-skeletonLoader-header,
.c-skeletonLoader-data {
    border: 1px solid $skeleton-loader-bone-background-color;
    border-top: 0;
}

.c-skeletonLoader-header {
    border-bottom: 0;
}


</style>
