<template>
    <component
        :is="componentType"
        :class="[
            $style['o-btn'],
            $style[`o-btn--${buttonType}`],
            $style[`o-btn--size${buttonSizeClassname}`], {
                [$style['o-btn--icon']]: isIcon,
                [$style['o-btn--fullWidth']]: isFullWidth,
                [$style['o-btn--loading']]: isLoading
            }
        ]"
        :action-type="buttonActionType"
        :data-test-id="`${componentType}-component`"
        v-bind="$attrs"
        :aria-live="getAriaLive"
        :aria-busy="isLoading"
        v-on="!isLoading && $listeners">
        <template v-if="hasNestedContent">
            <span
                v-if="isLoading"
                :class="$style['c-spinner']"
                :data-test-id="`${componentType}-spinner`" />

            <span
                :class="[$style['o-button-content'], {
                    [$style['o-btn-content--hidden']]: isLoading
                }]">

                <span
                    v-if="hasLeadingIcon"
                    :class="[$style['o-btn-icon'], $style['o-btn-icon--leading']]"
                    data-test-id="button-leading-icon">
                    <slot name='leading-icon' />
                </span>

                <slot />

                <span
                    v-if="hasTrailingIcon"
                    :class="[$style['o-btn-icon'], $style['o-btn-icon--trailing']]"
                    data-test-id="button-trailing-icon">
                    <slot name='trailing-icon' />
                </span>
            </span>
        </template>

        <template v-else>
            <slot />
        </template>
    </component>
</template>

<script>
import ActionButton from './Action.vue';
import LinkButton from './Link.vue';

import {
    VALID_BUTTON_TYPES,
    VALID_BUTTON_SIZES,
    VALID_BUTTON_ICON_POSITION
} from '../constants';

export default {
    name: 'FButton',
    components: {
        ActionButton,
        LinkButton
    },
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
        },
        actionType: {
            type: String,
            default: 'button'
        },
        isIcon: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        hasIcon: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        /**
         * Passes `actionType` prop to action button if no `href` or `to` attributes is applied to the component
         */
        buttonActionType () {
            return (!this.$attrs.href && !this.$attrs.to) ? this.actionType : null;
        },

        /**
         * Converts the buttonSize prop into a normalised classname (that fits with our class naming scheme)
         */
        buttonSizeClassname () {
            if (this.buttonSize === 'xsmall') {
                return this.buttonSize.slice(0, 2).toUpperCase() + this.buttonSize.slice(2); // xsmall -> XSmall
            }
            return this.buttonSize.charAt(0).toUpperCase() + this.buttonSize.slice(1); // capitalize the first letter of the prop
        },

        /**
         * Renders `Link` component if a `href` attribute is applied to the component
         * Renders `RouterLink` component if a `to` attribute is applied to the component, avoids page reload compared to Link with `href`
         * Renders `Action` component if no `href` attrivute is applied to the component
         */
        componentType () {
            if (this.$attrs.href) {
                return 'link-button';
            }

            if (this.$attrs.to) {
                return 'router-link';
            }

            return 'action-button';
        },

        /**
         * Gets the correct value for the aria-live attribute depending on whether the button is loading or not.
         */
        getAriaLive () {
            return this.isLoading ? 'polite' : 'off';
        },

        hasTrailingIcon () {
            return this.hasIcon && this.hasIcon === 'trailing';
        },

        hasLeadingIcon () {
            return this.hasIcon && this.hasIcon === 'leading';
        },

        hasNestedContent () {
            return this.isLoading
                || this.hasLeadingIcon
                || this.hasTrailingIcon;
        }
    },
    watch: {
        $props: {
            immediate: true,
            handler () {
                this.validateProps();
            }
        }
    },
    methods: {
        /**
         * Throws an error if the `buttonType` is invalid for the type of button being used (component is either a button or iconButton).
         * This is to ensure visual styles are only used with the intended component type.
         */
        validateProps () {
            const componentType = this.isIcon ? 'iconButton' : 'button';

            const validTypes = VALID_BUTTON_TYPES[componentType];
            if (!validTypes.includes(this.buttonType)) {
                throw new TypeError(`${componentType} is set to have buttonType="${this.buttonType}", but it can only be one of the following buttonTypes: "${validTypes.join('", "')}"`);
            }

            if (!VALID_BUTTON_SIZES.includes(this.buttonSize)) {
                throw new TypeError(`buttonSize is set to "${this.buttonSize}", but it can only be one of the following buttonSizes: "${VALID_BUTTON_SIZES.join('", "')}"`);
            }

            if (!VALID_BUTTON_ICON_POSITION.includes(this.hasIcon)) {
                throw new TypeError(`hasIcon is set to "${this.hasIcon}", but it can only be one of the following buttonSizes: "${VALID_BUTTON_ICON_POSITION.join('", "')}"`);
            }
        }
    }
};
</script>

