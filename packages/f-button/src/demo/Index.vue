// Demo component for testing `f-button` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <f-button />
    </div>
</template>

<script>
import FButton from '@/components/Button.vue';

export default {
    components: { FButton }
};
</script>

<style>
body {
    margin: 0;
}
</style>
