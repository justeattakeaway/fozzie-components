<template>
    <div :class="$style['c-text']" />
</template>

<script>
export default {
    name: 'TextBlock'
};
</script>

<style lang="scss" module>

.c-text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: spacing();
    border-radius: $radius-rounded-a;
}

</style>
