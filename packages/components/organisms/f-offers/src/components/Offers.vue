<template>
    <div
        :class="$style['c-offers']"
        data-test-id="offers">
        <offers-search-box />
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';
import OffersSearchBox from './SearchBox.vue';
import '@justeat/f-searchbox/dist/f-searchbox.css';

export default {
    name: 'VOffers',

    components: {
        OffersSearchBox
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
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $color-red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
