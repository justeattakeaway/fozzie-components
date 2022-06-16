<template>
    <div :class="$style['c-imageTile-skeleton']">
        <span :class="$style['c-imageTile-skeletonImage']" />
        <span :class="$style['c-imageTile-skeletonText']" />
    </div>
</template>

<script>
export default {
    name: 'ImageTileSkeleton'
};
</script>

<style lang="scss" module>
@mixin skeletonLoader () {
    position: relative;
    overflow: hidden;

    // only animate for users that have not set any reduced motion preferences on their device
    @media screen and (prefers-reduced-motion: no-preference) {
        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(90deg, rgba($color-white, 0) 0, rgba($color-white, 0.2) 20%, rgba($color-white, 0.5) 60%, rgba($color-white, 0));
            animation: skeletonLoadingShimmer 2s infinite;
        }
    }
}

@keyframes skeletonLoadingShimmer {
    100% {
        transform: translateX(100%);
    }
}

.c-imageTile-skeleton {
    @include skeletonLoader();
}

.c-imageTile-skeletonImage {
    background-color: $color-skeleton-02;
    border-radius: spacing(b);
    display: block;
    padding: 45px 30px;
    margin: spacing(a);
    margin-bottom: spacing(c);
}

.c-imageTile-skeletonText {
    width: 50%;
    padding: 10px;
    background-color: $color-skeleton-02;
    display: block;
    border-radius: spacing(a);
}
</style>
