<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
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

            // Convert from kebab-case (if applicable) to PascalCase
            return this.buttonSize.split('-').map(x => x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()).join('');
        },

        /**
         * Renders `Link` component if a `href` attribute is applied to the component
         * Renders `RouterLink` component if a `to` attribute is applied to the component, avoids page reload compared to Link with `href`
         * Renders `Action` component if no `href` attribute is applied to the component
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
                throw new TypeError(`buttonType for ${componentType} is set to "${this.buttonType}", but it must be one of the following: "${validTypes.join('", "')}"`);
            }

            const validSizes = VALID_BUTTON_SIZES[componentType];
            if (!validSizes.includes(this.buttonSize)) {
                throw new TypeError(`buttonSize for ${componentType} is set to "${this.buttonSize}", but it must be one of the following: "${validSizes.join('", "')}"`);
            }

            if (!VALID_BUTTON_ICON_POSITION.includes(this.hasIcon)) {
                throw new TypeError(`hasIcon is set to "${this.hasIcon}", but it can only be one of the following button icon positions: "${VALID_BUTTON_ICON_POSITION.join('", "')}"`);
            }
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$btn-default-borderRadius              : f.$radius-rounded-e;
$btn-default-font-size                 : 'heading-s';
$btn-default-weight                    : f.$font-weight-bold;
$btn-default-padding-block             : 9px;
$btn-default-padding-inline            : f.spacing(e);
$btn-default-loading-opacity           : 0.35;
$btn-default-iconHeight                : 18px;
$btn-default-iconSpacing               : 3px;
$btn-default-iconSideSpacing           : $btn-default-iconSpacing + f.spacing();

$btn-primary-bgColor                   : f.$color-interactive-brand;
$btn-primary-bgColor--hover            : darken(f.$color-interactive-brand, f.$color-hover-01);
$btn-primary-bgColor--active           : darken(f.$color-interactive-brand, f.$color-active-01);
$btn-primary-textColor                 : f.$color-content-interactive-light;
$btn-primary-loading-color             : f.$color-content-interactive-light;
$btn-primary-loading-colorOpaque       : rgba($btn-primary-loading-color, $btn-default-loading-opacity);

$btn-secondary-bgColor                 : f.$color-interactive-secondary;
$btn-secondary-bgColor--hover          : darken(f.$color-interactive-secondary, f.$color-hover-01);
$btn-secondary-bgColor--active         : darken(f.$color-interactive-secondary, f.$color-active-01);
$btn-secondary-textColor               : f.$color-content-interactive-secondary;
$btn-secondary-loading-color           : f.$color-content-interactive-secondary;
$btn-secondary-loading-colorOpaque     : rgba($btn-secondary-loading-color, $btn-default-loading-opacity);

$btn-outline-bgColor                   : transparent;
$btn-outline-bgColor--hover            : darken(f.$color-white, f.$color-hover-01);
$btn-outline-bgColor--active           : darken(f.$color-white, f.$color-active-01);
$btn-outline-textColor                 : f.$color-content-interactive-tertiary;
$btn-outline-border-color              : f.$color-border-default;
$btn-outline-loading-color             : f.$color-content-interactive-tertiary;
$btn-outline-loading-colorOpaque       : rgba($btn-outline-loading-color, $btn-default-loading-opacity);

$btn-ghost-bgColor                     : transparent;
$btn-ghost-bgColor--hover              : darken(f.$color-white, f.$color-hover-01);
$btn-ghost-bgColor--active             : darken(f.$color-white, f.$color-active-01);
$btn-ghost-textColor                   : f.$color-content-interactive-secondary;
$btn-ghost-loading-color               : f.$color-content-interactive-secondary;
$btn-ghost-loading-colorOpaque         : rgba($btn-ghost-loading-color, $btn-default-loading-opacity);

$btn-ghostTertiary-bgColor             : transparent;
$btn-ghostTertiary-bgColor--hover      : darken(f.$color-white, f.$color-hover-01);
$btn-ghostTertiary-bgColor--active     : darken(f.$color-white, f.$color-active-01);
$btn-ghostTertiary-textColor           : f.$color-content-interactive-tertiary;
$btn-ghostTertiary-loading-color       : f.$color-content-interactive-tertiary;
$btn-ghostTertiary-loading-colorOpaque : rgba($btn-ghostTertiary-loading-color, $btn-default-loading-opacity);

$btn-inverse-loading-color             : f.$color-content-interactive-brand;
$btn-inverse-loading-colorOpaque       : rgba($btn-inverse-loading-color, $btn-default-loading-opacity);

$btn-ghostInverse-loading-color        : f.$color-content-interactive-light;
$btn-ghostInverse-loading-colorOpaque  : rgba($btn-ghostInverse-loading-color, $btn-default-loading-opacity);

$btn-link-loading-color                : f.$color-content-link;
$btn-link-loading-colorOpaque          : rgba($btn-link-loading-color, $btn-default-loading-opacity);

$btn-disabled-bgColor                  : f.$color-disabled-01;
$btn-disabled-textColor                : f.$color-content-disabled;

$btn-sizeLarge-padding-block           : 13px;
$btn-sizeLarge-padding-inline          : f.spacing(e);
$btn-sizeLarge-loading-color           : f.$color-content-interactive-light;
$btn-sizeLarge-loading-colorOpaque     : rgba($btn-sizeLarge-loading-color, $btn-default-loading-opacity);

$btn-sizeSmallExpressive-font-size       : 'heading-s';
$btn-sizeSmallExpressive-padding-block   : 5px;
$btn-sizeSmallExpressive-padding-inline  : f.spacing(d);
$btn-sizeSmallExpressive-iconHeight      : 15px;
$btn-sizeSmallExpressive-iconSpacing     : 2.5px;
$btn-sizeSmallExpressive-iconSideSpacing : $btn-sizeSmallExpressive-iconSpacing + f.spacing();

$btn-sizeSmallProductive-font-size       : 'body-l';
$btn-sizeSmallProductive-padding-block   : 7px;
$btn-sizeSmallProductive-padding-inline  : f.spacing(d);
$btn-sizeSmallProductive-iconHeight      : 15px;
$btn-sizeSmallProductive-iconSpacing     : 2.5px;
$btn-sizeSmallProductive-iconSideSpacing : $btn-sizeSmallProductive-iconSpacing + f.spacing();

$btn-sizeXSmall-font-size              : 'body-s';
$btn-sizeXSmall-padding-block          : 5px;
$btn-sizeXSmall-padding-inline         : f.spacing();
$btn-sizeXSmall-iconHeight             : 12px;
$btn-sizeXSmall-iconSpacing            : 2px;
$btn-sizeXSmall-iconSideSpacing        : $btn-sizeXSmall-iconSpacing + f.spacing();

$btn-icon-iconSize                     : 18px; // at the moment all the icon buttons except large have the same icon size
$btn-icon-sizeLarge-buttonSize         : 56px; // icon button is a circle so width and height can use one var
$btn-icon-sizeLarge-iconSize           : 21px;
$btn-icon-sizeMedium-buttonSize        : 48px;
$btn-icon-sizeSmall-buttonSize         : 40px;
$btn-icon-sizeXSmall-buttonSize        : 32px;


@include f.loadingIndicator('medium');

.c-spinner {
    margin-block: 0;
    margin-inline: auto;
    position: absolute;
    inset-inline-start: calc(50% - 10px); // Substract half of the size of the spinner.
    inset-block-start: calc(50% - 10px); // Substract half of the size of the spinner.
}

.o-btn {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    @include f.font-size($btn-default-font-size);
    cursor: pointer;
    padding-block: $btn-default-padding-block;
    padding-inline: $btn-default-padding-inline;
    overflow: visible;
    text-align: center;
    font-weight: $btn-default-weight;
    border-radius: $btn-default-borderRadius;
    border: 1px solid transparent;
    user-select: none;
    color: $btn-secondary-textColor;
    text-decoration: none;
    outline: 0;

    // Show focus styles on keyboard focus.
    &:focus,
    &:focus-visible {
        @extend %u-elementFocus;

        &, &:after {
            border-radius: $btn-default-borderRadius;
        }
    }

    &,
    &:hover,
    &:active,
    &:focus,
    &:visited {
        text-decoration: none;
    }

    p + & {
        margin-block-start: f.spacing(d);
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
        block-size: $btn-default-iconHeight;
    }

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: f.$color-content-subdued;
    }

    .o-btn-icon--leading {
        margin-inline-end: $btn-default-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-inline-start: $btn-default-iconSideSpacing;
    }

/**
 * Modifier – .o-btn--primary
 *
 * Sets the btn colour to site primary colour
 */

