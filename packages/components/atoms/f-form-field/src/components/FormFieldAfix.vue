<template>
    <div
        :class="[
            $style['c-formField-field--affixed'],
            $style[`c-formField-field--${fieldSize}`], {
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
                afix: formFieldName ? `formfield-${formFieldName}-afixWrapper` : 'formfield-afixWrapper',
                prefix: formFieldName ? `formfield-${formFieldName}-prefix` : 'formfield-prefix',
                input: formFieldName ? `formfield-${formFieldName}-input` : 'formfield-input',
                suffix: formFieldName ? `formfield-${formFieldName}-suffix` : 'formfield-suffix'
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
    padding: $form-input-padding;
}

.c-formField-field--affixed {
    display: flex;
    width: 100%;

    background-color: $form-input-bg;
    border: $form-input-borderWidth solid $form-input-borderColour;
    border-radius: $form-input-borderRadius;
    background-clip: padding-box;
    padding: 0;

    // border-color: $form-input-borderColour--invalid;
    &:hover {
        background-color: $form-input-bg--hover;
    }

    &:focus,
    &:active,
    &:focus-within {
        box-shadow: $form-input-focus--boxShadow;
    }

    input {
        border: none;
        flex-grow: 1;
        background-color: transparent;
        font-family: $font-family-base;
        @include font-size($form-input-fontSize);
        font-weight: $font-weight-regular;
        color: $form-input-textColour;
        padding: spacing(x1.5) 0;
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
                // opacity: 1; // removes default disabled styling
            }
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
            // opacity: 1; // removes default disabled styling
        }

}

.c-formField--invalid {
    border-color: $form-input-borderColour--invalid;
}
</style>
