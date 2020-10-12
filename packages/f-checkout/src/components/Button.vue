<template>
    <button
        type='submit'
        :class="$style['o-btn']">
        <slot />
    </button>
</template>

<style lang="scss" module>

$btn-default-weight                 : 500;
$btn-default-font-size              : body-s;
$btn-default-font-family            : $font-family-base;
$btn-default-borderRadius           : 2px;
$btn-default-hozPadding             : 2em;
$btn-default-vertPadding            : 12px;

$btn-primary-bgColor                : $orange;
$btn-primary-bgColor--hover         : $orange--dark;
$btn-primary-textColor              : $white;

$btn-disabled-bgColor               : $grey--light;

.o-btn {
    display: inline-block;
    vertical-align: middle;
    font-family: $btn-default-font-family;
    @include font-size($btn-default-font-size);
    cursor: pointer;
    padding: spacing(x2) spacing(x6);
    overflow: visible;
    text-align: center;
    font-weight: $btn-default-weight;
    line-height: 1;
    display: flex;
    margin: 0 auto;

    background-color: $btn-primary-bgColor;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;

    color: $btn-primary-textColor;
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
        background-color: $btn-primary-bgColor--hover;

        &:not(.o-btnLink) {
            outline: none;
        }
    }

    &,
    &:hover,
    &:active,
    &:focus,
    &:visited {
        text-decoration: none;
    }

    &.disabled,
    &[disabled] {
        cursor: default;

        &,
        &:hover {
            background-color: $btn-disabled-bgColor;
        }
    }

    &[type='submit'] {
        margin-top: spacing(x2);
    }
}
</style>
