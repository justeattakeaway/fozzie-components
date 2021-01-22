<template>
    <button :type="actionType">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        actionType: {
            type: String,
            required: true
        }
    }
};
</script>
