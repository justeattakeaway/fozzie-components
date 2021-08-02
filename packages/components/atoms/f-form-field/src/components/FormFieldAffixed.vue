<template>
    <div
        :class="[
            $style['c-formField-field'],
            $style['c-formField-field--affixedWrapper'],
            $style[`c-formField-affixed-wrapper--${fieldSize}`], {
                [$style['c-formField--invalid']]: hasError
            }
        ]"
        :data-test-id="testId.afix">
        <div
            v-if="prefix"
            :class="[
                $style['c-formField-afix'],{
                    [$style['c-formField--disabled']]: isDisabled,
                    [$style['c-formField--hovered']]: hoverState
                }
            ]"
            :data-test-id="testId.prefix"
            @click="addFocus">
            {{ prefix }}
        </div>

        <input
            :id="$attrs.id"
            ref="input"
            :class="[
                $style['c-formField-field'],
                $style['c-formField-field--affixed'],
                $style[`c-formField-field--${fieldSize}`]
            ]"
            :disabled="attributes.disabled"
            v-bind="attributes"
            :value="value"
            :data-test-id="testId.input"
            @change="updateInput">

        <div
            v-if="suffix"
            :class="[
                $style['c-formField-afix'],{
                    [$style['c-formField--disabled']]: isDisabled,
                    [$style['c-formField--hovered']]: hoverState
                }
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
        },

        hoverState: {
            type: Boolean,
            default: false
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
$form-afix-padding                     : 10px $form-input-padding--side 12px;
$form-afix-padding--small              : 6px $form-input-padding--side 8px;
$form-afix-padding--large              : 14px $form-input-padding--side 16px;

.c-formField-afix {
    height: 100%;
    font-family: $font-family-base;
    @include font-size($form-input-fontSize);
    color: $form-input-secondaryTextColour;
}

.c-formField-field--affixedWrapper {
    display: flex;
}


.c-formField-affixed-wrapper--medium {
    height: $form-input-height;

    .c-formField-afix {
        padding: $form-afix-padding ;
    }
}

.c-formField-affixed-wrapper--small {
    height: $form-input-height--small;

    .c-formField-afix {
        padding: $form-afix-padding--small ;
    }
}

.c-formField-affixed-wrapper--large {
    height: $form-input-height--large;

    .c-formField-afix {
        padding: $form-afix-padding--large;
    }
}

.c-formField-field--affixed {
    background-color: transparent;
    border: none;

    flex-grow: 1;
    height: 100%;

    padding-left: 0;
    padding-right: 0;

    &:focus,
    &:active,
    &:focus-within {
        box-shadow: none;
    }
}

.c-formField--disabled {
    @include disabled-field();
}

.c-formField--hovered {
    background: $form-input-bg--hover;
}
</style>
