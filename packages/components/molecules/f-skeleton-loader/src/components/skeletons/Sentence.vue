<template>
    <div>
        <text-block :class="$style['c-sentence-textBlock']" />
        <text-block :class="$style['c-sentence-textBlock']" />
    </div>
</template>

<script>
import TextBlock from './Text.vue';

export default {
    components: { TextBlock }
};
</script>

<style lang="scss" module>

.c-sentence-textBlock:nth-child(2) {
    max-width: 70%;
}

.c-sentence-textBlock:not(:last-child) {
    margin-bottom: spacing();
}

</style>