.o-btn--primary,
.o-btn--icon.o-btn--primary {
    @include common.background-color($btn-primary-bgColor);

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
        @include common.background-color($btn-primary-bgColor--hover);
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color($btn-primary-bgColor--active);
    }

    @include f.spinnerColor($btn-primary-loading-color, $btn-primary-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-primary-textColor;
    }

    &.o-btn--sizeSmall,
    &.o-btn--sizeSmallProductive,
    &.o-btn--sizeXSmall {
        @include common.background-color(f.$color-interactive-primary);

        &:hover {
            @include common.background-color(lighten(f.$color-interactive-primary, f.$color-hover-02));
        }
        &:active,
        &.o-btn--loading {
            @include common.background-color(lighten(f.$color-interactive-primary, f.$color-active-02));
        }
    }
}

.o-btn--icon.o-btn--primary {
    &.o-btn--sizeSmall,
    &.o-btn--sizeXSmall {
        @include common.background-color($btn-primary-bgColor);

        &:hover {
            @include common.background-color($btn-primary-bgColor--hover);
        }
        &:active,
        &.o-btn--loading {
            @include common.background-color($btn-primary-bgColor--active);
        }
    }
}

/**
 * Modifier – .o-btn--secondary
 *
 * Accompanying secondary style button (knocked back slightly from the primary button)
 */

