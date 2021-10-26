<template>
    <div
        :class="$style['c-spinner']"
        data-test-id="spinner">
        I am a VSpinner Component (GB)
    </div>
</template>

<script>

export default {
    name: 'VSpinner',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-spinner {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $color-red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
