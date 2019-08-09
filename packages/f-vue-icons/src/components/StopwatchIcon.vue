<template>
    <stopwatch-icon :class="['c-icon c-icon--stopwatch', iconClasses]" />
</template>

<script>
import StopwatchIcon from '@justeat/f-icons/src/img/icons/general/stopwatch.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        StopwatchIcon
    },

    mixins: [iconsMixin]
};
</script>
