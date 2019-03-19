<template>
    <info-icon :class="['c-icon c-icon--info', iconClasses]" />
</template>

<script>
import InfoIcon from '@justeat/f-icons/src/img/icons/general/info.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        InfoIcon
    },

    mixins: [iconsMixin]
};
</script>
