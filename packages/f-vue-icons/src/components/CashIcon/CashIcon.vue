<template>
    <cash-icon :class="['c-icon c-icon--cash', iconClasses]" />
</template>

<script>
import CashIcon from '@justeat/f-icons/src/img/icons/general/cash.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        CashIcon
    },

    mixins: [iconsMixin]
};
</script>
