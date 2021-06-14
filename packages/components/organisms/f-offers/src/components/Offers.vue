<template>
    <div
        :class="$style['c-offers']"
        data-test-id="offers">
        <no-results />
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import NoResults from './NoResults.vue';
import '@justeat/f-searchbox/dist/f-searchbox.css';

export default {
    name: 'VOffers',
    components: {
        NoResults
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

        return {
            copy: { ...localeConfig }
        };
    }
};
</script>

<style lang="scss" module>

.c-offers {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}

</style>
