<template>
    <router-link
        :to="to">
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'RouterLinkButton',
    props: {
        to: {
            type: String,
            required: true
        }
    }
};
</script>
