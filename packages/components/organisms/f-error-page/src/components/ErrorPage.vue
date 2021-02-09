<template>
    <div
        :class="$style['c-errorPage']"
        data-test-id="errorPage">
        {{ copy.text }}
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
/* eslint-disable */
//import ErrorPageServiceApi from '../services/ErrorPageServiceApi';

export default {
    name: 'ErrorPage',
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

        return {
            copy: { ...localeConfig }
        };
    }
};
</script>

<style lang="scss" module>

.c-errorPage {
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
