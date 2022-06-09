<template>
    <card-component
        has-outline
        is-page-content-wrapper
        data-test-id="card-with-content-component"
        :class="$style['c-cardWithContent']">
        <div
            v-if="$slots.icon"
            data-test-id="cardWithContent-icon"
            :class="$style['c-cardWithContent-icon']">
            <slot name="icon" />
        </div>

        <h1
            v-if="cardHeading"
            data-test-id="cardWithContent-heading"
            :class="$style['c-cardWithContent-heading']">
            {{ cardHeading }}
        </h1>

        <p
            v-if="cardDescription"
            data-test-id="cardWithContent-description"
            :class="$style['c-cardWithContent-description']">
            {{ cardDescription }}
        </p>

        <f-button
            v-if="primaryButton && primaryButton.text"
            button-size="large"
            button-type="primary"
            is-full-width
            data-test-id="cardWithContent-primaryButton"
            :href="primaryButton.href"
            :to="primaryButton.to"
            :class="$style['c-cardWithContent-button']"
            @click.native="$emit('primary-button-click')">
            {{ primaryButton.text }}
        </f-button>

        <f-button
            v-if="secondaryButton && secondaryButton.text"
            button-size="large"
            button-type="secondary"
            is-full-width
            data-test-id="cardWithContent-secondaryButton"
            :href="secondaryButton.href"
            :to="secondaryButton.to"
            :class="$style['c-cardWithContent-button']"
            @click.native="$emit('secondary-button-click')">
            {{ secondaryButton.text }}
        </f-button>
    </card-component>
</template>

<script>
import CardComponent from '@justeat/f-card';
import FButton from '@justeat/f-button';

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
        primaryButton: {
            type: Object,
            default: () => null
        },
        secondaryButton: {
            type: Object,
            default: () => null
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
    margin: spacing(f) 0 spacing(a);
}

.c-cardWithContent-icon {
    margin: auto;
    margin-bottom: spacing(f);
    width: 200px;
}
</style>
