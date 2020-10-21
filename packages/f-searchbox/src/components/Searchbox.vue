<template>
    <div
        :data-theme="theme"
        :class="$style['c-searchbox']"
        data-test-id='searchbox-component'>
        {{ copy.text }}
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
// import SearchboxServiceApi from '../services/SearchboxServiceApi';

export default {
    name: 'VueSearchbox',
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

.c-searchbox {
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
