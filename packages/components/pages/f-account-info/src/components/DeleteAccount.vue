<template>
    <div>
        <hr>

        <p>{{ $t('deleteAccountMessage') }}</p>

        <f-link
            name="account-info-delete-account-link"
            is-distinct
            href="/account/deactivate"
            target="_blank">
            {{ $t('deleteAccountLink') }}
        </f-link>
    </div>
</template>

<script>
import FLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

export default {
    components: {
        FLink
    }
};
</script>
