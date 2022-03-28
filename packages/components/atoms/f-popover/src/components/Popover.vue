<template>
    <div
        :class="$style['c-popover']"
        data-test-id="popover">
        <slot />
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
$popover-padding               : spacing(d);

.c-popover {
    @include media('>mid') {
        background-color: $color-container-default;
        box-shadow: $elevation-02;
        border-radius: $radius-rounded-c;
        padding: 0 $popover-padding;
        width: auto;
    }
}
</style>
