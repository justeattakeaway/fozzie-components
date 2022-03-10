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
$selected-color: $color-content-positive;
$checkbox-width: 16px;
$transition-duration: 0.2s;
$ease: ease-in-out;

@mixin ellipsis() {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.c-filterPill {
    box-shadow: 0 0 0 1px $color-grey-30;
    border-radius: $radius-rounded-e;
    background: $color-white;
    transition: .1s;

    &:focus-within:not(.c-filterPill--disabled) {
        box-shadow: 0 0 0 2px $color-focus;
    }
}

.c-filterPill--selected {
    box-shadow: 0 0 0 2px $color-focus;
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
        box-shadow: none;
    }

    .c-filterPill--selected & {
        color: $selected-color;
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
    min-width: 0;
    transform: translate3d(0, 0, 0) scale(0) rotate(-45deg);
    will-change: transform, opacity, width, min-width, margin-right;

    @media (prefers-reduced-motion: no-preference) {
        transition: transform $transition-duration $ease,
                    opacity $transition-duration $ease,
                    width $transition-duration $ease,
                    min-width $transition-duration $ease,
                    margin-right $transition-duration $ease;
    }

    .c-filterPill--selected &,
    .c-filterPill:hover:not(.c-filterPill--disabled) & {
        transform: translate3d(0, 0, 0) scale(1);
        opacity: 1;
        width: $checkbox-width;
        min-width: $checkbox-width;
        margin-right: spacing(b);
    }

    .c-filterPill--selected & path {
        fill: $selected-color;
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
        color: $selected-color;
    }
}
</style>
