<template>
    <div
        :class="$style['c-content-cards']"
        data-test-id="ContentCards">
        Hello World
    </div>
</template>

<script>
export default {
    name: 'ContentCards'
};
</script>

<style lang="scss" module>
.c-content-cards {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(large);
}
</style>
