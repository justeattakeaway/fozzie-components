<template>
    <div :class="$style['c-image']" />
</template>

<script>
export default {
    name: 'ImageBlock'
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-image {
    height: common.$skeleton-loader-image-height;
    border-radius: f.$radius-rounded-c;
}
</style>
