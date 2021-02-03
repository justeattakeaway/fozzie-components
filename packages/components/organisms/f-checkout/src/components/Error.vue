<template>
    <card
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        data-test-id="checkout-error-component"
        :class="$style['c-checkout-error']"
    >
        <img
            :src="sadBagSvg"
            alt="">

        <h1
            :class="$style['c-checkout-error-header']">
            {{ $t('errorMessages.pageLoad.heading') }}
        </h1>

        <p
            :class="$style['c-checkout-error-description']">
            {{ $t('errorMessages.pageLoad.description') }}
        </p>
    </card>
</template>

<script>
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

export default {
    components: { Card },
    data () {
        return {
            sadBagSvg: require('../assets/jet-sad-bag.svg') //eslint-disable-line
        };
    }
};
</script>

<style lang="scss" module>
div.c-checkout-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: spacing(x8);
    padding-left: spacing();
    padding-right: spacing();

    @include media('<=narrow') {
        border: none;
        padding-top: spacing(x2);
        padding-bottom: spacing(x2);
    }

    .c-checkout-error-header {
        @include font-size(heading-s);
        margin-top: spacing(x8);
        margin-bottom: 0;
    }

    .c-checkout-error-description {
        @include font-size(body-l);
        margin-top: spacing();
    }
}
</style>
