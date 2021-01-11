<template>
    <div data-test-id='terms-and-coniditions-component' :class="$style['c-termsAndConditions']">
            {{ $t('termsAndConditions.text1') }}
            <a :href="$t('termsAndConditions.termsAndConditionsLinkUrl')">
                {{ $t('termsAndConditions.termsAndConditionsLinkText') }}</a>{{ $t('termsAndConditions.text2') }}
            <a :href="$t('termsAndConditions.privacyPolicyLinkUrl')">
                {{ $t('termsAndConditions.privacyPolicyLinkText') }}
            </a>
            {{ $t('termsAndConditions.text3') }}
            <a :href="$t('termsAndConditions.cookiePolicyLinkUrl')">
                <span>{{ $t('termsAndConditions.cookiePolicyLinkText') }}</span>
            </a>.
    </div>
</template>

<script>

export default {
};
</script>

<style lang="scss" module>
.c-termsAndConditions {
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
