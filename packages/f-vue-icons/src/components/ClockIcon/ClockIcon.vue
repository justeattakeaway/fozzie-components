<template>
    <clock-icon :class="['c-icon c-icon--clock', iconClasses]" />
</template>

<script>
import ClockIcon from '@justeat/f-icons/src/img/icons/general/clock.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        ClockIcon
    },

    mixins: [iconsMixin]
};
</script>
