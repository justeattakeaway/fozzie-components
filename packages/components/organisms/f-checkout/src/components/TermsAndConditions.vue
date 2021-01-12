<template>
    <div
        data-test-id='checkoutTerms-and-conditions-component'
        :class="$style['c-checkoutTermsAndConditions']">
        {{ $t('checkoutTermsAndConditions.text1') }}
        <a :href="$t('checkoutTermsAndConditions.checkoutTermsAndConditionsLinkUrl')">
            <span>{{ $t('checkoutTermsAndConditions.checkoutTermsAndConditionsLinkText') }}</span>
        </a>{{ $t('checkoutTermsAndConditions.text2') }}
        <a :href="$t('checkoutTermsAndConditions.privacyPolicyLinkUrl')">
            {{ $t('checkoutTermsAndConditions.privacyPolicyLinkText') }}
        </a>
        {{ $t('checkoutTermsAndConditions.text3') }}
        <a :href="$t('checkoutTermsAndConditions.cookiePolicyLinkUrl')">
            <span>{{ $t('checkoutTermsAndConditions.cookiePolicyLinkText') }}</span>
        </a>.
    </div>
</template>

<style lang="scss" module>
.c-checkoutTermsAndConditions {
    margin-left: -100px;
    margin-bottom: -(spacing(x5));
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
