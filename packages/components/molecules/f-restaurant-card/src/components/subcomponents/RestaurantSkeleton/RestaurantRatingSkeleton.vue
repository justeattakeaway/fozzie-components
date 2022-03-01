<template>
    <div
        :class="$style['c-restaurantCard-ratingSkeleton']"
        aria-hidden="true">
        <div :class="$style['c-restaurantCard-ratingSkeleton-icon']">
            <star-filled-icon />
        </div>
        <restaurant-content-skeleton :class="$style['c-restaurantCard-ratingSkeleton-content']" />
    </div>
</template>

<script>
import { StarFilledIcon } from '@justeat/f-vue-icons';
import RestaurantContentSkeleton from './RestaurantContentSkeleton.vue';

export default {
    name: 'RestaurantRatingSkeleton',
    components: {
        StarFilledIcon,
        RestaurantContentSkeleton
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-ratingSkeleton {
    width: 100%;
    display: flex;
}

.c-restaurantCard-ratingSkeleton svg {
    width: spacing(d);
    height: spacing(d);
    margin-right: spacing(a);
    position: relative;
    overflow: hidden;

    & path,
    & use {
        fill: $color-skeleton-02;
    }
}

.c-restaurantCard-ratingSkeleton-content {
    width: 85%;
    background-color: $color-skeleton-02;
}

.c-restaurantCard-ratingSkeleton-icon {
    @include skeletonLoader();
    border-radius: 0;
    display: flex;
    align-items: center;
}
</style>
