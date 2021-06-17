<template>
    <div
        :class="$style['c-analytics']"
        data-test-id="analytics">
        I am the 'f-analytics' component
    </div>
</template>

<script>

export default {
    name: 'Analytics',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-analytics {
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
