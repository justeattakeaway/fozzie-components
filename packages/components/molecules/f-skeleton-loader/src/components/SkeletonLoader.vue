
<template>
    <div
        data-test-id="skeletonLoader"
        :class="[
            'c-skeleton-loader',
            {
                ['c-skeleton-loader--animated']: isAnimated
            }
        ]">
        <component :is="skeletonType" />
    </div>
</template>

<script>
import * as skeletons from './skeletons';

export default {
    name: 'SkeletonLoader',
    components: { ...skeletons },
    props: {
        skeletonType: {
            type: String,
            default: 'textBlock',
            validator (value) {
                return Object.keys(skeletons).includes(value);
            }
        },
        isAnimated: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>

@keyframes loading {
    100% {
        transform: translateX(100%);
    }
}

.c-skeleton-loader {
    position: relative;
    vertical-align: top;
}

.c-skeleton-loader-bone {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
}

.c-skeleton-loader--animated .c-skeleton-loader-bone::after {
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.3),
      hsla(0, 0%, 100%, 0)
    );
    animation: loading 1.5s infinite;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
  }

// Use /deep/ to ensure scoped class cascades to children within children
/deep/ .c-skeleton-loader-heading,
/deep/ .c-skeleton-loader-text {
    background-color: $skeleton-loader-bone-background-color;
}

</style>
