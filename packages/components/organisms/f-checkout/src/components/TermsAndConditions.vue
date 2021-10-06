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
                    target="_blank">
                    {{ $t('termsAndConditionsLinkText') }}
                </v-link>
            </template>
            <template #privacyPolicy>
                <v-link
                    is-bold
                    is-distinct
                    :href="$t('privacyPolicyLinkUrl')"
                    target="_blank">
                    {{ $t('privacyPolicyLinkText') }}
                </v-link>
            </template>
            <template #cookiePolicy>
                <v-link
                    is-bold
                    is-distinct
                    :href="$t('cookiePolicyLinkUrl')"
                    target="_blank">
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
    margin-top: spacing(x5);
    padding: spacing(x3);
    @include font-size('body-s');
    text-align: center;
    color: $color-grey-50;

    @include media('>=narrow') {
        padding: spacing(x2) spacing(x5);
        margin-top: 0;
    }
}
</style>
