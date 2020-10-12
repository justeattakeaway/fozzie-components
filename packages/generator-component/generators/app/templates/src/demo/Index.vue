// Demo component for testing `f-<%= name.default %>` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <<%= name.template %>
            locale="en-GB" />
    </div>
</template>

<script>
import <%= name.component %> from '@/components/<%= name.filename%>.vue';

export default {
    components: { <%= name.component %> }
};
</script>

<style>
body {
    margin: 0;
}
</style>
