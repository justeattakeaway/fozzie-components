<template>
    <div>
        <f-alert
            v-show="showSaveErrorAlert"
            data-test-id="account-info-error-alert"
            :class="[
                $style['c-accountInfo-alert'],
                $style['c-accountInfo-inheritWidthAboveNarrow']
            ]"
            type="danger"
            :heading="$t('errorMessages.saving.heading')">
            {{ $t(errorMessageKey) }}
        </f-alert>

        <f-alert
            v-show="showSuccessfulAlert"
            data-test-id="account-info-success-alert"
            :class="[
                $style['c-accountInfo-alert'],
                $style['c-accountInfo-inheritWidthAboveNarrow']
            ]"
            type="success"
            :heading="$t('successMessages.saving.heading')"
        />
    </div>
</template>

<script>
import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';

export default {
    name: 'AccountInfoNotifications',

    components: {
        FAlert
    },

    props: {
        errorMessageKey: {
            type: String,
            default: ''
        },
        showSaveErrorAlert: {
            type: Boolean
        },
        showSuccessfulAlert: {
            type: Boolean
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-accountInfo-inheritWidthAboveNarrow {
    width: 100%;

    @include f.media('>narrow') {
        width: inherit;
    }
}

.c-accountInfo-alert {
    margin-top: f.spacing(f);
}
</style>
