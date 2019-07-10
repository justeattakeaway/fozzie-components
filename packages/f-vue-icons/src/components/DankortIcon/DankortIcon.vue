<template>
    <dankort-icon />
</template>

<script>
import DankortIcon from '@justeat/f-icons/src/img/icons/cards/dk.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        DankortIcon
    },

    mixins: [iconsMixin]
}
</script>
