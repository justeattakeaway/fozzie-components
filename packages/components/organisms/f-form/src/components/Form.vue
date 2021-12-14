<template>
    <form
        method="post"
        :class="$style['c-form']"
        data-test-id="form-component"
        @submit.prevent="onFormSubmit">
        <form-field
            v-for="field in formData.formFields"
            :key="`${field.name}-field`"
            v-bind="fieldProps(field)"
            @input="updateField({ fieldName: field.name, value: $event })" />

        <slot />

        <f-button
            button-type="primary"
            button-size="large"
            :class="$style['c-form-submitButton']"
            is-full-width
            action-type="submit"
            data-test-id="submit-button"
            :is-loading="isFormSubmitting">
            {{ buttonText }}
        </f-button>
    </form>
</template>


<script>
import FButton from '@justeat/f-button';
import FormField from '@justeat/f-form-field';
import { globalisationServices } from '@justeat/f-services';
import VueScrollTo from 'vue-scrollto';
import tenantConfigs from '../tenants';
import { DEFAULT_BUTTON_TEXT, FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../constants';

export default {
    components: {
        FButton,
        FormField
    },

    props: {
        formData: {
            type: Object,
            required: true
        },

        locale: {
            type: String,
            default: 'en-GB'
        },

        isFormSubmitting: {
            type: Boolean,
            default: false
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
    },

    computed: {
        formFields () {
            const formFields = {};

            this.formData.formFields.forEach(field => {
                formFields[field.name] = field.value;
            });

            return formFields;
        },

        buttonText () {
            return this.formData.buttonText || DEFAULT_BUTTON_TEXT;
        }
    },

    watch: {
        $props: {
            immediate: true,
            handler () {
                this.formDataValidator();
            }
        }
    },

    methods: {
        updateField ({ fieldName, value }) {
            return this.$emit(FORM_EVENTS.fieldUpdated, { fieldName, value });
        },

        onFormSubmit () {
            this.$emit(FORM_EVENTS.submitting);
        },

        fieldProps (field) {
            return {
                name: field.name,
                value: field.value || '',
                'label-text': field.translations?.label
            };
        },

        translations (field) {
            return this.formData.formFields[field].translations;
        },

        hasValidationMessages (field) {
            return !!this.translations(field)?.validationMessages;
        },


        hasInvalidErrorMessage (field) {
            return !!this.translations(field)?.validationMessages?.invalid;
        },

        scrollToFirstInlineError () {
            this.$nextTick(() => {
                const scrollingDurationInMilliseconds = 650;
                const firstInlineError = document.querySelector('[data-js-error-message]');
                if (firstInlineError) {
                    VueScrollTo.scrollTo(firstInlineError, scrollingDurationInMilliseconds, { offset: -100 });
                }
            });
        },

        formDataValidator () {
            if (!this.formData.formFields) {
                throw new TypeError(PROP_VALIDATION_MESSAGES.requiredFormFields);
            }
            if (!Array.isArray(this.formData.formFields)) {
                throw new TypeError(PROP_VALIDATION_MESSAGES.invalidFormFields);
            }

            this.formData.formFields.forEach(field => {
                if (!field.name) {
                    throw new TypeError(PROP_VALIDATION_MESSAGES.requiredNameProperty);
                }
                if (!field.translations) {
                    throw new TypeError(PROP_VALIDATION_MESSAGES.requiredTranslationsProperty);
                }
                if (!field.translations.label) {
                    throw new TypeError(PROP_VALIDATION_MESSAGES.requiredLabelProperty);
                }
            });
        }
    }
};
</script>

<style lang="scss" module>
.c-form {
    margin-top: spacing(x2);
}

.c-form-submitButton {
    margin: spacing(x4) 0;
}
</style>
