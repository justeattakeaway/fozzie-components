<template>
    <div
        :class="$style['c-popover']"
        data-test-id="popover">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'Popover',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

$popover-radius                : 3px;
$popover-padding               : spacing(x2);
$tooltip-width                 : 10px;

.c-popover {
    @include media('>=mid') {
        background-color: $white;
        border: 1px solid $color-border;
        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.2);
        border-top: 0;
        border-radius: 0 0 $popover-radius $popover-radius;
        padding: 0 $popover-padding;
        width: auto;

        // tooltip arrow
        &:before {
            bottom: 100%;
            border: $tooltip-width solid transparent;
            border-bottom: $tooltip-width solid $white;
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
    }
}

</style>
