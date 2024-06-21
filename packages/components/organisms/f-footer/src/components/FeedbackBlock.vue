// .is-invisible class on data-gtm-feedback element is dictated by gtm script for Usabilla
<template>
    <div
        :class="[
            $style['c-feedback'],
            $style['is-invisible']
        ]"
        data-gtm-feedback
        :data-trak='JSON.stringify({
            trakEvent: "click",
            category: "engagement",
            action: "footer",
            label: "click_feedback",
            ...(globalTrackingContexts.length ? {
                context: globalTrackingContexts
            } : {})
        })'>
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
            data-test-id="feedback-button"
            type="button">
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
        },

        globalTrackingContexts: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$feedback-btn-font-size: 'body-s';

.c-feedback {
    @include f.media('<wide') {
        margin-bottom: f.spacing(d);
    }
}

.c-feedback-text {
    margin: 0 0 f.spacing(a) 0;
    @include f.font-size(body-s);
}

.c-feedback-button {
    border: 0;
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: f.$color-content-link;
    font-weight: 500;
    @include f.font-size($feedback-btn-font-size);
    text-decoration: underline;

    &:hover {
        cursor: pointer;
        color: darken(f.$color-content-link, f.$color-hover-01);
        background-color: transparent;
    }
    &:active,
    &:focus {
        color: darken(f.$color-content-link, f.$color-active-01);
        background-color: transparent;
    }

    &:focus,
    &:focus-visible {
        @extend %u-elementFocus--borderless;
    }
}
</style>
