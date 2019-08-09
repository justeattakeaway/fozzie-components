<template>
    <warning-icon :class="['c-icon c-icon--warning', iconClasses]" />
</template>

<script>
import WarningIcon from '@justeat/f-icons/src/img/icons/general/warning.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        WarningIcon
    },

    mixins: [iconsMixin]
};
</script>
