<template>
    <div
        :class="$style['c-restaurantCard-skeleton']"
        aria-hidden="true" />
</template>

<script>
export default {
    name: 'RestaurantContentSkeleton'
};
</script>

<style lang="scss" module>
.c-restaurantCard-skeleton {
    background-color: $color-skeleton-02;
    @include skeletonLoader();
}
</style>
