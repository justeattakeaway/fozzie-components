<template>
    <div class="c-footer-feedbackBlock">
        <h2 class="c-footer-heading c-footer-heading--shortBelowWide">
            {{ title }}
        </h2>
        <p>
            {{ text }}
        </p>
        <button class="o-btn--tertiary">
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

.c-footer-feedbackBlock {
    @include media('<wide') {
        order: 1;
    }
}

</style>
