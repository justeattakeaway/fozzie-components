<template>
    <cookie-banner
        locale='en-GB'
        should-absolute-position-reopen-link='false' />
</template>

<script>
import CookieBanner from '../../src/components/CookieBanner.vue';
import '../../dist/f-cookie-banner.css';

export default {
    components: {
        CookieBanner
    }
};
</script>
