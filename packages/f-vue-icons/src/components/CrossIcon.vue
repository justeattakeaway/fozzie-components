<template>
    <cross-icon
        :class="['c-icon c-icon--cross', {
            'c-icon--cross--large': isLarge,
            ...iconClasses
        }]" />
</template>

<script>
import CrossIcon from '@justeat/f-icons/src/img/icons/operators/cross.svg';
import iconsMixin from '../mixins/icons.mixin';

export default {
    components: {
        CrossIcon
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
