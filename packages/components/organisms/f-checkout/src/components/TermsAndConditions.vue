<template>
    <div
        data-test-id="checkout-terms-and-conditions-component"
        :class="$style['c-checkoutTermsAndConditions']">
        <i18n path="checkoutTermsAndConditions">
            <template #termsAndConditions>
                <a
                    class="o-link--bold"
                    :href="$t('termsAndConditionsLinkUrl')"
                    target="_blank">
                    <span>{{ $t('termsAndConditionsLinkText') }}</span>
                </a>
            </template>
            <template #privacyPolicy>
                <a
                    class="o-link--bold"
                    :href="$t('privacyPolicyLinkUrl')"
                    target="_blank">
                    <span>{{ $t('privacyPolicyLinkText') }}</span>
                </a>
            </template>
            <template #cookiePolicy>
                <a
                    class="o-link--bold"
                    :href="$t('cookiePolicyLinkUrl')"
                    target="_blank">
                    <span>{{ $t('cookiePolicyLinkText') }}</span>
                </a>
            </template>
        </i18n>
    </div>
</template>

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
