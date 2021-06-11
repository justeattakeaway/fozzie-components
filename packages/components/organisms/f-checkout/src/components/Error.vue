<template>
    <card
        is-rounded
        has-outline
        is-page-content-wrapper
        card-heading-position="center"
        data-test-id="checkout-error-page-component"
        :class="[$style['c-checkout-error'], $style['c-checkout-error--verticalPadding']]">
        <!-- TODO: Load image from CDN in future -->
        <sad-bag-icon-decorator
            data-test-id="checkout-error-page-image" />

        <h1
            :class="$style['c-checkout-error-heading']"
            data-test-id="checkout-error-page-heading">
            {{ $t(`errorMessages.${errorFormType}.heading`) }}
        </h1>

        <p
            :class="$style['c-checkout-error-description']"
            data-test-id="checkout-error-page-description">
            {{ $t(`errorMessages.${errorFormType}.description`) }}
        </p>

        <f-button
            :class="$style['c-checkout-error-button']"
            button-size="large"
            button-type="primary"
            is-full-width
            data-test-id="error-page-redirect-to-menu-button"
            @click.native="redirectToMenu">
            {{ $t(`errorMessages.${errorFormType}.buttonText`) }}
        </f-button>
    </card>
</template>

<script>
import Card from '@justeat/f-card';
import FButton from '@justeat/f-button';
import SadBagIconDecorator from '../assets/images/jet-sad-bag.svg';
import '@justeat/f-button/dist/f-button.css';
import '@justeat/f-card/dist/f-card.css';

export default {
    components: {
        Card,
        FButton,
        SadBagIconDecorator
    },
    props: {
        errorFormType: {
            type: String,
            required: true
        },
        restaurantMenuPageUrl: {
            type: String,
            default: ''
        }
    },

    methods: {
        redirectToMenu () {
            window.location.assign(this.restaurantMenuPageUrl);
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

    .c-checkout-error-button {
        margin: spacing(x4) 0 spacing(x0.5);
    }
}
</style>
