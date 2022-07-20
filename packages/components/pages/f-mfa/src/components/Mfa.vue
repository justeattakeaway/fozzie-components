<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        {{ copy.text }}
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'VMfa',

    components: {},

    props: {
        locale: {
            type: String,
            default: ''
        },
        smartGatewayBaseUrl: {
            type: String,
            required: true
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-mfa {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid red;
    font-family: f.$font-family-base;
    @include f.font-size(heading-m);
}
</style>
