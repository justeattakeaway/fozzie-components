<template>
    <h2
        :class="[$style['c-contentCards--group-title'], 'c-contentCards--group-title']"
    >
        {{ title }}
    </h2>
</template>

<script>
export default {
    name: 'GroupHeaderCard',
    props: {
        title: {
            default: '',
            required: true,
            type: String
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCards--group-title {
        width: 100%;
        &:not(:first-child) {
            margin-top: spacing(x3);
        }
        margin-bottom: spacing(x2);
    }
</style>
