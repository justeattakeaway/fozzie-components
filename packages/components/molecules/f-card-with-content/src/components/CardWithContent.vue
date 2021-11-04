<template>
    <div
        :class="$style['c-cardWithContent']"
        data-test-id="cardWithContent">
        I am a CardWithContent Component (GB)
    </div>
</template>

<script>

export default {
    name: 'CardWithContent',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-cardWithContent {
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
