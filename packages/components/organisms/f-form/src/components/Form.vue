<template>
    <form
        method="post"
        :class="$style['c-form']"
        data-test-id="form-component"
        @submit.prevent="onFormSubmit">
        <section
            v-if="invalidFieldsSummary"
            class="is-visuallyHidden"
            role="alert"
            data-test-id="error-summary-container">
            {{ invalidFieldsSummary }}
        </section>

        <form-field
            v-for="field in formData.formFields"
            :key="`${field.name}-field`"
            :field-data="field"
            @updated="updateField" />

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
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import VueScrollTo from 'vue-scrollto';
import FButton from '@justeat/f-button';
import FormValidationMixin from '../mixin/formValidation.mixin';
import FormField from './FormField.vue';
import tenantConfigs from '../tenants';
import { DEFAULT_BUTTON_TEXT, FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../constants';

export default {
    components: {
        FButton,
        FormField
    },

    mixins: [
        FormValidationMixin,
        VueGlobalisationMixin
    ],

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
        return {
            tenantConfigs
        };
    },

    computed: {
        formFields () {
            const formFields = {};

            if (this.formData.formFields?.length) {
                this.formData.formFields.forEach(field => {
                    formFields[field.name] = field.value;
                });
            }

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

    created () {
        this.createValidations(this.formData.formFields);
    },

    methods: {
        updateField ({ fieldName, value }) {
            this.$emit(FORM_EVENTS.fieldUpdated, { fieldName, value });

            this.createValidations(this.formData.formFields);
        },

        onFormSubmit () {
            this.$emit(FORM_EVENTS.submitting);

            if (this.isFormValid()) {
                this.$emit(FORM_EVENTS.valid, this.formFields);
            } else {
                this.scrollToFirstInlineError();
                this.$emit(FORM_EVENTS.invalid, this.validationState);
            }
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