<style lang="scss" module>

$btn-default-borderRadius              : $radius-rounded-e;
$btn-default-font-size                 : 'heading-s';
$btn-default-weight                    : $font-weight-bold;
$btn-default-padding                   : 10px spacing(x3);
$btn-default-outline-color             : $color-focus;
$btn-default-loading-opacity           : 0.35;
$btn-default-iconHeight                : 18px;
$btn-default-iconSpacing               : 3px;
$btn-default-iconSideSpacing           : $btn-default-iconSpacing + spacing();

$btn-primary-bgColor                   : $color-interactive-brand;
$btn-primary-bgColor--hover            : darken($color-interactive-brand, $color-hover-01);
$btn-primary-bgColor--active           : darken($color-interactive-brand, $color-active-01);
$btn-primary-textColor                 : $color-content-interactive-light;
$btn-primary-loading-color             : $color-content-interactive-light;
$btn-primary-loading-colorOpaque       : rgba($btn-primary-loading-color, $btn-default-loading-opacity);

$btn-secondary-bgColor                 : $color-interactive-secondary;
$btn-secondary-bgColor--hover          : darken($color-interactive-secondary, $color-hover-01);
$btn-secondary-bgColor--active         : darken($color-interactive-secondary, $color-active-01);
$btn-secondary-textColor               : $color-content-interactive-secondary;
$btn-secondary-loading-color           : $color-content-interactive-secondary;
$btn-secondary-loading-colorOpaque     : rgba($btn-secondary-loading-color, $btn-default-loading-opacity);

$btn-outline-bgColor                   : transparent;
$btn-outline-bgColor--hover            : darken($color-white, $color-hover-01);
$btn-outline-bgColor--active           : darken($color-white, $color-active-01);
$btn-outline-textColor                 : $color-content-interactive-tertiary;
$btn-outline-border-color              : $color-border-default;
$btn-outline-loading-color             : $color-content-interactive-tertiary;
$btn-outline-loading-colorOpaque       : rgba($btn-outline-loading-color, $btn-default-loading-opacity);

$btn-ghost-bgColor                     : transparent;
$btn-ghost-bgColor--hover              : darken($color-white, $color-hover-01);
$btn-ghost-bgColor--active             : darken($color-white, $color-active-01);
$btn-ghost-textColor                   : $color-content-interactive-secondary;
$btn-ghost-loading-color               : $color-content-interactive-secondary;
$btn-ghost-loading-colorOpaque         : rgba($btn-ghost-loading-color, $btn-default-loading-opacity);

$btn-ghostTertiary-bgColor             : transparent;
$btn-ghostTertiary-bgColor--hover      : darken($color-white, $color-hover-01);
$btn-ghostTertiary-bgColor--active     : darken($color-white, $color-active-01);
$btn-ghostTertiary-textColor           : $color-content-interactive-tertiary;
$btn-ghostTertiary-loading-color       : $color-content-interactive-tertiary;
$btn-ghostTertiary-loading-colorOpaque : rgba($btn-ghostTertiary-loading-color, $btn-default-loading-opacity);

$btn-link-loading-color                : $color-content-link;
$btn-link-loading-colorOpaque          : rgba($btn-link-loading-color, $btn-default-loading-opacity);

$btn-disabled-bgColor                  : $color-disabled-01;
$btn-disabled-textColor                : $color-content-disabled;

$btn-sizeLarge-padding                 : 14px spacing(x3);
$btn-sizeLarge-loading-color           : $color-content-interactive-light;
$btn-sizeLarge-loading-colorOpaque     : rgba($btn-sizeLarge-loading-color, $btn-default-loading-opacity);

$btn-sizeSmall-font-size               : 'body-l';
$btn-sizeSmall-padding                 : spacing() spacing(x2);
$btn-sizeSmall-iconHeight              : 15px;
$btn-sizeSmall-iconSpacing             : 2.5px;
$btn-sizeSmall-iconSideSpacing         : $btn-sizeSmall-iconSpacing + spacing();

