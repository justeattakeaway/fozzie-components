<template>
    <p
        v-if="hasSlotData"
        :class="$style['c-errorMessage']"
        :data-test-id="dataTestId">
        <alert-circle-filled-icon :class="$style['c-errorMessage-icon']" />
        <span
            data-test-id="content"
            role="alert"
            :class="$style['c-errorMessage-content']">
            <slot />
        </span>
    </p>
</template>

<script>
import { AlertCircleFilledIcon } from '@justeattakeaway/pie-icons-vue';

export default {
    name: 'ErrorMessage',
    components: {
        AlertCircleFilledIcon
    },
    props: {
        dataTestId: {
            type: String,
            default: 'error-message-component'
        }
    },
    computed: {
        hasSlotData () {
            return !!this.$slots.default;
        }
    }
};
</script>

<style lang="scss" module>
.c-errorMessage {
    position: relative;
    color: $color-content-error;
    @include font-size();
    margin-top: spacing();
}

.c-errorMessage-content {
    display: block;
    overflow: hidden;
    margin-left: spacing(e);
}

.c-errorMessage-icon {
    position: absolute;
    width: 16px;
    margin-top: 2px;

    path {
        fill: $color-support-error;
    }
}
</style>
