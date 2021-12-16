<template>
    <div :class="$style['c-testContainer']">
        <image-tile
            :key="cuisineId"
            :tile-id="cuisineId"
            :href="cuisineId"
            :img-src="cuisineImage"
            :display-text="cuisineId"
            :is-selected="selected"
            @toggle="toggleCuisine"
        />
    </div>
</template>

<script>
import ImageTile from '../src/components/ImageTile.vue';

export default {
    name: 'Container',
    components: {
        ImageTile
    },
    props: {
        cuisineId: {
            type: String,
            default: 'Chicken'
        },
        cuisineImage: {
            type: String,
            default: 'https://via.placeholder.com/150'
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
        background-color: pink;
    }
</style>
