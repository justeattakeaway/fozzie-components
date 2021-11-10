<template>
    <card-component
        has-outline
        is-page-content-wrapper
        data-test-id="cardWithContent"
        :class="$style['c-cardWithContent']">
        <div
            v-if="$slots.icon"
            :class="$style['c-cardWithContent-icon']">
            <slot name="icon" />
        </div>

        <h1
            v-if="cardHeading"
            :class="$style['c-cardWithContent-heading']">
            {{ cardHeading }}
        </h1>

        <p
            v-if="cardDescription"
            :class="$style['c-cardWithContent-description']">
            {{ cardDescription }}
        </p>

        <f-button
            v-if="primaryButtonText"
            button-size="large"
            button-type="primary"
            is-full-width
            :class="$style['c-cardWithContent-button']"
            @click.native="$emit('primary-button-click')">
            {{ primaryButtonText }}
        </f-button>

        <f-button
            v-if="secondaryButtonText"
            button-size="large"
            button-type="secondary"
            is-full-width
            :class="$style['c-cardWithContent-button']"
            @click.native="$emit('secondary-button-click')">
            {{ secondaryButtonText }}
        </f-button>
    </card-component>
</template>

<script>
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

export default {
    name: 'CardWithContent',
    components: {
        CardComponent,
        FButton
    },
    props: {
        cardHeading: {
            type: String,
            default: ''
        },
        cardDescription: {
            type: String,
            default: ''
        },
        primaryButtonText: {
            type: String,
            default: ''
        },
        secondaryButtonText: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>
.c-cardWithContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.c-cardWithContent-heading {
    margin-bottom: 0;
    @include font-size('heading-l', true, 'narrow');

    @include media('>=wide') {
        @include font-size('heading-l', true, 'default');
    }
}

.c-cardWithContent-description {
    @include font-size('body-l');
    margin-top: spacing();
}

.c-cardWithContent-button {
    margin: spacing(x4) 0 spacing(x0.5);
}

.c-cardWithContent-icon {
    margin: auto;
    margin-bottom: spacing(x4);
    width: 200px;
}
</style>
