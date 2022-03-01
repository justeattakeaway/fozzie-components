<template>
    <div
        :class="$style['c-restaurantCard-skeleton']"
        :style="`width: ${widthPercentage}%;`"
        aria-hidden="true" />
</template>

<script>
export default {
    name: 'RestaurantContentSkeleton',
    props: {
        widthPercentage: {
            type: Number,
            default: 100
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-skeleton {
    background-color: $color-skeleton-02;
    @include skeletonLoader();
}
</style>
