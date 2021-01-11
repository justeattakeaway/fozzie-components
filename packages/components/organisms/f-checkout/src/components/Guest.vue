<template>
    <div data-test-id='guest-component'>
        <form-field
            v-model="guest.firstName"
            name="guest-first-name"
            :label-text="$t('labels.firstName')">
            <template #error>
                <error-message
                    v-if="isFirstNameEmpty"
                    data-test-id="error-guest-first-name">
                    {{ $t('validationMessages.guestFirstName.requiredError') }}
                </error-message>
            </template>
        </form-field>
        <form-field
            v-model="guest.lastName"
            name="guest-last-name"
            :label-text="$t('labels.lastName')">
            <template #error>
                <error-message
                    v-if="isLastNameEmpty"
                    data-test-id="error-guest-last-name">
                    {{ $t('validationMessages.guestLastName.requiredError') }}
                </error-message>
            </template>
        </form-field>
        <form-field
            v-model="guest.email"
            name="guest-email"
            :label-text="$t('labels.email')">
            <template #error>
                <error-message
                    v-if="!isEmailValid"
                    data-test-id="error-guest-email-invalid">
                    {{ $t('validationMessages.guestEmail.invalidError') }}
                </error-message>
            </template>
        </form-field>
    </div>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
// import { mapState } from 'vuex';

export default {
    components: { FormField, ErrorMessage },

    data () {
        return {
            guest: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    }
};
</script>

<style lang="scss" module>
</style>
