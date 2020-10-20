// Demo component for testing `f-content-cards` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for better comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <content-cards
            api-key="test"
            user-id="test"
            @error="handleErrors" />
    </div>
</template>

<script>
import ContentCards from '@/components/ContentCards.vue';
import makeServer from './mockServer';

export default {
    components: {
        ContentCards
    },
    created () {
        makeServer();
    },
    methods: {
        handleErrors (error) {
            console.log(error);
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');

body {
    margin: 0;
}
</style>
