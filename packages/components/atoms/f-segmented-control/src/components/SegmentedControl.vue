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
            validator: value => {
                if (value.length < 2 || value.length > 4) {
                    return false;
                }

                let selectedCount = 0;
                return value.every(option => {
                    if (typeof option !== 'object') {
                        return false;
                    }

                    if (typeof option.label !== 'string' || !option.label) {
                        return false;
                    }

                    if (option.iconName && typeof option.iconName !== 'string') {
                        return false;
                    }

                    if (option.disabled && typeof option.disabled !== 'boolean') {
                        return false;
                    }

                    if (option.selected) {
                        selectedCount++;
                        if (typeof option.selected !== 'boolean' || selectedCount > 1) {
                            return false;
                        }
                    }

                    return true;
                });
            }
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
        selectOption (label) {
            const previousIndex = this.tabIndex;
            const newIndex = this.options.findIndex(option => option.label === label);

            this.selectedLabel = label;

            this.$emit('input', label);

            if (newIndex !== previousIndex) {
                this.focusNewButton(newIndex, this.$el.children[previousIndex]);
            }
        },
        onKeyDown (event) {
            let newIndex = this.tabIndex;
            const currentButton = event.target;

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
                this.focusNewButton(newIndex, currentButton);
            }
        },
        focusNewButton (newIndex, currentButton) {
            this.tabIndex = newIndex;
            // Remove focus from the current button
            currentButton.blur();

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
$sc-sm-height: f.spacing(f);
$sc-l-height: calc(f.spacing(b) * 6);
$sc-border-radius: 9999px;
$sc-padding-xs-modifier: calc(f.spacing(a) / 2);
$sc-background-clr: f.$color-container-strong;
$sc-background-clr-selected: f.$color-container-default;

// Segmented control container
.c-segmented-control {
    display: flex;
    justify-content: space-between;
    background-color: $sc-background-clr;
    border-radius: $sc-border-radius;
    gap: 2.5px; // Ensure outlines and box-shadows don't overlap
    padding: $sc-padding-xs-modifier;
    min-block-size: $sc-sm-height; // Small size by default
    user-select: none;

    // Large size modifier
    &--large {
        min-block-size: $sc-l-height;

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

    // Selected state
    &--selected {
        font-weight: f.$font-weight-bold;
        background-color: f.$color-container-default;
        box-shadow: f.$elevation-02;

        // Hover state
        &:hover:not(:disabled) {
            // Prevent hover effects from being applied on touch devices
            @media(hover: hover) and (pointer: fine) {
                background-color: darken($sc-background-clr-selected, f.$color-hover-01);
            }
        }

        // Active state
        &:active:not(:disabled) {
            background-color: darken($sc-background-clr-selected, f.$color-active-01);
        }
    }

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
            background-color: darken($sc-background-clr, f.$color-hover-01);
        }
    }

    // Active state
    &:active:not(:disabled) {
        background-color: darken($sc-background-clr, f.$color-active-01);
    }

    // Focus state
    &:focus {
        box-shadow: 0 0 0 2px f.$color-focus-outer;
    }
}
</style>