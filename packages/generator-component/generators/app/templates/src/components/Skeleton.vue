<template>
    <div
        :data-theme="theme"
        :class="$style['c-<%= name.class %>']">
        I am a <%= name.readme %> Component
    </div>
</template>

<script>
import sharedServices from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: '<%= name.component %>',
    components: {},
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = sharedServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = sharedServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};
</script>

<style lang="scss" module>

.c-<%= name.class %> {
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
