// Demo component for testing `f-skeleton-component` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <skeleton-component
            locale="en-GB" />
    </div>
</template>

<script>
import SkeletonComponent from '@/components/Skeleton.vue';

export default {
    components: { SkeletonComponent }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');

body {
    margin: 0;
}
</style>
