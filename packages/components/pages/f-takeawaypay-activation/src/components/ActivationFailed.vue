<template>
    <div data-test-id="activation-failed-component">
        <bag-sorry-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

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
import { BagSorryBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        BagSorryBgIcon
    }
};
</script>

<style lang="scss" module>
//
</style>
