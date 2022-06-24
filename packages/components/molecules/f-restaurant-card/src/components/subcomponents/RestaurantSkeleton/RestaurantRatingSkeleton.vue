<template>
    <div
        :class="$style['c-restaurantCard-ratingSkeleton']"
        :style="`width: ${widthPercentage}%;`"
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
    },
    props: {
        widthPercentage: {
            type: Number,
            default: 100
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantCard-ratingSkeleton {
    display: flex;
    align-items: center;
}

.c-restaurantCard-ratingSkeleton svg {
    width: f.spacing(d);
    height: f.spacing(d);
    margin-right: f.spacing(a);
    position: relative;
    overflow: hidden;

    & path,
    & use {
        fill: f.$color-skeleton-02;
    }
}

.c-restaurantCard-ratingSkeleton-content {
    background-color: f.$color-skeleton-02;
}

.c-restaurantCard-ratingSkeleton-icon {
    @include common.skeletonLoader();
    border-radius: 0;
    display: flex;
    align-items: center;
}
</style>
