<template>
    <p
        v-if="hasSlotData"
        :class="$style['c-errorMessage']"
        data-test-id="error-message"
        :data-test-title="dataTestTitle">
        <danger-icon :class="$style['c-errorMessage-icon']" />
        <span
            data-test-id="content"
            :class="$style['c-errorMessage-content']">
            <slot />
        </span>
    </p>
</template>

<script>
import { DangerIcon } from '@justeat/f-vue-icons';

export default {
    name: 'ErrorMessage',
    components: {
        DangerIcon
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
    color: $color-text--danger;
    @include font-size(base);
    margin-top: spacing();
}

.c-errorMessage-content {
    display: block;
    overflow: hidden;
}

.c-errorMessage-icon {
    width: 16px;
    line-height: 20px;
    margin-right: spacing();
    float: left;
}

</style>
