// Demo component for testing `f-alert` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <vue-alert
            locale="en-GB"
            type="success"
            :is-dismissable="true"
            heading="Title of the alert">
            You can put any HTML here!
        </vue-alert>
    </div>
</template>

<script>
import VueAlert from '@/components/Alert.vue';

export default {
    components: { VueAlert }
};
</script>

<style>
body {
    margin: 0;
}
</style>
