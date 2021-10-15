<template>
    <div
        :class="$style['c-navigationLinks']"
        data-test-id="navigationLinks">
        I am a NavigationLinks Component (GB)
    </div>
</template>

<script>

export default {
    name: 'NavigationLinks',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-navigationLinks {
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
