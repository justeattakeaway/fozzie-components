<template>
    <div>
        <f-alert
            v-if="showSaveErrorAlert"
            data-test-id="contact-preferences-error-alert"
            :class="[
                $style['c-contactPreferences-alert'],
                $style['c-contactPreferences-inheritWidthAboveNarrow']
            ]"
            type="danger"
            :heading="$t('errorMessages.saving.heading')">
            {{ $t(errorMessageKey) }}
        </f-alert>

        <f-alert
            v-if="showSuccessfulAlert"
            data-test-id="contact-preferences-success-alert"
            :class="[
                $style['c-contactPreferences-alert'],
                $style['c-contactPreferences-inheritWidthAboveNarrow']
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
    name: 'Notifications',

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
.c-contactPreferences-inheritWidthAboveNarrow {
    width: 100%;

    @include media('>narrow') {
        width: inherit;
    }
}

.c-contactPreferences-alert {
    margin: -(spacing()) 0 spacing(f); // Negative top margin needed to offset the fieldset's bottom margin.
}
</style>
