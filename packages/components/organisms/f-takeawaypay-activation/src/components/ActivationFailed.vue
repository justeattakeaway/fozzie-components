<template>
    <div>
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

.c-takeawaypayActivation-icon {
    transform: translate(10%);
    width: 125px;
}

.c-takeawaypayActivation-title {
    @include font-size(body-l);
    font-weight: $font-weight-bold;
}

</style>
