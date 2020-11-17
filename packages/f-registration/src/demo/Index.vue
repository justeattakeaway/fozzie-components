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
            :show-login-link=true
            create-account-url="/account/register"
            class="registration-form" />
    </div>
</template>

<script>
import Registration from '@/components/Registration.vue';

export default {
    components: { Registration }
};
</script>

<style lang="scss">

body {
    margin: 0;
    background-color: #f9fafb;
}

</style>
