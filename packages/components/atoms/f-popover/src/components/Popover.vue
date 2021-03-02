<template>
    <div
        :class="$style['c-popover']"
        data-test-id="popover">
        I am a VPopover Component (GB)
    </div>
</template>

<script>

export default {
    name: 'VPopover',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-popover {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
