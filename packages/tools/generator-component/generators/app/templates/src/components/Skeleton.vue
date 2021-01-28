<template>
    <div
        :class="$style['c-<%= name.class %>']"
        data-test-id="<%= name.class %>">
        {{ copy.text }}
    </div>
</template>

<script>
<% if (config.needsComponentTranslations) { %>import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
<%
}
if (config.needsTestingApiMocks) { %>import <%= name.filename%>ServiceApi from '../services/<%= name.filename%>ServiceApi';
<%
} %>
export default {
    name: '<%= name.component %>',
    components: {},
    props: {
<% if (config.needsComponentTranslations) { %>        locale: {
            type: String,
            default: ''
        }
<%} %>    },
    data () {
<% if (config.needsComponentTranslations) { %>        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
<%} %>    }
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
