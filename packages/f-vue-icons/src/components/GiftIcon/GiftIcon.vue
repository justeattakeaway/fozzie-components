<template>
    <gift-icon
        :class="['c-icon c-icon--offer', {
            'c-icon--offer--small': isSmall,
            ...iconClasses
        }]" />
</template>

<script>
import GiftIcon from '@justeat/f-icons/src/img/icons/general/gift.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        GiftIcon
    },

    mixins: [iconsMixin],

    props: {
        isSmall: {
            type: Boolean,
            default: false
        }
    }
};
</script>
