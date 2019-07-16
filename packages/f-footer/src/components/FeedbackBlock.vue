<template>
    <div>
        <h2 class="c-footer-heading">
            {{ title }}
        </h2>
        <p>
            {{ text }}
        </p>
        <button class="o-btn--tertiary">{{ buttonText }}</button>
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
[data-feedback-block] {
    .c-footer-heading {
        padding-left: 0;
    }

    h2 {
        padding-bottom: 2px;
    }

    @include media('<mid') {
        order: 1;
    }
}
</style>
