<template>
    <p
        v-if="hasSlotData"
        :class="$style['c-errorMessage']"
        data-test-id="error-message"
        :data-test-title="dataTestTitle">
        <warning-icon :class="$style['c-errorMessage-icon']" />
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
        dataTestTitle: {
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

.c-errorMessage {
    display: flex;
    align-items: center;
    color: $color-text--danger;
    @include font-size(base);
    margin-top: spacing();
}

.c-errorMessage-icon {
    width: 16px;
    height: 16px;
    margin-right: spacing(x0.5);
}

</style>
