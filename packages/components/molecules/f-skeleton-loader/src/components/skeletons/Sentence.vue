<template>
    <div>
        <text-block :class="$style['c-skeletonLoader-text']" />
        <text-block :class="$style['c-skeletonLoader-text']" />
    </div>
</template>

<script>
import TextBlock from './Text.vue';

export default {
    name: 'SkeletonSentence',
    components: { TextBlock }
};
</script>

<style lang="scss" module>
.c-skeletonLoader-text:nth-child(2) {
    max-width: 70%;
}

.c-skeletonLoader-text:not(:last-child) {
    margin-bottom: spacing();
}
</style>
