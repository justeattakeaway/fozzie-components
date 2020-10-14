<template>
    <div
        :data-theme="theme"
        :class="$style['c-<%= name.class %>']"
        data-test-id='<%= name.class %>-component'>
        {{ copy.text }}
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';<% if(needsTestingApiMocks) { %>
import <%= name.filename%>ServiceApi from '../services/<%= name.filename%>ServiceApi';<%}%>

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

.c-<%= name.class %> {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
