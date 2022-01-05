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

        <f-button
            button-type="primary"
            button-size="large"
            :class="$style['c-form-submitButton']"
            is-full-width
            action-type="submit"
            data-test-id="submit-button"
            :is-loading="isFormSubmitting">
            {{ formData.buttonText }}
        </f-button>
    </form>
</template>


<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

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
        }
    },

    methods: {
        updateField ({ fieldName, value }) {
            return this.$emit('updated', { fieldName, value });
        },

        onFormSubmit () {
            this.$emit('form-submitting');
        },

        fieldProps (field) {
            return {
                name: field.name,
                value: field.value,
                'label-text': field.translations?.label,
                'input-type': field.inputType,
                'max-length': field.maxLength || null
            };
        }
    }
};
</script>

<style lang="scss" module>
.c-form-form {
    margin-top: spacing(x2);
}

.c-form-submitButton {
    margin: spacing(x4) 0;
}
</style>
