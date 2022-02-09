<template>
    <div :class="$style['c-testContainer']">
        <slot :toggleCuisine="toggleCuisine" />
    </div>
</template>

<script>
export default {
    name: 'TestContainer',
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
        width: 140px;
    }
</style>
