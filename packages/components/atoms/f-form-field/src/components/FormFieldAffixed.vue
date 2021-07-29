<template>
    <div
        :class="[
            $style['c-formField-affixed-wrapper'],
            $style[`c-formField-affixed-wrapper--${fieldSize}`], {
                [$style['c-formField--invalid']]: hasError
            }
        ]"
        :data-test-id="testId.afix">
        <div
            v-if="prefix"
            :class="[
                $style['c-formField-afix'],
                $style['c-formField-prefix'],
                { [$style['c-formField--disabled']]: isDisabled }
            ]"
            :data-test-id="testId.prefix"
            @click="addFocus">
            {{ prefix }}
        </div>

        <input
            :id="$attrs.id"
            ref="input"
            :class="$style['c-formField-affixed-field']"
            :disabled="attributes.disabled"
            v-bind="attributes"
            :value="value"
            :data-test-id="testId.input"
            @change="updateInput">

        <div
            v-if="suffix"
            :class="[
                $style['c-formField-afix'],
                $style['c-formField-suffix'],
                { [$style['c-formField--disabled']]: isDisabled }

            ]"
            :data-test-id="testId.suffix"
            @click="addFocus">
            {{ suffix }}
        </div>
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
                afix: formFieldName ? `formfield-${formFieldName}-afix-wrapper` : 'formfield-afix-wrapper',
                prefix: formFieldName ? `formfield-${formFieldName}-afix-prefix` : 'formfield-afix-prefix',
                input: formFieldName ? `formfield-${formFieldName}-afix-input` : 'formfield-afix-input',
                suffix: formFieldName ? `formfield-${formFieldName}-afix-suffix` : 'formfield-afix-suffix'
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

.c-formField-afix {
    height: 100%;
    font-family: $font-family-base;
    @include font-size($form-input-fontSize);
    color: $form-input-secondaryTextColour;
}

.c-formField-affixed-wrapper {
    display: flex;
    width: 100%;

    background-color: $form-input-bg;
    border: $form-input-borderWidth solid $form-input-borderColour;
    border-radius: $form-input-borderRadius;
    background-clip: padding-box;
    padding: 0;

    &:hover {
        background-color: $form-input-bg--hover;
    }

    &:focus,
    &:active,
    &:focus-within {
        box-shadow: $form-input-focus--boxShadow;
    }
}


.c-formField-affixed-wrapper--medium {
    height: $form-input-height;

    .c-formField-afix {
        padding: $form-input-padding;
    }
}

.c-formField-affixed-wrapper--small {
    height: $form-input-height--small;

    .c-formField-afix {
        padding: $form-input-padding--small;
    }
}

.c-formField-affixed-wrapper--large {
    height: $form-input-height--large;

    .c-formField-afix {
        padding: $form-input-padding--large;
    }
}

.c-formField-affixed-field {
    border: none;
    flex-grow: 1;
    background-color: transparent;
    font-family: $font-family-base;
    @include font-size($form-input-fontSize);
    font-weight: $font-weight-regular;
    color: $form-input-textColour;
    height: 100%;

    &:focus,
    &:active,
    &:focus-within {
        outline: none;
    }

    &[disabled] {
    cursor: not-allowed;

        &,
        &:hover {
            background-color: $form-input-bg--disabled;
            color: $form-input-textColour--disabled;
            border-color: $form-input-borderColour--disabled;
        }
    }
}

.c-formField--disabled {
    cursor: not-allowed;

    &,
    &:hover {
        background-color: $form-input-bg--disabled;
        color: $form-input-textColour--disabled;
        border-color: $form-input-borderColour--disabled;
    }
}

.c-formField--invalid {
    border-color: $form-input-borderColour--invalid;
}
</style>
