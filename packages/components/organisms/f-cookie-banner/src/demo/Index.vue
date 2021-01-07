// Demo component for testing `f-cookie-banner` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <cookie-banner
            locale="en-GB" />
    </div>
</template>

<script>
import CookieBanner from '@/components/CookieBanner.vue';

export default {
    components: { CookieBanner }
};
</script>

<style>
body {
    margin: 0;
}
</style>
