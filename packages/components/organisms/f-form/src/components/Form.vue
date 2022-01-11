<template>
    <form
        method="post"
        :class="$style['c-form']"
        data-test-id="form-component"
        @submit.prevent="onFormSubmit">
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
import { validationMixin } from 'vuelidate';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import {
    required, email
} from 'vuelidate/lib/validators';
import FButton from '@justeat/f-button';
import { validations } from '@justeat/f-services';
import VueScrollTo from 'vue-scrollto';
import FormField from './FormField.vue';
import tenantConfigs from '../tenants';
import { DEFAULT_BUTTON_TEXT, FORM_EVENTS, PROP_VALIDATION_MESSAGES } from '../constants';

export default {
    components: {
        FButton,
        FormField
    },

    mixins: [
        validationMixin,
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

        invalidFieldsSummary () {
            const invalidFieldCount = this.$v.formFields.$dirty
                && validations.getFormValidationState(this.$v.formFields).invalidFields.length;

            if (!invalidFieldCount) return null;

            return this.$tc('invalidFields', invalidFieldCount);
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
        isFormValid () {
            this.$v.$touch();

            return !this.$v.$invalid;
        },

        updateField ({ fieldName, value }) {
            return this.$emit(FORM_EVENTS.fieldUpdated, { fieldName, value });
        },

        onFormSubmit () {
            this.$emit(FORM_EVENTS.submitting);

            if (this.isFormValid()) {
                this.$emit('form-valid', this.formFields);
            } else {
                const validationState = validations.getFormValidationState(this.$v);
                this.scrollToFirstInlineError();

                this.$emit('form-invalid', validationState);
            }
        },

        isValidPhoneNumber () {
            const phoneNumberValue = this.formData.formFields.find(field => field.name === 'mobileNumber');

            return phoneNumberValue && validations.isValidPhoneNumber(phoneNumberValue.value, this.locale);
        },

        isValidPostcode () {
            const postcodeValue = this.formData.formFields.find(field => field.name === 'postcode');

            return postcodeValue && validations.isValidPostcode(postcodeValue.value, this.locale);
        },

        translations (field) {
            const formField = this.formData.formFields.find(fieldData => fieldData.name === field);

            return formField?.translations;
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
    },

    validations () {
        const validationProperties = { formFields: {} };

        const invalidValidations = {
            email,
            mobileNumber: this.isValidPhoneNumber,
            postcode: this.isValidPostcode
        };

        Object.keys(this.formFields).forEach(field => {
            if (this.hasValidationMessages(field)) {
                validationProperties.formFields[field] = {
                    required
                };

                if (this.hasInvalidErrorMessage(field)) {
                    validationProperties.formFields[field] = {
                        ...validationProperties.formFields[field],
                        [field]: invalidValidations[field]
                    };
                }
            }
        });

        return validationProperties;
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
