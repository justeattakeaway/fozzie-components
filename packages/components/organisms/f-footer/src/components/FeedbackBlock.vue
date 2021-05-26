// .is-invisible class on data-gtm-feedback element is dictated by gtm script for Usabilla
<template>
    <div
        :class="[
            $style['c-feedback'],
            $style['is-invisible']
        ]"
        data-gtm-feedback
        data-trak='{
            "trakEvent": "click",
            "category": "engagement",
            "action": "footer",
            "label": "click_feedback"
        }'>
        <h2
            :class="[
                $style['c-footer-heading'],
                $style['c-footer-heading--shortBelowWide']
            ]">
            {{ title }}
        </h2>

        <p :class="$style['c-feedback-text']">
            {{ text }}
        </p>

        <button
            :class="$style['c-feedback-button']"
            data-test-id="feedback-button">
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

<style lang="scss" module>
@import '../assets/scss/headings.scss';

$feedback-btn-font-size: 'body-s';

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
    color: $color-content-link;
    font-weight: 500;
    @include font-size($feedback-btn-font-size);
    text-decoration: underline;

    &:hover {
        cursor: pointer;
        color: darken($color-content-link, $color-hover-01);
        background-color: transparent;
    }
    &:active,
    &:focus {
        color: darken($color-content-link, $color-active-01);
        background-color: transparent;
    }
}
</style>
