// Demo component for testing `f-checkout` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <vue-checkout
            locale="en-GB"
            checkout-method="Delivery" />
    </div>
</template>

<script>
import VueCheckout from '@/components/Checkout.vue';

export default {
    components: { VueCheckout }
};
</script>

<style>
body {
    margin: 0;
}
</style>
