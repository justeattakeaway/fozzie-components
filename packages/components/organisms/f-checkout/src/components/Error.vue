<template>
    <card
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        data-test-id="checkout-error-page-component"
        :class="[$style['c-checkout-error'], $style['c-checkout-error--verticalPadding']]"
    >
        <!-- TODO: Load image from CDN in future -->
        <sad-bag-icon-decorator
            data-test-id="checkout-error-page-image" />

        <h1
            :class="$style['c-checkout-error-heading']"
            data-test-id="checkout-error-page-heading">
            {{ header }}
        </h1>

        <p
            :class="$style['c-checkout-error-description']"
            data-test-id="checkout-error-page-description">
            {{ description }}
        </p>
    </card>
</template>

<script>
import Card from '@justeat/f-card';
import SadBagIconDecorator from '../assets/images/jet-sad-bag.svg';
import '@justeat/f-card/dist/f-card.css';

export default {
    components: {
        Card,
        SadBagIconDecorator
    },
    props: {
        header: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &.c-checkout-error--verticalPadding {
        @include media('<=narrow') {
            border: none;
            padding-top: spacing(x2);
            padding-bottom: spacing(x2);
        }
    }

    .c-checkout-error-heading {
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
