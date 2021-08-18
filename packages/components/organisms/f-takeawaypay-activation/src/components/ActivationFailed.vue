<template>
    <div data-test-id="activation-failed-component">
        <bag-sad-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1
            :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationFailed') }}
        </h1>

        <p
            :class="$style['c-takeawaypayActivation-description']">
            {{ $t('messages.descriptionActivationFailed') }}
        </p>
    </div>
</template>

<script>
import { BagSadBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        BagSadBgIcon
    }
};
</script>

<style lang="scss" module>

@import './../assets/scss/takeaway-pay-activation';

</style>
