<template>
    <basket-icon
        :class="['c-icon c-icon--basket', {
            'c-icon--basket--large': isLarge,
            ...iconClasses
        }]" />
</template>

<script>
import BasketIcon from '@justeat/f-icons/src/img/icons/general/basket.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        BasketIcon
    },

    mixins: [iconsMixin],

    props: {
        isLarge: {
            type: Boolean,
            default: false
        }
    }
};
</script>
