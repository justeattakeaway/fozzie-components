// Demo component for testing `f-searchbox` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <vue-searchbox
            locale="en-GB"
            :config="{ hideShell: false, isCompressed: false }" />
    </div>
</template>

<script>
import VueSearchbox from '@/components/Base.vue';

export default {
    components: { VueSearchbox }
};
</script>

<style>
body {
    margin: 0;
}
</style>
