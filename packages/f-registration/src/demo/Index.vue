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
            :login-settings="{
                preLinkText: 'Already have an account?',
                linkText: 'Log in',
                url: '/login'
            }" />
    </div>
</template>

<script>
import Registration from '@/components/Registration.vue';

export default {
    components: { Registration }
};
</script>

<style lang="scss">
@import '~@justeat/fozzie/src/scss/base/typography';

@font-face {
    font-family: JustEatBasis;
    src: url('https://d30v2pzvrfyzpo.cloudfront.net/fonts/JustEatBasis-Regular-optimised.woff2') format("woff2"),
        url('https://d30v2pzvrfyzpo.cloudfront.net/fonts/JustEatBasis-Regular-optimised.woff') format("woff");
    font-weight: 400;
    font-display: swap;
}

body {
    margin: 0;
}
</style>