.o-btn--secondary {
    @include common.background-color($btn-secondary-bgColor);
    color: $btn-secondary-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-secondary-textColor;
    }

    &:hover {
        @include common.background-color($btn-secondary-bgColor--hover);
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color($btn-secondary-bgColor--active);
    }

    @include f.spinnerColor($btn-secondary-loading-color, $btn-secondary-loading-colorOpaque);

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

    @include f.spinnerColor($btn-outline-loading-color, $btn-outline-loading-colorOpaque);

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
    @include common.background-color($btn-ghost-bgColor);
    color: $btn-ghost-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-ghost-textColor;
    }

    &:hover {
        @include common.background-color($btn-ghost-bgColor--hover);
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color($btn-ghost-bgColor--active);
    }

    @include f.spinnerColor($btn-ghost-loading-color, $btn-ghost-loading-colorOpaque);

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
    @include common.background-color($btn-ghostTertiary-bgColor);
    color: $btn-ghostTertiary-textColor;

    &:hover,
    &:active,
    &:focus {
        color: $btn-ghostTertiary-textColor;
    }

    &:hover {
        @include common.background-color($btn-ghostTertiary-bgColor--hover);
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color($btn-ghostTertiary-bgColor--active);
    }

    @include f.spinnerColor($btn-ghostTertiary-loading-color, $btn-ghostTertiary-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: $btn-ghostTertiary-textColor;
    }
}

/**
 * Modifier – .o-btn--inverse
 *
 * Accompanying button that can be used on solid background colours (such as grey)
 * this button type should only be used with iconButtons
 */

.o-btn--inverse {
    @include common.background-color(f.$color-interactive-inverse); // for icon button to have a white background when it is located on top of images/dark surfaces

    &:hover {
        @include common.background-color($btn-ghost-bgColor--hover);
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color($btn-ghost-bgColor--active);
    }

    @include f.spinnerColor($btn-inverse-loading-color, $btn-inverse-loading-colorOpaque);
}

/**
 * Modifier – .o-btn--ghostInverse
 *
 * Accompanying button that can be used on solid background colours (such as grey)
 * this button type should only be used with iconButtons
 */

