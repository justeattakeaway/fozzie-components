<template>
    <div class="c-skeleton-loader-carouselCardBackground c-skeleton-loader-bone">
        <image-block />
    </div>
</template>

<script>
import ImageBlock from './Image.vue';

export default {
    name: 'CarouselCardBackground',
    components: { ImageBlock }
};
</script>

<style lang="scss" scoped>
.c-skeleton-loader-bone {
    height: 200px;
}
</style>
