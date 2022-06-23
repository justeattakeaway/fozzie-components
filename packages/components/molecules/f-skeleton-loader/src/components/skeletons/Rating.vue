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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-rating {
     color: $skeleton-loader-bone-background-color;
     @include f.font-size(body-l, false);
}
</style>
