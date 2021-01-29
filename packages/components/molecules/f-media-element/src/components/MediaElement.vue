<template>
    <div
        :class="$style['c-mediaElement']"
        data-test-id="mediaElement-component">
        {{ componentName }}
    </div>
</template>

<script>

export default {
    data () {
        return {
            componentName: 'MediaElement'
        };
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
