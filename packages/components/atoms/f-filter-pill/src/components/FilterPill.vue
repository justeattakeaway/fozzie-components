<template>
    <div
        :class="[
            $style['c-filterPill'], {
                [$style['c-filterPill--selected']]: isToggleSelected,
                [$style['c-filterPill--disabled']]: isToggleDisabled
            }]"
        data-test-id="filter-item">
        <input
            :id="`filterPillToggle-${inputId}`"
            type="checkbox"
            class="is-visuallyHidden"
            :class="$style['c-filterPill-checkbox']"
            data-test-id="filter-pill-input"
            :tabindex="0"
            :disabled="isToggleDisabled"
            @change="toggleFilter">
        <label
            :class="$style['c-filterPill-label']"
            :for="`filterPillToggle-${inputId}`"
            data-test-id="filter-pill-label"
            :tabindex="-1">
            <tick-icon :class="$style['c-filterPill-icon']" />
            <span
                :class="$style['c-filterPill-text']"
                data-test-id="filter-pill-text">
                {{ displayText }}
            </span>
            <span
                :class="$style['c-filterPill-number']"
                data-test-id="filter-pill-number">
                {{ displayNumber }}
            </span>
        </label>
    </div>
</template>

<script>
import { TickIcon } from '@justeat/f-vue-icons';

export default {
    name: 'FilterPill',
    components: {
        TickIcon
    },
    props: {
        inputId: {
            type: String,
            default: null
        },
        toggleValue: {
            type: String,
            default: null
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        displayText: {
            type: String,
            default: null
        },
        displayNumber: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            isToggleSelected: false,
            isToggleDisabled: false
        };
    },
    computed: {},
    watch: {
        isSelected (newValue) {
            if (newValue !== this.isToggleSelected) {
                this.isToggleSelected = newValue;
            }
        },
        isDisabled (newValue) {
            if (newValue !== this.isToggleDisabled) {
                this.isToggleDisabled = newValue;
            }
        }
    },
    created () {
        this.isToggleSelected = this.isSelected;
        this.isToggleDisabled = this.isDisabled;
    },
    methods: {
        toggleFilter () {
            this.isToggleSelected = !this.isToggleSelected;

            this.$nextTick(() => {
                this.$emit('toggle', this.toggleValue);
            });
        }
    }
};
</script>

<style lang="scss" module>
$filter-pill-selected: $color-content-positive;
$filter-pill-checkbox-width: 16px;

@mixin ellipsis() {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.c-filterPill {
    outline: 1px solid $color-grey-30;
    border-radius: $radius-rounded-e;
    background: $color-white;

    &:focus-within:not(.c-filterPill--disabled) {
        outline: 2px solid $color-focus;
    }
}

.c-filterPill--selected {
    outline-color: $filter-pill-selected;
}

.c-filterPill-label {
    display: flex;
    padding: spacing(b) spacing(d);
    cursor: pointer;
    @include font-size(body-m);
    font-family: $font-family-base;
    font-weight: $font-weight-regular;

    &:focus {
        outline: none; // Prevents Safari doubling focus styles.
    }

    .c-filterPill--selected & {
        color: $filter-pill-selected;
    }

    .c-filterPill--disabled & {
        color: #efedea;
        cursor: default;
    }
}

.c-filterPill-icon {
    align-self: center;
    opacity: 0;
    width: 0;

    .c-filterPill--selected &,
    .c-filterPill:hover:not(.c-filterPill--disabled) & {
        opacity: 1;
        width: $filter-pill-checkbox-width;
        min-width: $filter-pill-checkbox-width;
        margin-right: spacing(b);

        path {
            fill: $filter-pill-selected;
        }
    }
}

.c-filterPill-text {
    flex: 1;
    @include ellipsis();
}

.c-filterPill-number {
    white-space: nowrap;
    padding-left: spacing(d);

    .c-filterPill--selected & {
        color: $filter-pill-selected;
    }
}
</style>
