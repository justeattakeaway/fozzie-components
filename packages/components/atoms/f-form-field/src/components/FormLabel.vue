<template>
    <label
        v-if="hasLabelText"
        :class="[
            $style['o-form-label'],
            $style['c-formField-label'],
            (isInline ? $style['c-formField-label--inline'] : '')
        ]">
        <slot />
    </label>
</template>

<script>
import { VALID_LABEL_STYLES } from '../constants';

export default {
    name: 'FormLabel',
    components: {},
    props: {
        labelStyle: {
            type: String,
            default: 'default',
            validator: value => (VALID_LABEL_STYLES.indexOf(value) !== -1)
        },
        isInline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasLabelText () {
            return this.$slots.default && !!this.$slots.default[0].text.length;
        }
    }
};
</script>

<style lang="scss" module>

$form-label-colour              : $grey--darkest; // Text colour of form labels
$form-label-fontSize            : 'body-s';
$form-label-weight              : $font-weight-bold;

$form-inlineLabel-padding       : spacing(x1.5) spacing(x2);
$form-inlineLabel-colour        : $grey--dark;
$form-inlineLabel-fontSize      : 'body-l';
$form-inlineLabel-weight        : $font-weight-base;


.c-formField-label {
    display: block;
    color: $form-label-colour;
    @include font-size($form-label-fontSize);
    font-weight: $form-label-weight;
    margin-bottom: spacing();
}

.c-formField-label--inline {
    position: absolute;
    top: 50%;
    left: 1px;  // Adds pixel to match `FormField` border
    padding: $form-inlineLabel-padding;
    margin-bottom: 0;
    transform: translateY(-50%);

    @include font-size($form-inlineLabel-fontSize);
    font-weight: $form-inlineLabel-weight;
    color: $form-inlineLabel-colour;
    cursor: text; // make the cursor the same as the default input hover cursor
}

input {
    &:focus {
        // select the .c-formField-label--inline element if it's preceded by an input
        & + .c-formField-label--inline {
            opacity: 0;
            z-index: -1;
        }
    }

    // select the .c-formField-label--inline element
    // if it's preceded by an input whose placeholder isn't being shown (i.e. the input has a value)
    &:not(:placeholder-shown) + .c-formField-label--inline {
        opacity: 0;
        z-index: -1;
    }
}

</style>
