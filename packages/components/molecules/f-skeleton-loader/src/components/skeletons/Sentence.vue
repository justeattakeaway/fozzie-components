<template>
    <div class="c-skeleton-loader-sentence c-skeleton-loader-bone">
        <text-block />
        <text-block />
    </div>
</template>

<script>
import TextBlock from './Text.vue';

export default {
    name: 'Sentence',
    components: { TextBlock }
};
</script>

<style lang="scss" scoped>
  .c-skeleton-loader-sentence .c-skeleton-loader-text:nth-child(2) {
    max-width: 70%;
  }
  .c-skeleton-loader-sentence .c-skeleton-loader-text:not(:last-child) {
    margin-bottom: 6px;
  }
</style>
