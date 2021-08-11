<template>
    <div data-test-id="activation-failed-component">
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1
            :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationFailed') }}
        </h1>

        <p>
            {{ $t('messages.descriptionActivationFailed') }}
        </p>
    </div>
</template>

<script>
import { BagCelebrateBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        BagCelebrateBgIcon
    }
};
</script>

<style lang="scss" module>

@import './../assets/scss/takeaway-pay-activation';

</style>
