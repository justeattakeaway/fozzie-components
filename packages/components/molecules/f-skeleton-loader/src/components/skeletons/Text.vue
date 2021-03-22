<template>
    <div class="c-skeleton-loader-text c-skeleton-loader-bone" />
</template>

<script>
export default {
    name: 'TextBlock'
};
</script>

<style lang="scss" scoped>
.c-skeleton-loader-text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: spacing();
}
</style>
