<template>
    <i18n
        tag="div"
        path="checkoutTermsAndConditions"
        data-test-id="checkout-terms-and-conditions-component"
        :class="$style['c-checkoutTermsAndConditions']">
        <v-link
            is-bold
            is-distinct
            :href="$t('termsAndConditionsLinkUrl')"
            target="_blank"
            rel="noopener noreferrer">
            {{ $t('termsAndConditionsLinkText') }}
        </v-link>
        <v-link
            is-bold
            is-distinct
            :href="$t('privacyPolicyLinkUrl')"
            target="_blank"
            rel="noopener noreferrer">
            {{ $t('privacyPolicyLinkText') }}
        </v-link>
        <v-link
            is-bold
            is-distinct
            :href="$t('cookiePolicyLinkUrl')"
            target="_blank"
            rel="noopener noreferrer">
            {{ $t('cookiePolicyLinkText') }}
        </v-link>
    </i18n>
</template>

<script>
import VLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

export default {
    components: {
        VLink
    }
};
</script>


<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-checkoutTermsAndConditions {
    background: f.$color-background-default;
    margin-top: f.spacing(g);
    padding: f.spacing(e);
    @include f.font-size('body-s');
    text-align: center;
    color: f.$color-grey-50;

    @include f.media('>=narrow') {
        padding: f.spacing(d) f.spacing(g);
        margin-top: 0;
    }
}
</style>
