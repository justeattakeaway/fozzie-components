<template>
    <delivery-icon
        :class="['c-icon--delivery', {
            'c-icon--delivery--small': isSmall,
            'c-icon': !isGreen,
            'c-icon--green': isGreen,
            ...iconClasses
        }]" />
</template>

<script>
import DeliveryIcon from '@justeat/f-icons/src/img/icons/general/delivery.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        DeliveryIcon
    },

    mixins: [iconsMixin],

    props: {
        isSmall: {
            type: Boolean,
            default: false
        },
        isGreen: {
            type: Boolean,
            default: false
        }
    }
};
</script>
