<template>
    <button
        :type="actionType"
        v-on="$listeners">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'ActionButton',
    props: {
        actionType: {
            type: String,
            required: true
        }
    }
};
</script>
