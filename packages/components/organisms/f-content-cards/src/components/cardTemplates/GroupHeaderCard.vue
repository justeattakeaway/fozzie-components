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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-contentCards--group-title {
    width: 100%;
    margin-bottom: f.spacing(d);

    &:not(:first-child) {
        margin-top: f.spacing(e);
    }

}
</style>
