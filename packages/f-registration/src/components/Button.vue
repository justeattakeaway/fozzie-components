<template>
    <button
        type='submit'
        :class="[
            $style['o-btn'],
            $style[buttonStyleClass],
            (isFullWidth ? $style['o-btn--block'] : '')
        ]"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'ButtonComponent',

    props: {
        buttonStyle: {
            type: String,
            default: ''
        },
        isFullWidth: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonStyleClass () {
            return (this.buttonStyle)
                ? `o-btn--${this.buttonStyle}`
                : '';
        }
    }
};
</script>

<style lang="scss" module>

// Button styling (should be pulled out as a separate component)

$btn-default-bgColor                : $grey--lighter;
$btn-default-text-colour            : $grey--dark;
$btn-default-weight                 : $font-weight-bold;
$btn-default-height                 : 2.6;
$btn-default-font-size              : heading-s;
$btn-default-font-family            : $font-family-base;
$btn-default-bgColor--hover         : $grey--light;
$btn-default-borderRadius           : 2px;
$btn-default-hozPadding             : 1em;
$btn-default-vertPadding            : 11px;

$btn-primary-bgColor                : $orange;
$btn-primary-bgColor--hover         : $orange--dark;
$btn-primary-bgColor--focus         : $orange--darkest;
$btn-primary-textColor              : $white;

$btn-disabled-bgColor               : $grey--light;


/**
 * Base button styles – Based on csswizardry.com/beautons
 *
 * 1. Allow us to better style box model properties.
 * 2. Line different sized buttons up a little nicer.
 * 3. Make buttons inherit font styles.
 * 4. Force all elements using beautons to appear clickable.
 * 5. Normalise box model styles.
 * 6. If the button’s text is 1em, and the button is (3 * font-size) tall, then
 *    there is 1em of space above and below that text. We therefore apply 1em
 *    of space to the left and right, as padding, to keep consistent spacing.
 * 7. Fixes odd inner spacing in IE7.
 */

.o-btn {
    display: inline-block;                      /* [1] */
    vertical-align: middle;                     /* [2] */
    font-family: $btn-default-font-family;      /* [3] */
    @include font-size($btn-default-font-size); /* [3] */
    cursor: pointer;                            /* [4] */
    margin: 0;                                  /* [5] */
    padding: $btn-default-vertPadding $btn-default-hozPadding; /* [5, 6] */
    overflow: visible;                          /* [7] */
    text-align: center;
    font-weight: $btn-default-weight;

    // You may want to change this
    background-color: $btn-default-bgColor;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;

    color: $btn-default-text-colour;
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
        background-color: $btn-default-bgColor--hover;

        &:not(.o-btnLink) {
            outline: none; // no need as already has a focus/active state
        }
    }

    &,
    &:hover,
    &:active,
    &:focus,
    &:visited {
        text-decoration: none;
    }

    // Disabled state
    &.disabled,
    &[disabled] {
        cursor: default;

        &,
        &:hover {
            background-color: $btn-disabled-bgColor;
        }
    }

    &[type='submit'] {
        margin-top: spacing(x4);
        margin-bottom: spacing(x3);
    }
}

/**
 * Modifier – .o-btn--primary
 *
 * Sets the btn colour to site primary colour
 */

.o-btn--primary {
    background-color: $btn-primary-bgColor;

    &,
    &:link,
    &:visited {
        color: $btn-primary-textColor;
    }

    &:hover,
    &:active,
    &:focus {
        color: $btn-primary-textColor;
    }

    &:hover {
        background-color: $btn-primary-bgColor--hover;
    }

    &:active,
    &:focus {
        background-color: $btn-primary-bgColor--focus;
    }
}

/**
 * Modifier – btn-block
 *
 * Makes the btn full width
 */

.o-btn--block {
    display: block;
    width: 100%;
    padding-left: 0;
    padding-right: 0;

    // Vertically space out multiple block buttons
    // same as .o-btn--block + .o-btn--block
    & + & {
        margin-top: 10px;
    }
}


</style>
