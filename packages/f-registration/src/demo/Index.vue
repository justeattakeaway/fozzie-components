// Demo component for testing `f-registration` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        >
        <registration
            locale="en-GB"
        />
    </div>
</template>

<script>
import Registration from '@/components/Registration.vue';

export default {
    components: { Registration }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu:300,500&display=swap');
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:300,500&display=swap');
@import '~@justeat/fozzie/src/scss/base/typography';

body {
    margin: 0;
}
</style>
