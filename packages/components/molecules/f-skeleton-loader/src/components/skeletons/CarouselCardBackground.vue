<template>
    <div>
        <image-block :class="$style['c-carouselCardBackground-image']" />
    </div>
</template>

<script>
import ImageBlock from './Image.vue';

export default {
    components: { ImageBlock }
};
</script>

<style lang="scss" module>

.c-carouselCardBackground-image {
    height: 200px;
}

</style>
