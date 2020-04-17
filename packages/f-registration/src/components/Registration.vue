<template>
    <card
        card-title="Create Account"
    >
        <form
            type="post"
            :class="$style['o-form']"
        >
            <form-field
                label-text="First name"
                input-type="text" />

            <form-field
                label-text="Last name"
                input-type="text" />

            <form-field
                label-text="Email"
                input-type="email" />

            <form-field
                label-text="Password"
                input-type="password" />

            <form-button
                button-text="Create Account"
                button-type="primary"
                :is-full-width="true" />
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
