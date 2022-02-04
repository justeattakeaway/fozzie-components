<template>
    <div :class="$style['c-testContainer']">
        <image-tile
            :key="cuisineId"
            :tile-id="cuisineId"
            :href="cuisineId"
            :img-src="cuisineImage"
            :display-text="cuisineId"
            :is-selected="selected"
            :fallback-image="fallbackImage"
            @toggle="toggleCuisine" />
    </div>
</template>

<script>
import ImageTile from '../src/components/ImageTile.vue';

export default {
    name: 'TestContainer',
    components: {
        ImageTile
    },
    props: {
        cuisineId: {
            type: String,
            default: ''
        },
        cuisineImage: {
            type: String,
            default: ''
        },
        fallbackImage: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            selected: false
        };
    },
    methods: {
        toggleCuisine () {
            this.selected = !this.selected;
        }
    }
};
</script>

<style lang="scss" module>
    .c-testContainer {
        width: 200px;
        margin: auto;
    }
</style>
