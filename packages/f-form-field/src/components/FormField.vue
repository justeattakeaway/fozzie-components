<template>
    <div
        :data-theme-formfield="theme"
        :class="$style['c-formField']">
        <form-label
            v-if="normalisedLabelStyle === 'default'"
            :label-style="normalisedLabelStyle">
            {{ labelText }}
        </form-label>
        <input
            id="formfield"
            :type="normalisedInputType"
            placeholder=" "
            :class="[$style['o-form-field'], $style['c-formField-input']]"
        >
        <form-label
            v-if="normalisedLabelStyle === 'inline'"
            :label-style="normalisedLabelStyle">
            {{ labelText }}
        </form-label>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import FormLabel from './FormLabel.vue';
import tenantConfigs from '../tenants';
import { VALID_INPUT_TYPES, DEFAULT_INPUT_TYPE, VALID_LABEL_STYLES } from '../constants';

export default {
    name: 'FormField',
    components: {
        FormLabel
    },
    props: {
        locale: {
            type: String,
            default: ''
        },
        labelText: {
            type: String,
            default: ''
        },
        inputType: {
            type: String,
            default: DEFAULT_INPUT_TYPE,
            validator: value => (VALID_INPUT_TYPES.indexOf(value) !== -1) // The prop value must match one of the valid input types
        },
        labelStyle: {
            type: String,
            default: 'default',
            validator: value => (VALID_LABEL_STYLES.indexOf(value) !== -1) // The prop value must match one of the valid input types
        }
    },
    computed: {
        normalisedInputType () {
            if (VALID_INPUT_TYPES.includes(this.inputType)) {
                return this.inputType;
            }
            return DEFAULT_INPUT_TYPE;
        },
        normalisedLabelStyle () {
            if (VALID_LABEL_STYLES.includes(this.labelStyle)) {
                return this.labelStyle;
            }
            return '';
        },
        formFieldLocale () {
            return globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        },
        copy () {
            const localeConfig = tenantConfigs[this.formFieldLocale];
            return { ...localeConfig };
        },
        theme () {
            return globalisationServices.getTheme(this.formFieldLocale);
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

.c-formField {
    position: relative;

    & + & {
        margin-top: spacing(x2);
    }
}

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
    }

</style>
