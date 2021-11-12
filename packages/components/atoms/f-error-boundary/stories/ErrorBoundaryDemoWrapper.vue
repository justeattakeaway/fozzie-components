<template>
    <div>
        <slot :shouldTriggerError="shouldTriggerError" />

        <button
            v-if="!shouldTriggerError"
            type="button"
            @click="handleTriggerError">
            Trigger error
        </button>
    </div>
</template>

<script>
export default {
    data: () => ({
        shouldTriggerError: false
    }),

    methods: {
        handleTriggerError () {
            this.shouldTriggerError = true;
        }
    }
};
</script>
