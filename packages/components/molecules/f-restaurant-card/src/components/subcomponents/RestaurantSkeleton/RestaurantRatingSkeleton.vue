<template>
    <div
        :class="$style['c-restaurantCard-Ratingskeleton']"
        aria-hidden="true">
        <div :class="$style['c-restaurantCard-Ratingskeleton-icon']">
            <star-filled-icon />
        </div>
        <div :class="$style['c-restaurantCard-skeleton']" />
    </div>
</template>

<script>
import { StarFilledIcon } from '@justeat/f-vue-icons';

export default {
    name: 'RestaurantRating',
    components: {
        StarFilledIcon
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-Ratingskeleton {
    width: 100%;
    display: flex;
}

.c-restaurantCard-Ratingskeleton svg {
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

.c-restaurantCard-skeleton {
    width: 85%;
    background-color: $color-skeleton-02;
}

.c-restaurantCard-skeleton,
.c-restaurantCard-Ratingskeleton-icon {
    @include skeletonLoader();
}
</style>
