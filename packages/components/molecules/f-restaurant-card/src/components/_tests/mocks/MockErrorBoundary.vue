<template>
    <div
        error-boundary
        :tier="tier"
        :error="errored">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        tier: {
            type: [Number, String],
            default: null
        }
    },
    data () {
        return {
            errored: false
        };
    },
    errorCaptured () {
        this.errored = true;
        return false;
    }
};
</script>
