<template>
    <div :class="$style['c-filterPill-skeleton']">
        <span :class="$style['c-filterPill-skeleton-content']" />
    </div>
</template>

<script>
export default {
    name: 'FilterPillSkeleton'
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

@mixin skeletonLoader () {
    min-height: 1em;
    border-radius: 100px;
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
            background-image: linear-gradient(90deg, rgba(f.$color-white, 0) 0, rgba(f.$color-white, 0.2) 20%, rgba(f.$color-white, 0.5) 60%, rgba(f.$color-white, 0));
            animation: skeletonLoadingShimmer 2s infinite;
        }
    }
}

@keyframes skeletonLoadingShimmer {
    100% {
        transform: translateX(100%);
    }
}

.c-filterPill-skeleton {
    padding: f.spacing(c) f.spacing(d);
}

.c-filterPill-skeleton-content {
    display: block;
    width: 50%;
    height: f.spacing(d);
    background-color: f.$color-skeleton-02;
    @include skeletonLoader();
}
</style>
