<template>
    <card
        :data-theme-registration="theme"
        :card-heading="title"
        is-rounded
        has-outline
        is-page-content-wrapper>
        <form
            type="post"
            :class="$style['o-form']"
        >
            <form-field
                data-test-id="input-first-name"
                label-text="First name"
                input-type="text"
                label-style="inline" />


            <form-field
                data-test-id="input-last-name"
                label-text="Last name"
                input-type="text"
                label-style="inline" />

            <form-field
                data-test-id="input-email"
                label-text="Email"
                input-type="email"
                label-style="inline" />

            <form-field
                data-test-id="input-password"
                label-text="Password"
                input-type="password"
                label-style="inline" />

            <form-button
                data-test-id="create-account-submit-button"
                button-style="primary"
                is-full-width>
                {{ buttonText }}
            </form-button>
        </form>
    </card>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FormButton from './Button.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'Registration',

    components: {
        Card,
        FormButton,
        FormField
    },

    props: {
        locale: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Create Account'
        },
        buttonText: {
            type: String,
            default: 'Create Account'
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};
</script>

<style lang="scss" module>

// Form styling

.o-form {
    @include font-size(base--scaleUp);
}

</style>
