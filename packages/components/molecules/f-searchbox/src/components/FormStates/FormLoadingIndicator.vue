<template>
    <div
        v-if="shouldDisplayLoadingIndicator"
        data-test-id="loading-spinner-indicator"
        :class="$style['c-spinner']">
        <div :class="$style['c-spinner-icon']" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { VUEX_MODULE_NAMESPACE } from '../../services/constants';

export default {
    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE, [
            'isFullAddressSearchEnabled',
            'isLoadingResults'
        ]),

        /**
         * Only display loading spinner for Loqate feature for now.
         *
         * */
        shouldDisplayLoadingIndicator () {
            return this.isFullAddressSearchEnabled && this.isLoadingResults;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

@keyframes spin {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(359deg);
    }
}

.c-spinner {
    position: absolute;
    right: 0;
}

.c-spinner-icon {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border: 3px solid f.$color-content-brand;
    border-top: 3px solid rgba(243, 109, 0, 0.2);
    border-radius: 50%;
    animation: spin 1s linear 0s infinite;
}
</style>
