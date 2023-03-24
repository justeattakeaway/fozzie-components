<template>
    <div
        :class="$style['c-rating']">
        {{ stars }}
    </div>
</template>

<script>
export default {
    name: 'SkeletonRating',
    inject: { skeletonOptions: { default: {} } },
    computed: {
        stars () {
            if (this.skeletonOptions?.use5Stars === true) {
                return '★★★★★';
            }
            return '★★★★★★';
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-rating {
     color: common.$skeleton-loader-bone-background-color;
     @include f.font-size(body-l, false);
}
</style>
