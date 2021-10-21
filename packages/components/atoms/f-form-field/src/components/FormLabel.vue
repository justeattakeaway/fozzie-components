<template>
    <label
        v-if="hasLabelText"
        :id="`label-${labelFor}`"
        :for="labelFor"
        :class="[
            $style['o-form-label'],
            $style['c-formField-label'], {
                [$style['c-formField-label--disabled']]: isDisabled
            }
        ]">
        <span
            v-if="labelDetails"
            :data-test-id="testId.details"
            :class="$style['c-formField-label-details']">
            {{ labelDetails }}
        </span>

        <slot />

        <span
            v-if="labelDescription"
            :data-test-id="testId.description"
            :class="[
                'u-spacingTop',
                'u-spacingBottom--large',
                $style['c-formField-label-description']
            ]">
            {{ labelDescription }}
        </span>
    </label>
</template>

<script>
export default {
    name: 'FormLabel',
    components: {},
    props: {
        attributes: {
            type: Object,
            default: () => {}
        },
        labelFor: {
            type: String,
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        labelDetails: {
            type: String,
            default: null
        },
        labelDescription: {
            type: String,
            default: null
        }
    },
    computed: {
        hasLabelText () {
            return this.$slots.default && !!this.$slots.default[0].text.length;
        },

        testId () {
            const formFieldName = (this.attributes && this.attributes.name ? this.attributes.name : null);

            return {
                details: formFieldName ? `formfield-${formFieldName}-label-details` : 'formfield-label-details',
                description: formFieldName ? `formfield-${formFieldName}-label-description` : 'formfield-label-description'
            };
        }
    }
};
</script>

<style lang="scss" module>

$form-label-colour              : $color-content-default; // Text colour of form labels
$form-label-fontSize            : 'body-s';
$form-label-weight              : $font-weight-bold;

.c-formField-label {
    display: block;
    color: $form-label-colour;
    @include font-size($form-label-fontSize);
    font-weight: $form-label-weight;
    margin-bottom: spacing();
}

.c-formField-label--disabled {
    color: $color-content-disabled;
    pointer-events: none;
}

.c-formField-label-details,
.c-formField-label-description {
    font-weight: $font-weight-regular;
    color: $form-input-secondaryTextColour;
}

.c-formField-label-details {
    position: absolute;
    right: 0;
}

.c-formField-label-description {
    display: block;
}
</style>
