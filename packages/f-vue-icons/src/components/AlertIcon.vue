<template>
    <alert-icon :class="['c-icon c-icon--alert', iconClasses]" />
</template>

<script>
import AlertIcon from '@justeat/f-icons/src/img/icons/general/alert.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        AlertIcon
    },

    mixins: [iconsMixin]
};
</script>
