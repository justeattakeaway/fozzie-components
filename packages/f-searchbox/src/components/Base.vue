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
            :service="service"
            v-on="$listeners" />
    </component>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import SearchForm from './Form.vue';
import SearchShell from './shells/Shell.vue';
import NoSearchShell from './shells/NoShell.vue';
import Service from '../services/core';

export default {
    name: 'VueSearchbox',
    components: {
        SearchForm,
        SearchShell,
        NoSearchShell
    },
    props: {
        locale: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: () => {}
        },
        dependentApiPromise: {
            type: Object,
            default: () => {}
        },
        copyOverride: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);
        const componentConfig = { ...localeConfig.component, ...this.config };
        const service = Service(localeConfig.service);

        return {
            copy: {
                ...localeConfig.copy,
                ...this.copyOverride
            },
            componentConfig,
            componentLocale: locale,
            theme,
            service,
            element: componentConfig.isShellHidden ? 'no-search-shell' : 'search-shell'
        };
    },

    /**
     * The `dependentApiPromise` is a promise object that is injected via an option (prop) in the standalone builds.
     * The `clientInit` is the google api initializer which relies on the `service` containing `autocomplete` set to true.
     *
     */
    beforeMount () {
        this.service.clientInit(this.dependentApiPromise);
    }
};
</script>

<style lang="scss" module>

.c-searchbox {
    display: block;
}

</style>
