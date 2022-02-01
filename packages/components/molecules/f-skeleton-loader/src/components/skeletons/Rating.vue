<template>
    <div
        :class="$style['c-rating']">
        ★★★★★★
    </div>
</template>

<script>
export default {
    name: 'SkeletonRating'
};
</script>

<style lang="scss" module>
.c-rating {
     color: $skeleton-loader-bone-background-color;
     @include font-size(body-l, false);
}
</style>
