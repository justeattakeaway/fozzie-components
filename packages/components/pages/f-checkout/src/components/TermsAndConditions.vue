<template>
    <div
        data-test-id="checkout-terms-and-conditions-component"
        :class="$style['c-checkoutTermsAndConditions']">
        <i18n path="checkoutTermsAndConditions">
            <template #termsAndConditions>
                <v-link
                    is-bold
                    is-distinct
                    :href="$t('termsAndConditionsLinkUrl')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('termsAndConditionsLinkText') }}
                </v-link>
            </template>
            <template #privacyPolicy>
                <v-link
                    is-bold
                    is-distinct
                    :href="$t('privacyPolicyLinkUrl')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('privacyPolicyLinkText') }}
                </v-link>
            </template>
            <template #cookiePolicy>
                <v-link
                    is-bold
                    is-distinct
                    :href="$t('cookiePolicyLinkUrl')"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('cookiePolicyLinkText') }}
                </v-link>
            </template>
        </i18n>
    </div>
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
