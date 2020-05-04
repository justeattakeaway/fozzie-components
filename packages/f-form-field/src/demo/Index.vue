// Demo component for testing `f-form-field` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <form-field
            locale="en-GB"
            label-text="First Name"
            label-style="inline" />
    </div>
</template>

<script>
import FormField from '@/components/FormField.vue';

export default {
    components: { FormField }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');

body {
    margin: 0;
}
</style>
