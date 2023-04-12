<template>
    <div
        class="segmented-control"
        :class="{
            'segmented-control--large': size === 'large'
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
            class="segmented-control__option"
            :class="{
                'segmented-control__option--selected': option.label === selectedLabel
            }"
            :aria-checked="option.label === selectedLabel"
            role="radio"
            :tabindex="index === tabIndex ? 0 : -1"
            @click="selectOption(option.label)"
        >
            <i
                v-if="option.icon"
                :class="option.icon" />
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
            required: true
        },
        size: {
            type: String,
            default: 'small',
            validator: value => ['small', 'large'].includes(value)
        }
    },
    data () {
        return {
            selectedLabel: this.options[0].label,
            tabIndex: 0
        };
    },
    methods: {
        selectOption (label) {
            this.selectedLabel = label;
            this.$emit('input', label);
        },
        onKeyDown (e) {
            let newIndex = this.tabIndex;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                // Move focus to the next button
                newIndex = (this.tabIndex + 1) % this.options.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                // Move focus to the previous button
                newIndex = (this.tabIndex - 1 + this.options.length) % this.options.length;
            } else if (e.key === 'Enter' || e.key === 'Space') {
                e.preventDefault(); // Prevent the default behavior (e.g., scrolling)
                this.selectOption(this.options[this.tabIndex].label);

                return;
            }

            // If the newIndex has changed, update the tabIndex and focus the new button
            if (newIndex !== this.tabIndex) {
                this.tabIndex = newIndex;
                e.target.blur(); // Remove focus from the current button

                // Wait for the DOM to update, then focus the new button
                this.$nextTick(() => {
                    this.$el.children[this.tabIndex].focus();
                });
            }
        }

    }
};
</script>

<style lang="scss" scoped>
/* Define the main segmented control container */
.segmented-control {
    --s-c-border-radius: 9999px;

    display: flex;
    justify-content: space-between;
    background-color: #EFEDEA;
    border-radius: var(--s-c-border-radius);
    gap: 2.5px;
    padding: 2px;
    font-size: 16px;
    min-height: 32px;
    user-select: none;

    &--large {
        min-height: 48px;

        .segmented-control__option {
            padding-block: 10px;
        }
    }
}

.segmented-control__option {
    font-size: inherit;
    flex: 1; /* Distribute available space equally among buttons */
    border-radius: var(--s-c-border-radius);
    border: none;
    padding: 4px 24px;
    text-align: center;
    font-weight: 400;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &--selected {
        font-weight: 700;
        background-color: #fff;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.02), 0px 2px 12px -2px rgba(0, 0, 0, 0.08), 0px 3px 6px rgba(0, 0, 0, 0.06);
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    &:disabled {
        color: #8C999B;
        background-color: #EFEDEA;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &:active:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.12);
    }

    &:focus {
        outline: 2px solid #094DAC;
    }
}
</style>
