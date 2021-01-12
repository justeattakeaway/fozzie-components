<template>
    <div
        data-test-id='checkoutTerms-and-conditions-component'
        :class="$style['c-checkoutTermsAndConditions']">
        <i18n
            path="checkoutTermsAndConditions">
            <template #termsAndConditions>
                <a :href="$t('termsAndConditionsLinkUrl')">
                    <span>{{ $t('termsAndConditionsLinkText') }}</span>
                </a>
            </template>
            <template #privacyPolicy>
                <a :href="$t('privacyPolicyLinkUrl')">
                    {{ $t('privacyPolicyLinkText') }}
                </a>
            </template>
            <template #cookiePolicy>
                <a :href="$t('cookiePolicyLinkUrl')">
                    <span>{{ $t('cookiePolicyLinkText') }}</span>
                </a>
            </template>
        </i18n>
    </div>
</template>

<style lang="scss" module>
.c-checkoutTermsAndConditions {
    margin-left: -81px;
    margin-bottom: -(spacing(x6));
    margin-top: spacing(x6);
    padding: spacing(x2);
    border-radius: 0 0 $border-radius $border-radius;
    background: $grey--offWhite;
    @include font-size('body-s');
    text-align: center;
    color: $grey--dark;
    font-weight: $font-weight-bold;

    a {
        text-decoration: none;
        font-weight: $font-weight-bold;
        margin-right: none;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
}
</style>
