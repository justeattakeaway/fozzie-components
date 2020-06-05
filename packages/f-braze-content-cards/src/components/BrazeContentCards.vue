<template>
    <div
        :class="$style['c-braze-content-cards']"
        data-test-id="BrazeContentCards">
        Hello World
    </div>
</template>

<script>
export default {
    name: 'BrazeContentCards'
};
</script>

<style lang="scss" module>
.c-braze-content-cards {
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
