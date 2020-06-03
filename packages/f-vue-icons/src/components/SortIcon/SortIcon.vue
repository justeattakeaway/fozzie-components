<template>
    <sort-icon :class="['c-icon c-icon--sort', iconClasses]" />
</template>

<script>
import SortIcon from '@justeat/f-icons/src/img/icons/tools/sortAmount.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        SortIcon
    },

    mixins: [iconsMixin]
};
</script>
