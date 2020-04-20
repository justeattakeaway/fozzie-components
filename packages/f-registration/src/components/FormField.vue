<template>
    <div class="c-formField">
        <label
            v-if="labelText"
            :class="$style['o-form-label', 'c-formField-label']">{{ labelText }}</label>
        <input
            :type="inputType"
            :class="$style['o-form-field', 'c-formField-input']"
        >
    </div>
</template>

<script>
export default {
    name: 'FormField',

    props: {
        labelText: {
            type: String,
            default: ''
        },
        inputType: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>
    $form-input-colour                        : $grey--dark;
    $form-input-bg                            : $white;
    $form-input-borderRadius                  : 3px;
    $form-input-borderWidth                   : 1px;
    $form-input-borderColour                  : $grey--lightest;
    $form-input-borderColour--focus           : $grey--dark;

    .c-formField-input {
        width: 100%;
        height: 2.5rem;
        padding: 0.5rem;
        @include font-size();
        font-family: $font-family-base;
        color: $form-input-colour;
        font-weight: $font-weight-base;
        background-color: $form-input-bg;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        background-clip: padding-box;

        &:focus {
            border-color: $form-input-borderColour--focus;
            outline: none;
        }
    }
</style>
