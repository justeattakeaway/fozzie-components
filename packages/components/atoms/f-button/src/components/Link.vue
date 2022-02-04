<template>
    <a v-on="$listeners">
        <slot />
    </a>
</template>

<script>
export default {
    name: 'LinkButton'
};
</script>
