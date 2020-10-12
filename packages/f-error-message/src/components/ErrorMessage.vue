<template>
    <p
        v-if="hasSlotData"
        :class="$style['c-error-message']"
        data-test-id="error-message"
        :data-test-title="dataTestTitle">
        <warning-icon :class="$style['c-error-message-icon']" />
        <span data-test-id="content">
            <slot />
        </span>
    </p>
</template>

<script>
import { WarningIcon } from '@justeat/f-vue-icons';

export default {
    name: 'ErrorMessage',
    components: {
        WarningIcon
    },
    props: {
        dataTestId: {
            type: String,
            default: ''
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

.c-error-message {
    display: flex;
    align-items: center;
    color: $red;
    @include font-size(base);
    margin-top: spacing();
}

.c-error-message-icon {
    width: 16px;
    height: 16px;
    margin-right: spacing(x0.5);
}

</style>
