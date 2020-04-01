// Demo component for testing user-message independently via `vue serve --open src/components/Demo.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <user-message
            locale="en-GB" />
    </div>
</template>

<script>
import UserMessage from '../components/UserMessage.vue';

export default {
    components: { UserMessage }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');

body {
    margin: 0;
}
</style>
