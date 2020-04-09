<template>
    <div
        :data-theme="theme"
        :class="$style['c-registration']">
        I am a Registration Component
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'RegistrationComponent',
    components: {},
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

.c-registration {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width : 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(large);
}

</style>
