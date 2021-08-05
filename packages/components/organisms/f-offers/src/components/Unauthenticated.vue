<template>
    <div
        :class="$style['c-unauthenticated-wrapper']"
        data-test-id="OffersInbox-Content">
        <h2 :class="$style['c-title']">
            {{ $t('unauthenticated.title') }}
        </h2>
        <p :class="$style['c-subtitle']">
            {{ $t('unauthenticated.subtitle') }}
        </p>
        <div :class="$style['c-unauthenticated-buttons']">
            <f-button
                :class="$style['c-login-button']"
                href="/account/login?returnurl=%2Foffers">
                {{ $t('unauthenticated.loginButton') }}
            </f-button>
            <f-button
                :class="$style['c-signup-button']"
                button-type="secondary"
                href="/account/register?ReturnUrl=%2Foffers">
                {{ $t('unauthenticated.signUpButton') }}
            </f-button>
        </div>
        <picture>
            <source
                srcset="https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/oi_unauthenticated-image.jpg"
                media="(min-width: 860px)">
            <source
                srcset="https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/oi_unauthenticated-image-tablet.jpg"
                media="(min-width: 600px)">
            <img
                :class="$style['c-unauthenticated-image']"
                srcset="https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/oi_unauthenticated-image-mobile.jpg"
                alt="">
        </picture>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';

export default {
    name: 'OffersInboxUnauthenticated',
    components: {
        FButton
    }
};
</script>

<style lang="scss" module>
.c-unauthenticated-wrapper {
    width: 100%;
}

.c-unauthenticated-buttons {
    margin-top: spacing(x2);
    margin-bottom: spacing(x4);
}

.c-login-button {
    margin-right: spacing(x2);
}

.c-title {
    @include font-size(heading-lg);
}

.c-subtitle {
    @include font-size(subheading-s);
}

.c-unauthenticated-image {
    width: 100%;
    margin-bottom: spacing(x4);
}

</style>
