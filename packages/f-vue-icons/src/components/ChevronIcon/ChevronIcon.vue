<template>
    <chevron-icon
        :class="['c-icon c-icon--chevron', {
            'c-icon--chevron--small': isSmall,
            'c-icon--chevron--up': isFacingUp,
            'c-icon--chevron--right': isFacingRight,
            ...iconClasses
        }]" />
</template>

<script>
import ChevronIcon from '@justeat/f-icons/src/img/icons/arrows/chevron.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        ChevronIcon
    },

    mixins: [iconsMixin],

    props: {
        isSmall: {
            type: Boolean,
            default: false
        },

        isFacingUp: {
            type: Boolean,
            default: false
        },

        isFacingRight: {
            type: Boolean,
            default: false
        }
    }
};
</script>
