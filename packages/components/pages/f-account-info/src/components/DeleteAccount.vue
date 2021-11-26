<template>
    <div>
        <hr>

        <p>{{ $t('deleteAccountMessage') }}</p>

        <f-link
            is-distinct
            href="/account/deactivate"
            target="_blank">
            {{ $t('deleteAccountLink') }}
        </f-link>
    </div>
</template>

<script>
import FLink from '@justeat/f-link';

export default {
    components: {
        FLink
    }
};
</script>
