<template>
    <card
        card-title="Create Account"
        :data-theme="theme">
        <form
            type="post"
            :class="$style['o-form']"
        >
            <form-field
                data-test-id="input-first-name"
                label-text="First name"
                input-type="text" />

            <form-field
                data-test-id="input-last-name"
                label-text="Last name"
                input-type="text" />

            <form-field
                data-test-id="input-email"
                label-text="Email"
                input-type="email" />

            <form-field
                data-test-id="input-password"
                label-text="Password"
                input-type="password" />

            <form-button
                data-test-id="create-account-submit-button"
                button-style="primary"
                is-full-width>
                Create Account
            </form-button>
        </form>
    </card>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import FormButton from './Button.vue';
import Card from './Card.vue';
import FormField from './FormField.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'Registration',

    components: {
        FormButton,
        Card,
        FormField
    },

    props: {
        locale: {
            type: String,
            default: ''
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
