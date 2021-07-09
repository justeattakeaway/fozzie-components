<template>
    <div>
        <bag-celebrate-bg-icon :class="$style['c-takeawaypayActivation-icon']" />

        <h1 :class="$style['c-takeawaypayActivation-title']">
            {{ $t('messages.titleActivationSuccessful') }}
        </h1>

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

@import './../assets/scss/takeaway-pay-activation';

</style>
