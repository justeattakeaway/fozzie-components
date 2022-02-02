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
            required: true,
            type: String
        }
    }
};
</script>

<style lang="scss" module>
.c-contentCards--group-title {
    width: 100%;
    margin-bottom: spacing(d);

    &:not(:first-child) {
        margin-top: spacing(e);
    }

}
</style>
