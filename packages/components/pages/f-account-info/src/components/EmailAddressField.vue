<template>
    <div>
        <form-field
            :label-text="$t('consumer.emailAddressLabel')"
            disabled
            name="account-info-consumer-emailAddress"
            :placeholder="$t('consumer.emailAddressPlaceholder')"
            class="u-spacingBottom--large"
            :value="emailAddress" />

        <f-link
            name="account-info-change-emailAddress-link"
            is-distinct
            :class="$style['c-accountInfo-customerCareLink']"
            href="/help/article/203097431/how-do-i-manage-my-account"
            target="_blank">
            {{ $t('contactCustomerCareTeam') }}
        </f-link>
    </div>
</template>

<script>
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import FLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

export default {
    components: {
        FormField,
        FLink
    },

    props: {
        emailAddress: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" module>
.c-accountInfo-customerCareLink {
    display: block;
    margin-bottom: spacing(x4);
}
</style>
