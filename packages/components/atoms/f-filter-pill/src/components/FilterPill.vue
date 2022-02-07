<template>
    <div
        :class="$style['c-filterPill']"
        data-test-id="filter-pill-component">
        I am a FilterPill Component (GB)
    </div>
</template>

<script>
export default {
    name: 'FilterPill',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>
.c-filterPill {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}
</style>
