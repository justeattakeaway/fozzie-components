<template>
    <div :class="$style['c-loyalty-unauthenticated']">
        <f-card
            :class="$style['c-loyalty-unauthenticated-wrapper']"
            has-outline>
            <img
                :class="$style['c-loyalty-unauthenticated-img']"
                :src="`https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-login-promo-full-colour-${$t('percentage')}.svg `"
                alt="">
            <h3
                data-test-id="unauthenticated-title"
                :class="$style['c-loyalty-unauthenticated-title']">
                {{ $t('unauthenticated.loginTitle') }}
            </h3>
            <f-button
                data-test-id="unauthenticated-button"
                href="/account/login?returnurl=%2Foffers%2Fstamp-cards"
                is-full-width>
                {{ $t('unauthenticated.loginButtonText') }}
            </f-button>
        </f-card>
        <div :class="$style['c-loyalty-terms']">
            <a
                :class="$style['c-loyalty-terms-link']"
                data-test-id="unauthenticated-terms-and-conditions"
                :href="$t('termsUrl')">
                {{ $t('termsText') }}
            </a>
        </div>
    </div>
</template>

<script>
import FCard from '@justeat/f-card';
import FButton from '@justeat/f-button';

export default {
    name: 'Unauthenticated',

    components: {
        FCard,
        FButton
    },

    mounted () {
        // eslint-disable-next-line no-unused-expressions
        window?.trak?.event({
            category: 'engagement',
            action: 'view_stampcards',
            label: 'logged_out'
        });
    }
};
</script>

<style lang="scss" module>
$stampCards-unauthenticated-width: 392px;
$stampCards-unauthenticated-img-dimension: 200px;

.c-loyalty-unauthenticated {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: spacing(f);

    @include media('<=narrowMid') {
        padding: spacing(d);
    }

    @include media('<=tiny') {
        padding: spacing();
    }

}

.c-loyalty-unauthenticated-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: spacing(e);
    width: 100%;
    max-width: $stampCards-unauthenticated-width;
    padding: spacing(g);

    @include media('<=tiny') {
        padding: spacing(d);
    }

}

.c-loyalty-unauthenticated-img {
    width: $stampCards-unauthenticated-img-dimension;
    height: $stampCards-unauthenticated-img-dimension;
}

.c-loyalty-unauthenticated-title {
    @include font-size(heading-s);
    margin-bottom: spacing(e);
}
</style>
