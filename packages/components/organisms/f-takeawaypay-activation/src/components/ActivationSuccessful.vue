<template>
    <div>
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <p :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationSuccessful') }}
        </p>

        <p>
            {{ $t('messages.descriptionActivationSuccessful') }}
        </p>

        <div :class="$style['c-takeawaypayActivation-actions']">
            <f-button
                :href="homeUrl"
                data-test-id="takeawaypay-activation-home-link"
                button-type="primary"
                button-size="large"
                is-full-width>
                {{ $t('actions.startOrdering') }}
            </f-button>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { BagCelebrateBgIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        FButton,
        BagCelebrateBgIcon
    },

    props: {
        homeUrl: {
            type: String,
            required: true
        }
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

.c-takeawaypayActivation-actions {
    padding-top: spacing(x3);
}

</style>
