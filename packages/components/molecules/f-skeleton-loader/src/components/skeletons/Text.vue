<template>
    <div :class="$style['c-text']" />
</template>

<script>
export default {
    name: 'TextBlock'
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: f.spacing();
    border-radius: f.$radius-rounded-a;
}
</style>
