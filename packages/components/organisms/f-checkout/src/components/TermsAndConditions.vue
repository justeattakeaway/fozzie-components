<template>
    <div
        data-test-id="checkout-terms-and-conditions-component"
        :class="$style['c-checkoutTermsAndConditions']">
        <i18n
            path="checkoutTermsAndConditions">
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
    width: Calc($checkout-width - 2px); // -2px for border width
    background: $color-background-default;
    margin-left: -(spacing(x10));
    margin-bottom: -(spacing(x6));
    margin-top: spacing(x6);
    border-radius: 0 0 $border-radius $border-radius;
    padding: spacing(x2);
    @include font-size('body-s');
    text-align: center;
    color: $color-grey-50;
    font-weight: $font-weight-bold;

    a {
        margin-right: none;
    }

    @include media('<narrow') {
        width: 100vw;
        margin-left: -(spacing(x5)); // removes the margin of f-card
        padding: spacing(x2) spacing(x5);
    }
}
</style>
