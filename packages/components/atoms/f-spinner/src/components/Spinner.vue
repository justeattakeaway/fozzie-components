<template>
    <div
        data-test-id="spinner-component">
        <span
            v-if="shouldShowSpinner"
            :class=" $style['c-spinner']"
            role="alert"
            aria-live="polite" />

        <div :class="{ ['is-hidden']: shouldShowSpinner }">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    data () {
        return {
            shouldShowSpinner: true
        };
    },

    mounted () {
        /**
         * events are handled in the mounted as components can't handle `this.$emit` from a slot.
         * https://github.com/vuejs/vue/issues/4332
         *
         * */
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
