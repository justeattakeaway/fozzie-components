<template>
    <div
        :class="$style['c-imageTile']"
        data-test-id="imageTile">
        I am a ImageTile Component (GB)
    </div>
</template>

<script>

export default {
    name: 'ImageTile',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-imageTile {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
