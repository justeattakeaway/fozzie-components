<template>
    <div
        :class="[
            $style['c-filterPill'], {
                [$style['c-filterPill--selected']]: isToggleSelected,
                [$style['c-filterPill--disabled']]: isDisabled
            }]"
        data-test-id="filter-item">
        <div v-if="isLoading">
            Loading
        </div>
        <template v-else>
            <a
                :class="$style['c-filterPill-link']"
                :href="href"
                tabindex="-1"
                aria-hidden="true"
                data-test-id="filter-pill-link">
                <span class="is-visuallyHidden">
                    {{ displayText }}
                </span>
            </a>
            <input
                :id="`filterPillToggle-${inputId}`"
                type="checkbox"
                class="is-visuallyHidden"
                :class="$style['c-filterPill-checkbox']"
                data-test-id="filter-pill-input"
                :checked="isToggleSelected"
                :tabindex="0"
                :disabled="isDisabled"
                @change="toggleFilter">
            <label
                :class="$style['c-filterPill-label']"
                :for="`filterPillToggle-${inputId}`"
                data-test-id="filter-pill-label"
                :tabindex="-1">
                <tick-icon :class="$style['c-filterPill-icon']" />
                <p
                    v-if="screenReaderMessage"
                    data-test-id="filter-pill-sr-msg"
                    class="is-visuallyHidden">
                    {{ screenReaderMessage }}
                </p>
                <span
                    :class="$style['c-filterPill-text']"
                    data-test-id="filter-pill-text"
                    :aria-hidden="!!screenReaderMessage">
                    {{ displayText }}
                </span>
                <span
                    :class="$style['c-filterPill-number']"
                    data-test-id="filter-pill-number"
                    :aria-hidden="!!screenReaderMessage">
                    {{ displayNumber }}
                </span>
            </label>
        </template>
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
        href: {
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
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        screenReaderMessage: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            isToggleSelected: false
        };
    },
    computed: {},
    watch: {
        isSelected (newValue) {
            if (newValue !== this.isToggleSelected) {
                this.isToggleSelected = newValue;
            }
        }
    },
    created () {
        this.isToggleSelected = this.isSelected;
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
$filter-pill-selected-color: $color-content-positive;
$filter-pill-checkbox-width: 16px;
$filter-pill-transition-duration: 0.2s;
$filter-pill-ease: ease-in-out;

@mixin ellipsis() {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.c-filterPill {
    box-shadow: 0 0 0 1px $color-border-default;
    border-radius: $radius-rounded-e;
    background: $color-white;
    transition: .1s;

    &:focus-within:not(.c-filterPill--disabled) {
        box-shadow: 0 0 0 2px $color-focus;
    }
}

.c-filterPill--selected {
    box-shadow: 0 0 0 1px $filter-pill-selected-color;
}

.c-filterPill-link {
    pointer-events: none;
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
        color: $filter-pill-selected-color;
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

    @media (prefers-reduced-motion: no-preference) {
        transition: transform $filter-pill-transition-duration $filter-pill-ease,
                    opacity $filter-pill-transition-duration $filter-pill-ease,
                    width $filter-pill-transition-duration $filter-pill-ease,
                    min-width $filter-pill-transition-duration $filter-pill-ease,
                    margin-right $filter-pill-transition-duration $filter-pill-ease;
    }

    .c-filterPill--selected &,
    .c-filterPill:hover:not(.c-filterPill--disabled) & {
        transform: translate3d(0, 0, 0) scale(1);
        opacity: 1;
        width: $filter-pill-checkbox-width;
        min-width: $filter-pill-checkbox-width;
        margin-right: spacing(b);
    }

    .c-filterPill--selected & path {
        fill: $filter-pill-selected-color;
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
        color: $filter-pill-selected-color;
    }
}
</style>
