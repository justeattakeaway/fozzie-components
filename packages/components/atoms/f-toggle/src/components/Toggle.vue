<template>
    <div
        :class="$style['c-toggle']"
        data-test-id="toggle-component">
        I am a VToggle Component (GB)
    </div>
</template>

<script>
export default {
    name: 'VToggle',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-toggle {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid red;
    font-family: f.$font-family-base;
    @include f.font-size(heading-m);
}
</style>