.o-btn--ghostInverse {
    @include common.background-color($btn-ghost-bgColor);

    &:hover {
        @include common.background-color(lighten(f.$color-black, f.$color-hover-02));
    }

    &:active,
    &.o-btn--loading {
        @include common.background-color(lighten(f.$color-black, f.$color-active-02));
    }

    @include f.spinnerColor($btn-ghostInverse-loading-color, $btn-ghostInverse-loading-colorOpaque);
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
    padding: 0 !important; // !important is added to be sure that this style is not overridden by size modifier paddings
    color: f.$color-content-link;
    font-weight: f.$font-weight-bold;

    &:hover {
        cursor: pointer;
        color: lighten(f.$color-content-link, f.$color-hover-02);
        background-color: transparent;
        text-decoration: underline;
    }
    &:active,
    &:focus {
        color: lighten(f.$color-content-link, f.$color-active-02);
        background-color: transparent;
    }

    @include f.spinnerColor($btn-link-loading-color, $btn-link-loading-colorOpaque);

    .o-btn-icon svg use,
    .o-btn-icon svg path {
        fill: f.$color-content-link;
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

    &.o-btn--ghost,
    &.o-btn--inverse {
        path {
            fill: f.$color-content-interactive-brand;
        }
    }

    &.o-btn--ghost {
        @include f.spinnerColor($btn-inverse-loading-color, $btn-inverse-loading-colorOpaque); // spinner colour for the ghost icon button loading state is the same as for inverse button
    }

    &.o-btn--ghostInverse {
        path {
            fill: f.$color-content-inverse;
        }
    }

    &.o-btn--ghostTertiary {
        path {
            fill: $btn-ghostTertiary-textColor;
        }
    }

    svg {
        inline-size: $btn-icon-iconSize;
        block-size: $btn-icon-iconSize;
    }

    &.o-btn--sizeLarge {
        inline-size: $btn-icon-sizeLarge-buttonSize;
        block-size: $btn-icon-sizeLarge-buttonSize;
        padding: 0;

        svg {
            inline-size: $btn-icon-sizeLarge-iconSize;
            block-size: $btn-icon-sizeLarge-iconSize;
        }
    }

    &.o-btn--sizeMedium {
        inline-size: $btn-icon-sizeMedium-buttonSize;
        block-size: $btn-icon-sizeMedium-buttonSize;
        padding: 0;
    }

    &.o-btn--sizeSmall {
        inline-size: $btn-icon-sizeSmall-buttonSize;
        block-size: $btn-icon-sizeSmall-buttonSize;
        padding: 0;
    }

    &.o-btn--sizeXSmall {
        inline-size: $btn-icon-sizeXSmall-buttonSize;
        block-size: $btn-icon-sizeXSmall-buttonSize;
        padding: 0;
    }
}

/**
 * ==========================================================================
 * Btn Size Modifiers
 * ==========================================================================
 */

.o-btn--sizeLarge {
    padding-block: $btn-sizeLarge-padding-block;
    padding-inline: $btn-sizeLarge-padding-inline;
}

.o-btn--sizeSmallExpressive {
    @include f.font-size($btn-sizeSmallExpressive-font-size);
    padding-block: $btn-sizeSmallExpressive-padding-block;
    padding-inline: $btn-sizeSmallExpressive-padding-inline;

    .o-btn-icon {
        margin: $btn-sizeSmallExpressive-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        block-size: $btn-sizeSmallExpressive-iconHeight;
    }

    .o-btn-icon--leading {
        margin-inline-end: $btn-sizeSmallExpressive-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-inline-start: $btn-sizeSmallExpressive-iconSideSpacing;
    }
}

.o-btn--sizeSmallProductive {
    @include f.font-size($btn-sizeSmallProductive-font-size);
    padding-block: $btn-sizeSmallProductive-padding-block;
    padding-inline: $btn-sizeSmallProductive-padding-inline;

    .o-btn-icon {
        margin: $btn-sizeSmallProductive-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        block-size: $btn-sizeSmallProductive-iconHeight;
    }

    .o-btn-icon--leading {
        margin-inline-end: $btn-sizeSmallProductive-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-inline-start: $btn-sizeSmallProductive-iconSideSpacing;
    }
}

.o-btn--sizeXSmall {
    @include f.font-size($btn-sizeXSmall-font-size);
    padding-block: $btn-sizeXSmall-padding-block;
    padding-inline: $btn-sizeXSmall-padding-inline;

    .o-btn-icon {
        margin: $btn-sizeXSmall-iconSpacing;
    }

    .o-btn-icon,
    .o-btn-icon svg {
        block-size: $btn-sizeXSmall-iconHeight;
    }

    .o-btn-icon--leading {
        margin-inline-end: $btn-sizeXSmall-iconSideSpacing;
    }

    .o-btn-icon--trailing {
        margin-inline-start: $btn-sizeXSmall-iconSideSpacing;
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
    inline-size: 100%;

    // Vertically space out multiple fullWidth buttons
    // same as .o-btn--fullWidth + .o-btn--fullWidth
    & + & {
        margin-block-start: f.spacing(d);
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
            @include common.background-color($btn-disabled-bgColor);
            color: $btn-disabled-textColor;
        }

        .o-btn-icon svg use,
        .o-btn-icon svg path {
            fill: $btn-disabled-textColor;
        }

        &.o-btn--link {
            background-color: transparent;
        }
    }
}
</style>
