<template>
    <div
        :class="$style['c-templateSubNav']"
        data-test-id="templateSubNav">
        I am a TemplateSubNav Component (GB)
    </div>
</template>

<script>
export default {
    name: 'TemplateSubNav',
    components: { },
    props: { }
};
</script>

<style lang="scss" module>

.c-templateSubNav {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $color-red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}
</style>
