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
.c-checkoutTermsAndConditions {
    background: $color-background-default;
    margin-top: spacing(g);
    padding: spacing(e);
    @include font-size('body-s');
    text-align: center;
    color: $color-grey-50;

    @include media('>=narrow') {
        padding: spacing(d) spacing(g);
        margin-top: 0;
    }
}
</style>
