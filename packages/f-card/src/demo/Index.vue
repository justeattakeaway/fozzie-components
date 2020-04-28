// Demo component for testing `f-card` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <card-component
            locale="en-GB"
            card-heading="I am a demo card"
            is-rounded
            has-outline
            is-page-content-wrapper>
            <p>
                Mollit aliqua labore excepteur voluptate consequat ut dolore
                ipsum nostrud magna elit proident laboris. Irure do nulla
                eiusmod aliquip enim qui deserunt Lorem. Dolore eu exercitation
                fugiat tempor laborum consequat eu dolor voluptate reprehenderit tempor incididunt in.
                Fugiat cillum laborum irure ea id deserunt quis est deserunt reprehenderit magna ea consectetur.
                Magna ullamco eu et Lorem.
            </p>
        </card-component>
    </div>
</template>

<script>
import CardComponent from '@/components/Card.vue';

export default {
    components: { CardComponent }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');

body {
    margin: 0;
    background: #f1f1f1;
}
</style>
