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
            label-style="inline"
            data-test-id="a-constant-test-id" />
    </div>
</template>

<script>
import FormField from '@/components/FormField.vue';

export default {
    components: { FormField }
};
</script>

<style>
body {
    margin: 0;
}
</style>
