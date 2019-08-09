<template>
    <padlock-icon :class="['c-icon c-icon--padlock', iconClasses]" />
</template>

<script>
import PadlockIcon from '@justeat/f-icons/src/img/icons/general/padlock.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        PadlockIcon
    },

    mixins: [iconsMixin]
};
</script>
