<template>
    <div
        data-test-id='guest-component'
        :class="$style['c-guest']">
        <form-field
            v-model="guest.firstName"
            name="guest-first-name"
            :label-text="$t('guest.labels.firstName')" />
        <form-field
            v-model="guest.lastName"
            name="guest-last-name"
            :label-text="$t('guest.labels.lastName')" />
        <form-field
            v-model="guest.email"
            name="guest-email"
            :label-text="$t('guest.labels.email')" />
    </div>
</template>

<script>
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: { FormField },

    data () {
        return {
            guest: {
                firstName: '',
                lastName: '',
                email: ''
            }
        };
    }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(x2);
}
</style>
