<template>
    <div
        :class="{
            [$style['c-segmented-control']]: true,
            [$style['c-segmented-control--large']]: size === 'large'
        }"
        data-test-id="segmented-control"
        :aria-label="screenreaderLabel"
        role="radiogroup"
        tabindex="-1"
        @keydown="onKeyDown"
    >
        <button
            v-for="(option, index) in options"
            :key="option.label"
            :data-test-id="`segmented-control-option-${index}`"
            type="button"
            :class="{
                [$style['c-segmented-control__option']]: true,
                [$style['c-segmented-control__option--selected']]: option.label === selectedLabel
            }"
            :aria-checked="option.label === selectedLabel ? 'true' : 'false'"
            role="radio"
            :tabindex="focusedTabIndex[index]"
            :disabled="option.disabled"
            @click="selectOption(option.label)"
        >
            <!-- TODO: This is a placeholder for adding vue icons -->
            <span>{{ option.label }}</span>
        </button>
    </div>
</template>

<script>
import { validateOptions } from './helpers/validators';

export default {
    name: 'SegmentedControl',
    props: {
        screenreaderLabel: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true,
            validator: validateOptions
        },
        size: {
            type: String,
            default: 'small',
            validator: value => ['small', 'large'].includes(value)
        }
    },
    data () {
        const selectedIndex = this.options.findIndex(option => option.selected);

        return {
            selectedLabel: (selectedIndex !== undefined && this.options[selectedIndex])
                ? this.options[selectedIndex].label
                : this.options[0].label,
            tabIndex: selectedIndex > -1 ? selectedIndex : 0
        };
    },
    computed: {
        // dynamically set the tabindex attribute on each button, giving focus only to the currently selected button
        focusedTabIndex () {
            return this.options.map((_, index) => (index === this.tabIndex ? 0 : -1));
        }
    },
    methods: {
        /**
         * selectOption - Select a segmented control button and set focus on it if the selected button has changed.
         *
         * @param {String} label - The label of the button to be selected.
         */
        selectOption (label) {
            const previousIndex = this.tabIndex;
            const newIndex = this.options.findIndex(option => option.label === label);

            this.selectedLabel = label;

            this.$emit('input', label);

            if (newIndex !== previousIndex) {
                this.focusNewOption(newIndex, this.$el.children[previousIndex]);
            }
        },
        /**
         * onKeyDown - Handle keyboard navigation and selection for the buttons.
         *
         * @param {KeyboardEvent} event - The keyboard event triggered by the user.
         */
        onKeyDown (event) {
            let newIndex = this.tabIndex;
            const currentOption = event.target;

            // We're using the roving tabindex pattern here:
            // Only the focused element has tabindex not set to -1,
            // so users can easily return to their last focused item when tabbing back.
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                // Move focus to the next button
                newIndex = (this.tabIndex + 1) % this.options.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                // Move focus to the previous button
                newIndex = (this.tabIndex - 1 + this.options.length) % this.options.length;
            } else if (event.key === 'Enter' || event.key === 'Space') {
                event.preventDefault();
                this.selectOption(this.options[this.tabIndex].label);

                return;
            }

            // If the newIndex has changed, update the tabIndex and focus the new button
            if (newIndex !== this.tabIndex) {
                this.focusNewOption(newIndex, currentOption);
            }
        },
        /**
         * focusNewOption - Change focus from the current button to the new one.
         *
         * @param {Number} newIndex - The index of the new button to be focused.
         * @param {HTMLElement} currentOption - The current button that will lose focus.
         */
        focusNewOption (newIndex, currentOption) {
            this.tabIndex = newIndex;
            // Remove focus from the current button
            currentOption.blur();

            // Wait for the DOM to update, then focus the new button
            this.$nextTick(() => {
                this.$el.children[this.tabIndex].focus();
            });
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

// Variables
$sc-height-small: f.spacing(f);
$sc-height-large: calc(f.spacing(b) * 6);
$sc-border-radius: 9999px;
$sc-padding-xs-modifier: calc(f.spacing(a) / 2);
$sc-background-color: f.$color-container-strong;
$sc-background-color-selected: f.$color-container-default;

// Segmented control container
.c-segmented-control {
    display: flex;
    justify-content: space-between;
    background-color: $sc-background-color;
    border-radius: $sc-border-radius;
    gap: 2.5px; // Ensure outlines and box-shadows don't overlap
    padding: $sc-padding-xs-modifier;
    min-block-size: $sc-height-small; // Small size by default
    user-select: none;

    // Large size modifier
    &--large {
        min-block-size: $sc-height-large;

        .c-segmented-control__option {
            padding-block: calc($sc-padding-xs-modifier + f.spacing(b));
        }
    }
}

// Segmented control options
.c-segmented-control__option {
    font-size: inherit;
    color: inherit;
    flex: 1; // Distribute available space equally among buttons
    border-radius: inherit;
    border: none;
    padding: f.spacing(a) f.spacing(e);
    font-weight: f.$font-weight-regular;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: f.spacing(b);
    outline: none; // Replace outline with box-shadow on focus due to iOS Safari not respecting border-radius

    // Not disabled state
    &:not(:disabled) {
        cursor: pointer;
    }

    // Disabled state
    &:disabled {
        color: f.$color-content-disabled;
        background-color: f.$color-disabled-01;
        cursor: not-allowed;
        pointer-events: none;
    }

    // Hover state
    &:hover:not(:disabled) {
        // Prevent hover effects from being applied on touch devices
        @media(hover: hover) and (pointer: fine) {
            background-color: darken($sc-background-color, f.$color-hover-01);
        }
    }

    // Active state
    &:active:not(:disabled) {
        background-color: darken($sc-background-color, f.$color-active-01);
    }

    // Focus state
    &:focus {
        box-shadow: 0 0 0 2px f.$color-focus-outer;
    }

    // Selected state
    &--selected {
        font-weight: f.$font-weight-bold;
        background-color: f.$color-container-default;
        box-shadow: f.$elevation-02;

        // Hover state
        &:hover:not(:disabled) {
            // Prevent hover effects from being applied on touch devices
            @media(hover: hover) and (pointer: fine) {
                background-color: darken($sc-background-color-selected, f.$color-hover-01);
            }
        }

        // Active state
        &:active:not(:disabled) {
            background-color: darken($sc-background-color-selected, f.$color-active-01);
        }
    }
}
</style>
