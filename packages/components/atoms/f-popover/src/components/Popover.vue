<template>
    <div
        :class="$style['c-popover']"
        data-test-id="popover-component">
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
@use  '@justeat/fozzie/src/scss/fozzie' as f;

$popover-padding               : f.spacing(d);

.c-popover {
    @include f.media('>mid') {
        background-color: f.$color-container-default;
        box-shadow: f.$elevation-02;
        border-radius: f.$radius-rounded-c;
        padding: 0 $popover-padding;
        width: auto;
    }
}
</style>
