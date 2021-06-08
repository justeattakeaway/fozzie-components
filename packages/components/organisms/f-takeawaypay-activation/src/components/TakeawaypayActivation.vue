<template>
    <div
        :class="$style['c-takeawaypayActivation']"
        data-test-id="takeawaypayActivation">
        {{ copy.text }}
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
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

.c-takeawaypayActivation {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
