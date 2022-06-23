<template>
    <div
        :class="$style['c-heading']" />
</template>

<script>
export default {
    name: 'SkeletonHeading'
};
</script>


<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-heading {
    height: $skeleton-loader-heading-height;
    width: 65%;
    border-radius: f.$radius-rounded-a;
}
</style>
