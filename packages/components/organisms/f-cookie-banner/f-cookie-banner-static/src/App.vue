<template>
    <cookie-banner
        locale='da-DK'
        should-absolute-position-reopen-link={false}
    />
</template>

<script>
import CookieBanner from '@justeat/f-cookie-banner';
import '@justeat/f-cookie-banner/dist/f-cookie-banner.css';

export default {
    components: {
        CookieBanner
    }
};
</script>
