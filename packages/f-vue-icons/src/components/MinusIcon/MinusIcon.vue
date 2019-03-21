<template>
    <minus-icon
        :class="['c-icon c-icon--minus', {
            'c-icon--minus--large': isLarge,
            ...iconClasses
        }]" />
</template>

<script>
import MinusIcon from '@justeat/f-icons/src/img/icons/operators/minus.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        MinusIcon
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
