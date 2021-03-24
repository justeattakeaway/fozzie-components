<template>
    <div :class="$style['c-image']" />
</template>

<script>
export default {
    name: 'ImageBlock'
};
</script>

<style lang="scss" module>

.c-image {
    height: $skeleton-loader-image-height;
}

</style>
