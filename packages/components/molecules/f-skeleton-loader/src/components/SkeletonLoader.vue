
<template>
    <div
        data-test-id="skeletonLoader"
        :class="[$style['c-skeleton-loader']]">
        <div :class="[$style[`c-skeleton-loader-${skeletonType}`], $style['c-skeleton-loader-bone']]" />
    </div>
</template>

<script>
export default {
    name: 'SkeletonLoader',
    components: {},
    props: {
        skeletonType: {
            type: String,
            default: 'text'
        }
    }
};
</script>

<style lang="scss" module>

$skeleton-loader-heading-height: spacing(x4);
$skeleton-loader-text-height: spacing(x2);

.c-skeleton-loader {
  position: relative;
  vertical-align: top;
}

.c-skeleton-loader-bone {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
    background-color: $grey--mid;
}

.c-skeleton-loader-heading {
    height: $skeleton-loader-heading-height;
    width: 45%;
}

.c-skeleton-loader-text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: spacing();
}

</style>
