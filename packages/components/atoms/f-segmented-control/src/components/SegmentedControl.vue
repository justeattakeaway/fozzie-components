<template>
    <div
        :class="{
            [$style['c-segmented-control']]: true,
            [$style['c-segmented-control--large']]: size === 'large'
        }"
        :aria-label="screenreaderLabel"
        role="radiogroup"
        tabindex="-1"
        @keydown="onKeyDown"
    >
        <button
            v-for="(option, index) in options"
            :key="option.label"
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

                    if (option.selected && typeof option.selected !== 'boolean') {
                        return false;
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
        return {
            selectedLabel: this.options.find(option => option.selected)?.label || this.options[0].label,
            tabIndex: this.options.findIndex(option => option.selected) > -1 ? this.options.findIndex(option => option.selected) : 0
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

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                // Move focus to the next button
                newIndex = (this.tabIndex + 1) % this.options.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                // Move focus to the previous button
                newIndex = (this.tabIndex - 1 + this.options.length) % this.options.length;
            } else if (event.key === 'Enter' || event.key === 'Space') {
                event.preventDefault(); // Prevent the default behavior (e.g., scrolling)
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

$sc-sm-height: f.spacing(f);
$sc-l-height: 48px; // TODO - discuss with design as this breaks convention
$sc-border-radius: 9999px;

.c-segmented-control {
    display: flex;
    justify-content: space-between;
    background-color: f.$color-container-strong;
    border-radius: $sc-border-radius;
    gap: 2.5px;
    padding: 2px;
    min-height: $sc-sm-height; // small size by default
    user-select: none;

    &--large {
        min-height: $sc-l-height;

        .c-segmented-control__option {
            padding-block: 10px;
        }
    }
}

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
    outline: none; // We replace outline with a box-shadow on focus due to ios safari not respecting border-radius

    &--selected {
        font-weight: f.$font-weight-bold;
        background-color: f.$color-container-default;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.02), 0px 2px 12px -2px rgba(0, 0, 0, 0.08), 0px 3px 6px rgba(0, 0, 0, 0.06); // TODO - find out how we're meant to use the design tokens for this
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    &:disabled {
        color: f.$color-content-disabled;
        background-color: f.$color-disabled-01;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        // This prevents hover effects from being applied on touch devices
        @media(hover: hover) and (pointer: fine) {
            background-color: rgba(0, 0, 0, 0.04); // TODO - find out how we're meant to use the design tokens for this
        }
    }

    &:active:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.12); // TODO - find out how we're meant to use the design tokens for this
    }

    &:focus {
        box-shadow: 0 0 0 2px f.$color-focus;
    }
}
</style>
