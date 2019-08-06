<template>
    <div
        class="c-feedback"
        data-gtm-feedback>
        <h2 class="c-footer-heading c-footer-heading--shortBelowWide">
            {{ title }}
        </h2>
        <p class="c-feedback-text">
            {{ text }}
        </p>
        <button class="c-feedback-button">
            {{ buttonText }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">

.c-feedback {
    @include media('<wide') {
        order: 1;
    }
}

.c-feedback-text {
    margin: 0 0 spacing(x0.5) 0;
}

.c-feedback-button {
    border: 0;
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: $color-link-default;
    font-weight: 500;
    @include font-size(base);
    text-decoration: underline;

    @include theme(ml) {
        color: $color-link-default--ml;
    }

    &:hover {
        cursor: pointer;
        color: $color-link-hover;
        background-color: transparent;

        @include theme(ml) {
            color: $color-link-hover--ml;
        }
    }
    &:active,
    &:focus {
        color: $color-link-active;
        background-color: transparent;

        @include theme(ml) {
            color: $color-link-active--ml;
        }
    }
}

</style>
