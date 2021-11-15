<template>
    <div>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        shouldTriggerError: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        shouldTriggerError (shouldTriggerError) {
            if (shouldTriggerError) {
                this.triggerError();
            }
        }
    },

    methods: {
        triggerError () {
            const [{ test }] = this.$ref;

            // eslint-disable-next-line no-console
            console.log({ test });
        }
    }
};
</script>
