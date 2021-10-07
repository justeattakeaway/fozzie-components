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

$popover-padding               : spacing(x2);
$tooltip-width                 : 10px;

.c-popover {
    @include media('>mid') {
        background-color: $color-container-default;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.03),
                    0 1px 10px 1px rgba(0, 0, 0, 0.07),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: $radius-rounded-c;
        padding: 0 $popover-padding;
        width: auto;

        // tooltip arrow
        &:before {
            bottom: 100%;
            border: $tooltip-width solid transparent;
            border-bottom: $tooltip-width solid $color-container-default;
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
    }
}

</style>
