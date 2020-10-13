// Demo component for testing `f-error-message` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <error-message
            locale="en-GB" />
    </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
    components: { ErrorMessage }
};
</script>

<style>
body {
    margin: 0;
}
</style>
