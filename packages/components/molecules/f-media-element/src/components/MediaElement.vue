<template>
    <div
        :class="$style['c-mediaElement']"
        data-test-id="mediaElement">
        {{ copy.text }}
    </div>
</template>

<script>

export default {
    name: 'MediaElement',
    components: {},
    props: {
    },
    data () {
    }
};
</script>

<style lang="scss" module>

.c-mediaElement {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