$btn-sizeXSmall-font-size              : 'body-s';
$btn-sizeXSmall-padding                : 6px spacing();
$btn-sizeXSmall-iconHeight             : 12px;
$btn-sizeXSmall-iconSpacing            : 2px;
$btn-sizeXSmall-iconSideSpacing        : $btn-sizeXSmall-iconSpacing + spacing();

$btn-icon-sizeLarge-buttonSize         : 56px; // button--icon is a sircle so width and height can use one var
$btn-icon-sizeLarge-iconSize           : 21px;
$btn-icon-sizeMedium-buttonSize        : 48px;
$btn-icon-sizeMedium-iconSize          : 21px;
$btn-icon-sizeSmall-buttonSize         : 40px;
$btn-icon-sizeSmall-iconSize           : 18px;
$btn-icon-sizeXSmall-buttonSize        : 32px;
$btn-icon-sizeXSmall-iconSize          : 18px;

@include loadingIndicator('medium');

.c-spinner {
    margin: 0 auto;
    position: absolute;
    left: calc(50% - 10px); // Substract half of the size of the spinner.
    top: calc(50% - 10px); // Substract half of the size of the spinner.
}

.o-btn {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    @include font-size($btn-default-font-size);
    cursor: pointer;
    padding: $btn-default-padding;
    overflow: visible;
    text-align: center;
    font-weight: $btn-default-weight;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;
    color: $btn-secondary-textColor;
    text-decoration: none;

    // Hide focus styles if they're not needed, for example, when an element receives focus via the mouse.
    &:focus:not(:focus-visible) {
        outline: 0;
    }

    // Show focus styles on keyboard focus.
    &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 2px $btn-default-outline-color;
    }

    &:hover,
    &:active {
        &:not(.o-btn--link) {
            outline: 0; // no need as already has a focus/active state
        }
    }

    &,
    &:hover,
    &:active,
    &:focus,
    &:visited {
        text-decoration: none;
    }
}
    .o-button-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // Visually hide button content (used for loading states)
    .o-btn-content--hidden {
        visibility: hidden;
    }

    .o-btn-icon {
        display: flex;
        margin: $btn-default-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        height: $btn-default-iconHeight;
    }

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $color-grey-50;
    }

    .o-btn-icon--leading {
        margin-right: $btn-default-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-left: $btn-default-iconSideSpacing;
    }

/**
 * Modifier – .o-btn--primary
 *
 * Sets the btn colour to site primary colour
 */

.o-btn--primary,
.o-btn--icon.o-btn--primary {
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
    &.o-btn--loading {
        background-color: $btn-primary-bgColor--active;
    }

    @include spinnerColor($btn-primary-loading-color, $btn-primary-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-primary-textColor;
    }

    &.o-btn--sizeSmall,
    &.o-btn--sizeXSmall {
        background-color: $color-interactive-primary;

        &:hover {
            background-color: lighten($color-interactive-primary, $color-hover-02);
        }
        &:active,
        &.o-btn--loading {
            background-color: lighten($color-interactive-primary, $color-active-02);
        }
    }
}

