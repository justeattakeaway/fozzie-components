<template>
    <offer-icon
        :class="['c-icon c-icon--offer', {
            'c-icon--offer--small': isSmall,
            ...iconClasses
        }]" />
</template>

<script>
import OfferIcon from '@justeat/f-icons/src/img/icons/general/offer.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        OfferIcon
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
