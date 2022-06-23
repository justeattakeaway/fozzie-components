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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantCard-skeleton {
    background-color: f.$color-skeleton-02;
    @include skeletonLoader();
}
</style>
