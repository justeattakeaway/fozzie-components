<template>
    <a :class="$style['c-allergyNote']">
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
.c-allergyNote {
    display: block;
    margin: auto;
    padding: 15px;
    padding-bottom: 0;
    text-align: center;
    color: $color-link-default;
    text-decoration: underline;
    font-weight: $font-weight-bold;

    &:hover,
    &:focus {
        color: $color-link-hover;
    }
}
</style>
