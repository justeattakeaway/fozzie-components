<template>
    <div
        class="segmented-control segmented-control--large"
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
            :class="{ 'segmented-control__option--selected': option.label === selectedLabel }"
            :aria-checked="option.label === selectedLabel"
            role="radio"
            :tabindex="index === tabIndex ? 0 : -1"
            @click="selectOption(option.label)"
            @keydown.space.prevent
            @keydown.enter.prevent
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
                newIndex = (this.tabIndex + 1) % this.options.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                newIndex = (this.tabIndex - 1 + this.options.length) % this.options.length;
            } else if (e.key === 'Enter' || e.key === 'Space') {
                this.selectOption(this.options[this.tabIndex].label);
                return;
            }
            if (newIndex !== this.tabIndex) {
                this.tabIndex = newIndex;
                e.target.blur();
                this.$nextTick(() => {
                    this.$el.children[this.tabIndex].focus();
                });
            }
        }
    }
};
</script>

<style scoped>
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
    font-family: sans-serif;
    user-select: none;
}

.segmented-control--large {
    min-height: 48px;
}

.segmented-control--large .segmented-control__option {
    padding-block: 10px;
}

/* The buttons */
.segmented-control__option {
    font-size: inherit;
    flex: 1;
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
}

.segmented-control__option:not(:disabled) {
    cursor: pointer;
}

.segmented-control__option:disabled {
    color: #8C999B;
    background-color: #EFEDEA;
    cursor: not-allowed;
}

.segmented-control__option--selected {
    font-weight: 700;
    background-color: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.02), 0px 2px 12px -2px rgba(0, 0, 0, 0.08), 0px 3px 6px rgba(0, 0, 0, 0.06);
}

.segmented-control__option:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.04);
}

/* Apply styles to active radio button */
.segmented-control__option:active:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.12);
}

.segmented-control__option:focus {
    outline: 2px solid #094DAC;
}
</style>
