<template>
    <component
        :is="element"
        :copy="copy"
        :data-theme="theme"
        :class="$style['c-searchbox']"
        data-test-id='searchbox-component'>
        <search-form
            :config="componentConfig"
            :copy="copy"
            v-on="$listeners" />
    </component>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import SearchForm from './Form.vue';
import SearchShell from './Shell.vue';
// import SearchboxServiceApi from '../services/SearchboxServiceApi';

export default {
    name: 'VueSearchbox',
    components: {
        SearchForm,
        SearchShell
    },
    props: {
        locale: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);
        const componentConfig = { ...localeConfig.component, ...this.config };

        return {
            copy: { ...localeConfig },
            componentConfig,
            theme,
            element: componentConfig.hideShell ? 'search-no-shell' : 'search-shell'
        };
    }
};
</script>

<style lang="scss" module>

.c-searchbox {
    display: block;
}

</style>
