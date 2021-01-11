<template>
    <div data-test-id='terms-and-coniditions-component' :class="$style['c-termsAndConditions']">
        {{ $t('termsAndConditions.text1') }}
        <a :href="$t('termsAndConditions.termsAndConditionsLinkUrl')">
            {{ $t('termsAndConditions.termsAndConditionsLinkText') }}
        </a>
        {{ $t('termsAndConditions.text2') }}
        <a :href="$t('termsAndConditions.privacyPolicyLinkUrl')">
            {{ $t('termsAndConditions.privacyPolicyLinkText') }}
        </a>
        {{ $t('termsAndConditions.text3') }}
        <a :href="$t('termsAndConditions.cookiePolicyLinkUrl')">
            {{ $t('termsAndConditions.cookiePolicyLinkText') }}
        </a>
    </div>
</template>

<script>

export default {
};
</script>

<style lang="scss" module>
.c-termsAndConditions {
    position: absolute;
    bottom: 1px;
    margin-left: -(spacing(x10));
    background: $grey--offWhite;
    @include font-size('body-s');
    padding: spacing(x2);
    text-align: center;
    border-radius: 0 0 $border-radius $border-radius;
    color: $grey--dark;
    font-weight: $font-weight-bold;
}
</style>

