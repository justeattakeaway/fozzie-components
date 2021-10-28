<template>
    <div
        data-test-id="spinner-component">
        <span
            v-if="shouldShowSpinner"
            :class=" $style['c-spinner']" />

        <span :class="{ ['is-hidden']: shouldShowSpinner }">
            <slot />
        </span>
    </div>
</template>

<script>

export default {
    data () {
        return {
            shouldShowSpinner: true
        };
    },

    mounted () {
        this.$on('stop-spinner', () => {
            this.shouldShowSpinner = false;
        });

        this.$on('start-spinner', () => {
            this.shouldShowSpinner = true;
        });
    }
};
</script>

<style lang="scss" module>
@include loadingIndicator('large');

.c-spinner {
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
