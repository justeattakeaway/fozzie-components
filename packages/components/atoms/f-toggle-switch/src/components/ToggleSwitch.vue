<template>
    <label
        :for="uniqueId"
        data-test-id="toggle-switch-component"
        :class="$style['c-toggle-switch']">
        <input
            :id="uniqueId"
            role="switch"
            type="checkbox"
            v-bind="$attrs"
            :class="$style['c-toggle-switch-input']"
            :aria-checked="isChecked"
            @change="toggleOption">

        <div :class="$style['c-toggle-switch-control']">
            <check-icon
                v-if="isChecked"
                :class="$style['c-toggle-switch-icon']"
                aria-hidden="true" />
        </div>
    </label>
</template>

<script>
import { CheckIcon } from '@justeattakeaway/pie-icons-vue';
import { v4 as uuid } from 'uuid';

export default {
    name: 'ToggleSwitch',

    components: {
        CheckIcon
    },

    inheritAttrs: false,

    computed: {
        uniqueId () {
            const idArray = ['toggle-switch'];

            if (this.$attrs.name) idArray.push(this.$attrs.name);
            if (this.$attrs.id) idArray.push(this.$attrs.id);

            idArray.push(this.uniqueIdentifierId);
            return idArray.join('-');
        },

        isChecked () {
            return this.$attrs.checked;
        }
    },

    created () {
        this.uniqueIdentifierId = uuid();
    },

    methods: {
        toggleOption (event) {
            this.$emit('update', event.target.checked);
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$toggle-switch-colour:              f.$color-interactive-form;
$toggle-switch-colour--checked:     f.$color-interactive-brand;
$toggle-switch-colour--disabled:    f.$color-disabled-01;
$toggle-switch-width:               48px;
$toggle-switch-height:              24px;
$toggle-switch-control-size:        20px;
$toggle-switch-padding:             2px;
$toggle-switch-radius:              f.$radius-rounded-e;
$toggle-switch-icon-size:           14px;

$toggle-switch-translation: calc($toggle-switch-width - $toggle-switch-control-size - 2 * $toggle-switch-padding);

@mixin toggle-switch-transition ($property) {
    @media (prefers-reduced-motion: no-preference) {
        transition-property: $property;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.9, 1);
        transition-delay: 0s;
    }
}

.c-toggle-switch {
    display: flex;
    @include toggle-switch-transition(background-color);
    width: $toggle-switch-width;
    height: $toggle-switch-height;
    flex-shrink: 0;
    padding: $toggle-switch-padding;
    border-radius: $toggle-switch-radius;
    background-color: $toggle-switch-colour;
    cursor: pointer;

    &:hover {
        background-color: darken($toggle-switch-colour, f.$color-hover-01);
    }

    &:focus,
    &:focus-within {
        background-color: $toggle-switch-colour;
        box-shadow: 0 0 0 2px f.$color-focus-inner, 0 0 0 4px f.$color-focus-outer;
    }

    &:active {
        background-color: darken($toggle-switch-colour, f.$color-active-01);
    }

    &:has(.c-toggle-switch-input:checked) {
        @include toggle-switch-transition(background-color);
        background-color: $toggle-switch-colour--checked;

        &:hover {
            background-color: darken($toggle-switch-colour--checked, f.$color-hover-01);
        }

        &:focus,
        &:focus-within {
            background-color: $toggle-switch-colour--checked;
        }

        &:active {
            background-color: darken($toggle-switch-colour--checked, f.$color-active-01);
        }
    }

    &:has(.c-toggle-switch-input:disabled) {
        background-color: $toggle-switch-colour--disabled;

        cursor: not-allowed;
        pointer-events: none;
    }
}

.c-toggle-switch-input {
    appearance: none;
    margin: 0;
}

.c-toggle-switch-control {
    @include toggle-switch-transition(transform);
    display: flex;
    align-items: center;
    justify-content: center;
    width: $toggle-switch-control-size;
    height: $toggle-switch-control-size;
    border-radius: $toggle-switch-radius;
    background-color: f.$color-content-interactive-light;

    .c-toggle-switch-input:checked + & {
        @include toggle-switch-transition(transform);
        transform: translateX($toggle-switch-translation);
    }

    .c-toggle-switch-input:disabled ~ & {
        path {
            @include toggle-switch-transition(fill);
            fill: $toggle-switch-colour--disabled;
        }
    }
}

[dir="rtl"] {
    .c-toggle-switch-input:checked + .c-toggle-switch-control {
        @include toggle-switch-transition(transform);
        transform: translateX(-$toggle-switch-translation);
    }
}

.c-toggle-switch-icon {
    width: $toggle-switch-icon-size;
    height: $toggle-switch-icon-size;

    path {
        @include toggle-switch-transition(fill);
        fill: $toggle-switch-colour--checked;
    }
}
</style>
