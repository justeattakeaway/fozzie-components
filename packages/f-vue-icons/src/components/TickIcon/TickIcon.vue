<template>
    <tick-icon :class="['c-icon c-icon--tick', iconClasses]" />
</template>

<script>
import TickIcon from '@justeat/f-icons/src/img/icons/general/tick.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        TickIcon
    },

    mixins: [iconsMixin]
};
</script>
