<template>
    <button
        :class="[
            $style['o-btn'],
            $style[`o-btn--${buttonType}`],
            $style[`o-btn--size${buttonSizeClassname}`],
            (isFullWidth ? $style['o-btn--fullWidth'] : '')
        ]"
        data-test-id='button-component'>
        <slot />
    </button>
</template>

<script>

export default {
    name: 'FButton',
    components: {},
    props: {
        buttonType: {
            type: String,
            default: 'primary'
        },
        buttonSize: {
            type: String,
            default: 'medium'
        },
        isFullWidth: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Converts the buttonSize prop into a normalised classname (that fit with our class naming scheme)
         */
        buttonSizeClassname () {
            if (this.buttonSize === 'xsmall') {
                return this.buttonSize.slice(0, 2).toUpperCase() + this.buttonSize.slice(2); // xsmall -> XSmall
            }
            return this.buttonSize.charAt(0).toUpperCase() + this.buttonSize.slice(1); // capitalize the first letter of the prop
        }
    }
};
</script>

<style lang="scss" module>

$btn-default-bgColor            : $grey--lighter;
$btn-default-bgColor--hover     : $grey--light;
$btn-default-borderRadius       : $border-radius;
$btn-default-font-family        : $font-family-base;
$btn-default-font-size          : 'body-l';
$btn-default-weight             : $font-weight-bold;
$btn-default-padding            : 11px 1.5em 13px;
$btn-default-outline-color      : $color-focus-outline;

$btn-primary-bgColor            : $blue;
$btn-primary-bgColor--hover     : $blue--dark;
$btn-primary-bgColor--focus     : $blue--darkest;
$btn-primary-textColor          : $white;

$btn-secondary-bgColor          : $blue--offWhite;
$btn-secondary-bgColor--hover   : $blue--offWhite--dark;
$btn-secondary-bgColor--active  : $blue--offWhite--darkest;
$btn-secondary-textColor        : $blue;

$btn-outline-bgColor            : transparent;
$btn-outline-bgColor--hover     : rgba($black, 0.08);
$btn-outline-bgColor--active    : rgba($black, 0.12);
$btn-outline-textColor          : $black;
$btn-outline-border-color       : $grey--light;
// TODO: checking with design if $btn-outline-border-color should change on hover/active

$btn-ghost-bgColor              : transparent;
$btn-ghost-bgColor--hover       : rgba($black, 0.08);
$btn-ghost-bgColor--active      : rgba($black, 0.12);
$btn-ghost-textColor            : $blue;

$btn-disabled-bgColor           : $grey--light;
$btn-disabled-textColor         : $grey--midDark;

$btn-sizeLarge-font-size        : 'heading-s';
$btn-sizeLarge-padding          : 13px 1.2em 15px;

$btn-sizeSmall-padding          : 7px 1em 9px;

$btn-sizeXSmall-padding         : 5px 0.5em 7px;
$btn-sizeXSmall-lineHeight      : 1;


.o-btn {
    display: inline-block;
    vertical-align: middle;
    font-family: $btn-default-font-family;
    @include font-size($btn-default-font-size);
    cursor: pointer;
    padding: $btn-default-padding;
    overflow: visible;
    text-align: center;
    font-weight: $btn-default-weight;
    background-color: $btn-default-bgColor;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;
    color: $grey--dark;
    text-decoration: none;

    &:hover,
    &:active {
        background-color: $btn-default-bgColor--hover;
    }

    &:focus {
        outline: 2px dotted $btn-default-outline-color;
    }

    &:hover,
    &:active {
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
    &.is-disabled,
    &[disabled] {
        cursor: not-allowed;

        &,
        &:hover {
            background-color: $btn-disabled-bgColor;
            color: $btn-disabled-textColor;
        }
    }
}

/**
 * ==========================================================================
 * Btn Type modifiers
 * ==========================================================================
 */

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

    &:active {
        background-color: $btn-primary-bgColor--focus;
    }
}


/**
 * Modifier – .o-btn--secondary
 *
 * Accompanying secondary style button (knocked back slightly from the primary button)
 */

.o-btn--secondary {
    background-color: $btn-secondary-bgColor;
    color: $btn-secondary-textColor;

    &:hover {
        background-color: $btn-secondary-bgColor--hover;
    }

    &:active {
        background-color: $btn-secondary-bgColor--active;
    }
}


/**
 * Modifier – .o-btn--outline
 *
 * Accompanying button style
 */

.o-btn--outline {
    background-color: $btn-outline-bgColor;
    color: $btn-outline-textColor;
    border-color: $btn-outline-border-color;

    &:hover,
    &:active,
    &:focus {
        color: $btn-outline-textColor;
    }

    &:hover {
        background-color: $btn-outline-bgColor--hover;
    }

    &:active {
        background-color: $btn-outline-bgColor--active;
    }
}


/**
 * Modifier – .o-btn--ghost
 *
 * Accompanying button that can be used on solid background colours (such as grey)
 */

.o-btn--ghost {
    background-color: $btn-ghost-bgColor;
    color: $btn-ghost-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-ghost-textColor;
    }

    &:hover {
        background-color: $btn-ghost-bgColor--hover;
    }

    &:active {
        background-color: $btn-ghost-bgColor--active;
    }
}

/**
 * Modifier – .o-btn--link
 *
 * Make a button visually look like a default link
 * Useful when we semantically want a button but don’t want all the default styling
 *
 * Should only be applied to buttons
 */

.o-btn--link {
    border: 0;
    background-color: transparent;
    padding: 0;
    color: $color-link-default;
    font-weight: $font-weight-bold;

    &:hover {
        cursor: pointer;
        color: $color-link-hover;
        background-color: transparent;
        text-decoration: underline;
    }
    &:active,
    &:focus {
        color: $color-link-active;
        background-color: transparent;
    }
}

/**
 * Modifier – .o-btn--icon
 *
 * Removes unneeded styles from button when only an icon is on it (like a close button)
 */

.o-btn--icon {
    background-color: transparent;
    border: 0;
    padding: 0;

    &:hover {
        background-color: transparent;
    }
}


/**
 * ==========================================================================
 * Btn Size Modifiers
 * ==========================================================================
 */

.o-btn--sizeLarge {
    @include font-size($btn-sizeLarge-font-size);
    padding: $btn-sizeLarge-padding;

    &.o-btn--primary {
        background-color: $orange;

        &:hover {
            background-color: $orange--dark;
        }
        &:active {
            background-color: $orange--darkest;
        }
    }
}

.o-btn--sizeSmall {
    padding: $btn-sizeSmall-padding;
}

.o-btn--sizeXSmall {
    padding: $btn-sizeXSmall-padding;
    line-height: $btn-sizeXSmall-lineHeight;
}


/**
 * ==========================================================================
 * Btn Layout Modifiers
 * ==========================================================================
 */

/**
 * Modifier – o-btn--fullWidth
 *
 * Makes the btn full width
 */

.o-btn--fullWidth {
    display: block;
    width: 100%;

    // Vertically space out multiple fullWidth buttons
    // same as .o-btn--fullWidth + .o-btn--fullWidth
    & + & {
        margin-top: spacing();
    }
}

</style>
