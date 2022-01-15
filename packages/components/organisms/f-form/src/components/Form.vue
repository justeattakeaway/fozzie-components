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
            v-for="field in formFieldData"
            :key="`${field.name}-field`"
            v-bind="fieldProps(field)"
            :value="field.value"
            :aria-label="field.ariaLabel(field.value)"
            @input="updateField({ name: field.name, value: $event })"
            @blur="field.validationMessages.invalid && formFieldBlur(field.name)">
            <template
                v-if="field.validationMessages && fieldStatus(field.name)"
                #error>
                <error-message
                    v-bind="fieldErrorMessage(field).props"
                    data-js-error-message>
                    {{ fieldErrorMessage(field).text }}
                </error-message>
            </template>
        </form-field>

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
import FormField from '@justeat/f-form-field';
import ErrorMessage from '@justeat/f-error-message';
import FormValidationMixin from '../mixin/formValidation.mixin';
import tenantConfigs from '../tenants';
import { DEFAULT_BUTTON_TEXT, FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../constants';
import FormFieldClass from '../services/formField';

export default {
    components: {
        FButton,
        ErrorMessage,
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

        formFieldData () {
            const formFields = [];

            if (this.formData.formFields?.length) {
                this.formData.formFields.forEach(field => {
                    const fieldData = new FormFieldClass(field);

                    formFields.push({
                        value: field.value,
                        ...fieldData
                    });
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
        updateField ({ name, value }) {
            this.$emit(FORM_EVENTS.fieldUpdated, { name, value });
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

        fieldProps (field) {
            const error = field.validationMessages && this.fieldStatus(field.name);

            return error
                ? field.errorProps(error)
                : field.props;
        },

        fieldErrorMessage (field) {
            return field.errorMessage(this.fieldStatus(field.name));
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
