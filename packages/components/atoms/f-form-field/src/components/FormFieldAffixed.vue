<template>
    <div
        :class="[
            $style['c-formField'],
            $style['c-formField--affixed'],
            $style[`c-formField--affixed--${fieldSize}`], {
                [$style['c-formField--invalid']]: hasError,
                [$style['c-formField--disabled']]: isDisabled
            }
        ]"
        :data-test-id="testId.affixed">
        <input
            :id="$attrs.id"
            ref="input"
            :class="$style['c-formField-field']"
            :disabled="attributes.disabled"
            v-bind="attributes"
            :value="value"
            :data-test-id="testId.input"
            @change="updateInput">

        <span
            v-if="prefix"
            :class="[
                $style['c-formField-affix'],
                $style['c-formField-prefix']
            ]"
            :data-test-id="testId.prefix"
            @click="addFocus">
            {{ prefix }}
        </span>

        <span
            v-if="suffix"
            :class="[
                $style['c-formField-affix'],
                $style['c-formField-suffix']
            ]"
            :data-test-id="testId.suffix"
            @click="addFocus">
            {{ suffix }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'FormAffixedField',

    inheritAttrs: false,

    props: {
        attributes: {
            type: Object,
            default: () => {}
        },

        prefix: {
            type: String,
            default: ''
        },

        suffix: {
            type: String,
            default: ''
        },

        hasError: {
            type: Boolean,
            default: false
        },

        fieldSize: {
            type: String,
            default: 'medium'
        },

        value: {
            type: String,
            default: ''
        }
    },

    computed: {
        testId () {
            const formFieldName = (this.attributes && this.attributes.name ? this.attributes.name : null);

            return {
                affixed: formFieldName ? `formfield-${formFieldName}-affixed` : 'formfield-affixed',
                input: formFieldName ? `formfield-${formFieldName}-affixed-input` : 'formfield-affixed-input',
                prefix: formFieldName ? `formfield-${formFieldName}-affixed-prefix` : 'formfield-affixed-prefix',
                suffix: formFieldName ? `formfield-${formFieldName}-affixed-suffix` : 'formfield-affixed-suffix'
            };
        },

        isDisabled () {
            return this.attributes.disabled;
        }
    },

    methods: {
        addFocus () {
            this.$refs.input.focus();
        },

        updateInput (event) {
            this.$emit('update', event.target.value);
        }
    }
};
</script>

<style lang="scss" module>
$affixed-field-sizes: (
    small:  ($form-input-height--small, $form-input-padding--small),
    medium: ($form-input-height, $form-input-padding),
    large: ($form-input-height--large, $form-input-padding--large),
);

.c-formField--affixed {
    @extend %c-formField-field;
    display: flex;

    .c-formField-field {
        background-color: transparent;
        border: none;

        flex-grow: 1;
        order: 2;
        height: 100%;

        padding-left: 0;
        padding-right: 0;

        &:focus,
        &:active,
        &:focus-within {
            box-shadow: none;
        }
    }
}

// Styling for either the prefix or suffix
.c-formField-affix {
    height: 100%;
    font-family: $font-family-base;
    @include font-size($form-input-fontSize);
    color: $form-input-secondaryTextColour;
}

.c-formField-prefix {
    order: 1;
}
.c-formField-suffix {
    order: 3;
}

@each $size, $properties in $affixed-field-sizes {
    .c-formField--affixed--#{$size} {
        height: nth($properties, 1);

        .c-formField-affix {
            padding: nth($properties, 2);
        }
    }
}

.c-formField--disabled {
    @include disabled-field();
}
</style>
