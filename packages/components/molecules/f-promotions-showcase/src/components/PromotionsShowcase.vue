<template>
    <div
        :class="$style['c-promotionsShowcase']"
        data-test-id="promotionsShowcase">
        I am a PromotionsShowcase Component (GB)
    </div>
</template>

<script>

export default {
    name: 'PromotionsShowcase',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-promotionsShowcase {
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