.o-btn--icon.o-btn--primary {
    &.o-btn--sizeSmall,
    &.o-btn--sizeXSmall {
        background-color: $btn-primary-bgColor;

        &:hover {
            background-color: $btn-primary-bgColor--hover;
        }
        &:active,
        &.o-btn--loading {
            background-color: $btn-primary-bgColor--active;
        }
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

    &:hover,
    &:active,
    &:focus {
        color: $btn-secondary-textColor;
    }

    &:hover {
        background-color: $btn-secondary-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-secondary-bgColor--active;
    }

    @include spinnerColor($btn-secondary-loading-color, $btn-secondary-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-secondary-textColor;
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

    &:active,
    &.o-btn--loading {
        background-color: $btn-outline-bgColor--active;
    }

    @include spinnerColor($btn-outline-loading-color, $btn-outline-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-outline-textColor;
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

    &:active,
    &.o-btn--loading {
        background-color: $btn-ghost-bgColor--active;
    }

    @include spinnerColor($btn-ghost-loading-color, $btn-ghost-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-ghost-textColor;
    }
}

/**
 * Modifier – .o-btn--ghostTertiary
 *
 * Accompanying button that can be used on solid background colours (such as grey)
 * this button type should only be used with iconButtons
 */

.o-btn--ghostTertiary {
    background-color: $btn-ghostTertiary-bgColor;
    color: $btn-ghostTertiary-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-ghostTertiary-textColor;
    }

    &:hover {
        background-color: $btn-ghostTertiary-bgColor--hover;
    }

    &:active,
    &.o-btn--loading {
        background-color: $btn-ghostTertiary-bgColor--active;
    }

    @include spinnerColor($btn-ghostTertiary-loading-color, $btn-ghostTertiary-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-ghostTertiary-textColor;
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
    color: $color-content-link;
    font-weight: $font-weight-bold;

    &:hover {
        cursor: pointer;
        color: lighten($color-content-link, $color-hover-02);
        background-color: transparent;
        text-decoration: underline;
    }
    &:active,
    &:focus {
        color: lighten($color-content-link, $color-active-02);
        background-color: transparent;
    }

    @include spinnerColor($btn-link-loading-color, $btn-link-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $color-content-link;
    }
}

/**
 * ==========================================================================
 * Modifier – .o-btn--icon
 *
 * Handles styling when only an icon is displayed within the button component
 * ==========================================================================
 */

.o-btn--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &.o-btn--primary {
        path {
            fill: $btn-primary-textColor;
        }
    }

    &.o-btn--secondary {
        path {
            fill: $btn-secondary-textColor;
        }
    }

    &.o-btn--outline {
        path {
            fill: $btn-outline-textColor;
        }
    }

    &.o-btn--ghost {
        path {
            fill: $btn-ghost-textColor;
        }
    }

    &.o-btn--ghostTertiary {
        path {
            fill: $btn-ghostTertiary-textColor;
        }
    }

    &.o-btn--link {
        path {
            fill: $color-content-link;
        }

        &:hover {
            path {
                fill: darken($color-content-link, $color-hover-01);
            }
        }

        &:active,
        &:focus {
            path {
                fill: darken($color-content-link, $color-active-01);
            }
        }
    }
}

.o-btn--icon.o-btn--sizeLarge {
    width: $btn-icon-sizeLarge-buttonSize;
    height: $btn-icon-sizeLarge-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeLarge-iconSize;
        height: $btn-icon-sizeLarge-iconSize;
    }
}
.o-btn--icon.o-btn--sizeMedium {
    width: $btn-icon-sizeMedium-buttonSize;
    height: $btn-icon-sizeMedium-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeMedium-iconSize;
        height: $btn-icon-sizeMedium-iconSize;
    }
}
.o-btn--icon.o-btn--sizeSmall {
    width: $btn-icon-sizeSmall-buttonSize;
    height: $btn-icon-sizeSmall-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeSmall-iconSize;
        height: $btn-icon-sizeSmall-iconSize;
    }
}
.o-btn--icon.o-btn--sizeXSmall {
    width: $btn-icon-sizeXSmall-buttonSize;
    height: $btn-icon-sizeXSmall-buttonSize;
    padding: 0;

    svg {
        width: $btn-icon-sizeXSmall-iconSize;
        height: $btn-icon-sizeXSmall-iconSize;
    }
}

/**
 * ==========================================================================
 * Btn Size Modifiers
 * ==========================================================================
 */

.o-btn--sizeLarge {
    padding: $btn-sizeLarge-padding;
}

.o-btn--sizeSmall {
    @include font-size($btn-sizeSmall-font-size);
    padding: $btn-sizeSmall-padding;

    .o-btn-icon {
        margin: $btn-sizeSmall-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        height: $btn-sizeSmall-iconHeight;
    }

    .o-btn-icon--leading {
        margin-right: $btn-sizeSmall-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-left: $btn-sizeSmall-iconSideSpacing;
    }
}

.o-btn--sizeXSmall {
    @include font-size($btn-sizeXSmall-font-size);
    padding: $btn-sizeXSmall-padding;

    .o-btn-icon {
        margin: $btn-sizeXSmall-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        height: $btn-sizeXSmall-iconHeight;
    }

    .o-btn-icon--leading {
        margin-right: $btn-sizeSmall-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-left: $btn-sizeSmall-iconSideSpacing;
    }
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

/**
 * ==========================================================================
 * Disabled state styling
 * ==========================================================================
 */

.o-btn {
    &.is-disabled,
    &[disabled] {
        cursor: not-allowed;

        &,
        &:hover {
            background-color: $btn-disabled-bgColor;
            color: $btn-disabled-textColor;
        }

        .o-btn-icon svg use,
        .o-btn-icon svg path {
            fill: $btn-disabled-textColor;
        }
    }
}
</style>
