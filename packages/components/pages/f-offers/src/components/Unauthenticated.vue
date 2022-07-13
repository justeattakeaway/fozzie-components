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
                srcset="https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/oi_unauthenticated-image.jpg"
                media="(min-width: 860px)">
            <source
                srcset="https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/oi_unauthenticated-image-tablet.jpg"
                media="(min-width: 600px)">
            <img
                :class="$style['c-unauthenticated-image']"
                srcset="https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/oi_unauthenticated-image-mobile.jpg"
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-unauthenticated-wrapper {
    width: 100%;
}

.c-unauthenticated-buttons {
    margin-top:  f.spacing(d);
    margin-bottom:  f.spacing(f);
}

.c-login-button {
    margin-right:  f.spacing(d);
}

.c-title {
    @include f.font-size(heading-lg);
}

.c-subtitle {
    @include f.font-size(subheading-s);
}

.c-unauthenticated-image {
    width: 100%;
    margin-bottom:  f.spacing(f);
}
</style>
