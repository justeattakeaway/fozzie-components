<template>
    <label
        :for="uniqueId"
        data-test-id="toggle-component"
        :class="[$style['c-toggle'],
                 {
                     [$style['c-toggle--checked']]: isChecked,
                     [$style['c-toggle--disabled']]: $attrs.disabled,
                     [$style['c-toggle--modeRTL']]: isModeRightToLeft
                 }]">
        <input
            :id="uniqueId"
            role="switch"
            type="checkbox"
            :class="$style['c-toggle-input']"
            :disabled="$attrs.disabled"
            :aria-labelledby="ariaLabelledBy"
            :aria-describedby="ariaDescribedBy"
            :value="value"
            :aria-checked="isChecked"
            @change="toggleOption">

        <div :class="$style['c-toggle-control']">
            <check-icon
                v-if="isChecked"
                :class="$style['c-toggle-icon']"
                aria-hidden />
        </div>
    </label>
</template>

<script>
import { CheckIcon } from '@justeattakeaway/pie-icons-vue';
import { v4 as uuid } from 'uuid';

export default {
    name: 'FToggle',

    components: {
        CheckIcon
    },

    inheritAttrs: false,

    props: {
        value: {
            type: Boolean,
            default: false
        },

        isModeRightToLeft: {
            type: Boolean,
            default: false
        },

        ariaLabelledBy: {
            type: String,
            default: ''
        },

        ariaDescribedBy: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            isChecked: this.value
        };
    },

    computed: {
        uniqueId () {
            const idArray = ['toggle'];

            if (this.$attrs.name) idArray.push(this.$attrs.name);
            if (this.$attrs.id) idArray.push(this.$attrs.id);

            idArray.push(this.uniqueIdentifierId);
            return idArray.join('-');
        }
    },

    created () {
        this.uniqueIdentifierId = uuid();
    },

    methods: {
        toggleOption (event) {
            this.isChecked = event.target.checked;
            this.$emit('update', event.target.checked);
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$toggle-bg--active: darken(f.$color-interactive-form, f.$color-active-01);
$toggle-bg-checked--active: darken(f.$color-content-interactive-brand, f.$color-active-01);
$toggle-bg--hover: darken(f.$color-interactive-form, f.$color-hover-01);
$toggle-bg-checked--hover: darken(f.$color-content-interactive-brand, f.$color-hover-01);

$toggle-width: 48px;
$toggle-height: 24px;
$toggle-control-size: 20px;
$toggle-padding: 2px;
$toggle-radius: f.$radius-rounded-e;
$toggle-icon-size: 12px;

@mixin toggle-transition (
    $properties,
    $easing: cubic-bezier(0.4, 0, 0.9, 1),
    $duration: 0.15s,
    $delay: 0s
) {
    $expression: "";

    @each $property in $properties {
        $expression: $expression + "#{$property} #{$duration} #{$easing} #{$delay}, ";
    }
    transition: #{$expression};
}

.c-toggle {
    display: flex;

    @include toggle-transition(background-color);

    width: $toggle-width;
    height: $toggle-height;
    padding: $toggle-padding;
    border-radius: $toggle-radius;
    background-color: f.$color-interactive-form;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: $toggle-bg--hover;
    }

    &:focus,
    &:focus-within {
        background-color: f.$color-interactive-form;
        box-shadow: 0 0 0 2px f.$color-focus-inner, 0 0 0 4px f.$color-focus-outer;;
    }

    &:active {
        background-color: $toggle-bg--active;
    }
}

.c-toggle-input {
    appearance: none;
    margin: 0;
    /* cursor: pointer; */
}

.c-toggle-control {
    @include toggle-transition(transform);

    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    width: $toggle-control-size;
    height: $toggle-control-size;

    border-radius: $toggle-radius;
    background-color: f.$color-content-interactive-light;
}

.c-toggle-icon {
    display: inline-flex;

    align-items: center;
    justify-content: center;

        /* padding: 4px; */


    width: $toggle-icon-size;
    height: $toggle-icon-size;

    path {
        @include toggle-transition(fill);
        fill: f.$color-content-interactive-brand;
    }
}


.c-toggle--checked {
    @include toggle-transition(background-color);
    background-color: f.$color-content-interactive-brand;

    &:hover {
        background-color: $toggle-bg-checked--hover;
    }

    &:focus,
    &:focus-within {
        background-color: f.$color-content-interactive-brand;
    }

    &:active {
        background-color: $toggle-bg-checked--active;
    }

    .c-toggle-control {
        @include toggle-transition(transform);

        transform: translateX(calc($toggle-width - $toggle-control-size - 2 * $toggle-padding));
    }
}

.c-toggle--modeRTL {
    .c-toggle-control {
        transform: translateX(calc($toggle-width - $toggle-control-size - 2 * $toggle-padding));
    }
}

.c-toggle--modeRTL.c-toggle--checked {
    .c-toggle-control {
        @include toggle-transition(transform);

        transform: translateX(0);
    }
}

.c-toggle--disabled {
    background-color: f.$color-disabled-01;

    cursor: not-allowed;
    pointer-events: none;

    .c-toggle-input {
        background-color: f.$color-content-interactive-light;

        cursor: default;
    }

    .c-toggle-icon {
        path {
            @include toggle-transition(fill);

            fill: f.$color-disabled-01;
        }
    }
}
</style>
