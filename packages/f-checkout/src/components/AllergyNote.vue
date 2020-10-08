<template>
    <a :class="$style['text']">
        {{ text }}
    </a>
</template>

<script>
export default {
    name: 'SelectorComponent',
    props: {
        text: {
            type: String,
            default: 'If you or someone you’re ordering for has a food allergy or intolerance, click here'
        }
    }
};
</script>

<style lang="scss" module>
.text {
    display: block;
    margin: auto;
    padding: 20px 12px 0 12px;
    text-align: center;
    color: $color-link-default;
    text-decoration: underline;
}

.text:hover {
    color: $color-link-hover;
}
</style>
